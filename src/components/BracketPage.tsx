import { broadcastById } from '../data/broadcasts';
import { STAGE_LABELS } from '../data/schedule';
import { teamById } from '../data/teams';
import { venueById } from '../data/venues';
import { useFollowedTeamIds } from '../hooks';
import { useAppStore } from '../store';
import type { MatchView, TournamentState } from '../types';
import { fmtCountdown, fmtJst, fmtJstDate } from '../utils/time';

function BracketSide({ teamId, label, score, isWinner, isFinished, followed }: {
  teamId?: string;
  label?: string;
  score: number | null;
  isWinner: boolean;
  isFinished: boolean;
  followed: boolean;
}) {
  const team = teamId ? teamById(teamId) : null;
  const cls = ['bk-side'];
  if (isWinner) cls.push('winner');
  if (isFinished && !isWinner) cls.push('lost');
  if (followed) cls.push('followed');
  if (!team) cls.push('tbd');
  return (
    <div className={cls.join(' ')}>
      <span className="bk-flag">{team ? team.flag : '⚪️'}</span>
      <span className="bk-name">{team ? team.name : label ?? '未定'}</span>
      {isWinner && <span className="bk-check">✓</span>}
      <span className="bk-score">{score ?? ''}</span>
    </div>
  );
}

// 終了試合の決着方法ラベル
function resultTag(v: MatchView): string {
  if (v.status !== 'finished') return '';
  if (v.pkText) return 'PK';
  if (v.phaseLabel === '延長の末 終了') return '延長';
  return '終了';
}

function BracketCard({ v }: { v: MatchView }) {
  const selectMatch = useAppStore((s) => s.selectMatch);
  const followed = useFollowedTeamIds();
  const m = v.match;
  const venue = venueById(m.venueId);
  const finished = v.status === 'finished';
  const terr = m.broadcastIds.map(broadcastById).find((b) => b.type === '地上波');
  return (
    <button className={`bk-card status-${v.status}`} onClick={() => selectMatch(m.id)}>
      <div className="bk-meta">
        <span className="bk-date">{fmtJst(m.kickoffUtc)}</span>
        {finished ? (
          <span className={`bk-tag bk-tag-${v.pkText ? 'pk' : 'done'}`}>{resultTag(v)}</span>
        ) : v.phaseLabel === '結果更新待ち' ? (
          <span className="bk-tag bk-tag-pending">結果待ち</span>
        ) : (
          <span className="bk-tag bk-tag-next">予定</span>
        )}
      </div>
      <BracketSide
        teamId={v.homeTeamId}
        label={m.homeLabel}
        score={v.homeScore}
        isWinner={finished && v.winnerId === v.homeTeamId}
        isFinished={finished}
        followed={!!v.homeTeamId && followed.has(v.homeTeamId)}
      />
      <BracketSide
        teamId={v.awayTeamId}
        label={m.awayLabel}
        score={v.awayScore}
        isWinner={finished && v.winnerId === v.awayTeamId}
        isFinished={finished}
        followed={!!v.awayTeamId && followed.has(v.awayTeamId)}
      />
      <div className="bk-foot">
        <span className="bk-venue">📍 {venue.city}</span>
        {v.pkText && <span className="bk-pk">{v.pkText}</span>}
        {terr && <span className="bk-terr">{terr.name}</span>}
      </div>
    </button>
  );
}

// 公式試合番号をトーナメント表の構造順(隣接2試合の勝者が次の列で対戦)に並べる
const COLUMNS: { stage: string; ids: string[] }[] = [
  { stage: 'r32', ids: ['m74', 'm77', 'm73', 'm75', 'm83', 'm84', 'm81', 'm82', 'm76', 'm78', 'm79', 'm80', 'm86', 'm88', 'm85', 'm87'] },
  { stage: 'r16', ids: ['m89', 'm90', 'm93', 'm94', 'm91', 'm92', 'm95', 'm96'] },
  { stage: 'qf', ids: ['m97', 'm98', 'm99', 'm100'] },
  { stage: 'sf', ids: ['m101', 'm102'] },
];

const PROGRESS_STAGES = ['r32', 'r16', 'qf', 'sf', 'final'] as const;

// 進行状況サマリー: ステージの進捗ピルと「次の試合」
function BracketSummary({ t }: { t: TournamentState }) {
  const now = useAppStore((s) => s.now);
  const ko = [...t.views.values()].filter((v) => v.match.stage !== 'group');

  const stat = (stage: string) => {
    const vs = ko.filter((v) => v.match.stage === stage);
    return { done: vs.filter((v) => v.status === 'finished').length, total: vs.length };
  };
  // 現在進行中 = まだ全試合が終わっていない最初のステージ
  const currentIdx = PROGRESS_STAGES.findIndex((s) => {
    const { done, total } = stat(s);
    return total > 0 && done < total;
  });

  const next = ko
    .filter((v) => v.status !== 'finished' && v.homeTeamId && v.awayTeamId)
    .sort((a, b) => a.match.kickoffUtc.localeCompare(b.match.kickoffUtc))[0];
  const nextHome = next?.homeTeamId ? teamById(next.homeTeamId) : null;
  const nextAway = next?.awayTeamId ? teamById(next.awayTeamId) : null;

  const totalDone = ko.filter((v) => v.status === 'finished').length;

  return (
    <div className="bk-summary">
      <div className="bk-progress">
        {PROGRESS_STAGES.map((s, i) => {
          const { done, total } = stat(s);
          const state = currentIdx === -1 || i < currentIdx ? 'done' : i === currentIdx ? 'live' : 'todo';
          return (
            <div key={s} className={`bk-step bk-step-${state}`}>
              <span className="bk-step-name">{STAGE_LABELS[s]}</span>
              <span className="bk-step-count">{done}/{total}</span>
            </div>
          );
        })}
      </div>
      {next && (
        <div className="bk-next">
          <span className="bk-next-label">⏰ 次の試合</span>
          <span className="bk-next-teams">
            {nextHome ? `${nextHome.flag} ${nextHome.name}` : next.match.homeLabel} vs{' '}
            {nextAway ? `${nextAway.name} ${nextAway.flag}` : next.match.awayLabel}
          </span>
          <span className="bk-next-when">
            {fmtJst(next.match.kickoffUtc)}
            <b>{fmtCountdown(Date.parse(next.match.kickoffUtc) - now)}</b>
          </span>
        </div>
      )}
      {!next && <div className="bk-next bk-next-done">全{totalDone}試合が終了しました 🎉</div>}
    </div>
  );
}

export function BracketPage({ t }: { t: TournamentState }) {
  const champion = t.championId ? teamById(t.championId) : null;
  const finalView = t.views.get('m104')!;
  const thirdView = t.views.get('m103')!;
  const thirdDate = fmtJstDate(thirdView.match.kickoffUtc);

  return (
    <div className="page">
      <div className="page-head">
        <h2>決勝トーナメント</h2>
        <p className="page-desc">
          ラウンド32からの一発勝負。引き分けは延長戦・PK戦で決着します。カードをタップで詳細・視聴ツールを表示。
          {!t.groupStageComplete && ' 各組の順位確定にともない対戦カードが順次確定します。'}
        </p>
      </div>

      <BracketSummary t={t} />

      <div className="bracket-scroll">
        <p className="bracket-hint">← 横スクロールで全ラウンドを表示 →</p>
        <div className="bracket">
          {COLUMNS.map((col) => (
            <div className={`bk-col bk-col-${col.stage}`} key={col.stage}>
              <h3 className="bk-col-title">{STAGE_LABELS[col.stage]}</h3>
              <div className="bk-col-matches">
                {col.ids.map((id) => (
                  <BracketCard key={id} v={t.views.get(id)!} />
                ))}
              </div>
            </div>
          ))}
          <div className="bk-col bk-col-final">
            <h3 className="bk-col-title">決勝</h3>
            <div className="bk-col-matches">
              <div className={`bk-champion ${champion ? 'decided' : ''}`}>
                <span className="bk-champ-label">🏆 優勝</span>
                <span className="bk-champ-team">{champion ? `${champion.flag} ${champion.name}` : '?'}</span>
              </div>
              <BracketCard v={finalView} />
            </div>
          </div>
        </div>
      </div>

      <section className="bk-third-section">
        <h3 className="bk-third-title">3位決定戦 <small>{thirdDate}</small></h3>
        <div className="bk-third-card">
          <BracketCard v={thirdView} />
        </div>
      </section>
    </div>
  );
}
