import type { MatchView, ResultsData, StandingRow, TournamentState } from './types';
import { GROUPS, teamById, teamsInGroup } from './data/teams';
import { KNOCKOUT_LINKS, R32_SLOTS, SCHEDULE, type Slot } from './data/schedule';
import resultsJson from './data/results.json';

const DATA = resultsJson as unknown as ResultsData;

export const LAST_UPDATED: string = DATA.lastUpdated;

export function matchView(matchId: string, simNow: number, homeId?: string, awayId?: string): MatchView {
  const match = SCHEDULE.find((m) => m.id === matchId)!;
  const hId = match.homeTeamId ?? homeId;
  const aId = match.awayTeamId ?? awayId;
  const base: MatchView = {
    match,
    status: 'scheduled',
    phaseLabel: '開始前',
    homeTeamId: hId,
    awayTeamId: aId,
    homeScore: null,
    awayScore: null,
    pkText: null,
  };
  if (!hId || !aId) {
    return { ...base, phaseLabel: '組み合わせ未定' };
  }

  const result = DATA.results[matchId];
  if (result) {
    const [hs, as] = result.score;
    let winnerId: string | undefined;
    if (match.stage !== 'group') {
      if (hs !== as) winnerId = hs > as ? hId : aId;
      else if (result.pk) winnerId = result.pk[0] > result.pk[1] ? hId : aId;
    }
    return {
      ...base,
      status: 'finished',
      phaseLabel: result.pk ? 'PK戦の末 終了' : result.et ? '延長の末 終了' : '試合終了',
      homeScore: hs,
      awayScore: as,
      pkText: result.pk ? `PK ${result.pk[0]} - ${result.pk[1]}` : null,
      winnerId,
    };
  }

  // キックオフ済みだが結果データ未反映
  if (simNow >= Date.parse(match.kickoffUtc)) {
    return { ...base, phaseLabel: '結果更新待ち' };
  }
  return base;
}

function computeStandings(views: Map<string, MatchView>): Map<string, StandingRow[]> {
  const standings = new Map<string, StandingRow[]>();
  for (const g of GROUPS) {
    const rows = new Map<string, StandingRow>();
    for (const t of teamsInGroup(g)) {
      rows.set(t.id, { teamId: t.id, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 });
    }
    for (const m of SCHEDULE) {
      if (m.stage !== 'group' || m.group !== g) continue;
      const v = views.get(m.id);
      if (!v || v.status !== 'finished') continue;
      const rh = rows.get(v.homeTeamId!)!;
      const ra = rows.get(v.awayTeamId!)!;
      const hs = v.homeScore!;
      const as = v.awayScore!;
      rh.played++;
      ra.played++;
      rh.gf += hs; rh.ga += as;
      ra.gf += as; ra.ga += hs;
      if (hs > as) { rh.won++; ra.lost++; rh.pts += 3; }
      else if (hs < as) { ra.won++; rh.lost++; ra.pts += 3; }
      else { rh.drawn++; ra.drawn++; rh.pts++; ra.pts++; }
    }
    const list = [...rows.values()];
    for (const r of list) r.gd = r.gf - r.ga;
    // 簡易順位 (勝点 > 得失点差 > 総得点)。直接対決等の正式タイブレークは未対応
    list.sort(
      (a, b) =>
        b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || teamById(a.teamId).nameEn.localeCompare(teamById(b.teamId).nameEn),
    );
    standings.set(g, list);
  }
  return standings;
}

export function computeTournament(simNow: number): TournamentState {
  const views = new Map<string, MatchView>();
  for (const m of SCHEDULE) {
    if (m.stage === 'group') views.set(m.id, matchView(m.id, simNow));
  }
  const standings = computeStandings(views);

  // グループごとの全日程終了判定
  const groupDone = new Map<string, boolean>();
  for (const g of GROUPS) {
    const done = SCHEDULE.filter((m) => m.stage === 'group' && m.group === g).every(
      (m) => views.get(m.id)!.status === 'finished',
    );
    groupDone.set(g, done);
  }
  const groupStageComplete = GROUPS.every((g) => groupDone.get(g));

  // R32のスロット解決: 手動割り当て(slots) > 順位からの自動解決。
  // 3位通過チームの振り分けはFIFA規則の組み合わせ表によるため自動化せず、slotsでの手動指定のみ。
  const resolveSlot = (slot: Slot): string | undefined => {
    if ('third' in slot) return undefined;
    if (!groupDone.get(slot.group)) return undefined;
    return standings.get(slot.group)![slot.pos - 1].teamId;
  };

  const koMatches = SCHEDULE.filter((m) => m.stage !== 'group');
  for (const m of koMatches) {
    const manual = DATA.slots[m.id] ?? {};
    let hId: string | undefined = manual.home;
    let aId: string | undefined = manual.away;
    if (m.stage === 'r32') {
      const [hs, as] = R32_SLOTS[m.id];
      hId = hId ?? resolveSlot(hs);
      aId = aId ?? resolveSlot(as);
    } else {
      const [srcH, srcA] = KNOCKOUT_LINKS[m.id];
      const pick = (v: MatchView | undefined): string | undefined => {
        if (!v || v.status !== 'finished' || !v.winnerId) return undefined;
        if (m.stage === 'third') return v.winnerId === v.homeTeamId ? v.awayTeamId : v.homeTeamId;
        return v.winnerId;
      };
      hId = hId ?? pick(views.get(srcH));
      aId = aId ?? pick(views.get(srcA));
    }
    views.set(m.id, matchView(m.id, simNow, hId, aId));
  }

  const finalView = views.get('m104');
  const championId = finalView?.status === 'finished' ? finalView.winnerId : undefined;

  return { views, standings, groupStageComplete, championId };
}
