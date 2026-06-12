import { GROUPS, teamById } from '../data/teams';
import { SCHEDULE } from '../data/schedule';
import { venueById } from '../data/venues';
import { useAppStore } from '../store';
import type { MatchView, TournamentState } from '../types';
import { fmtJst } from '../utils/time';
import { StatusBadge } from './MatchBits';

function MiniMatch({ v }: { v: MatchView }) {
  const selectMatch = useAppStore((s) => s.selectMatch);
  const home = v.homeTeamId ? teamById(v.homeTeamId) : null;
  const away = v.awayTeamId ? teamById(v.awayTeamId) : null;
  return (
    <button className={`mini-match status-${v.status}`} onClick={() => selectMatch(v.match.id)}>
      <span className="mm-kickoff">{fmtJst(v.match.kickoffUtc)}</span>
      <span className="mm-teams">
        {home?.flag} {home?.name}
        <b className="mm-score">{v.homeScore !== null ? `${v.homeScore} - ${v.awayScore}` : '–'}</b>
        {away?.name} {away?.flag}
      </span>
      <StatusBadge v={v} />
    </button>
  );
}

export function GroupsPage({ t }: { t: TournamentState }) {
  const followedTeams = useAppStore((s) => s.followedTeams);
  const toggleTeam = useAppStore((s) => s.toggleTeam);

  return (
    <div className="page">
      <div className="page-head">
        <h2>グループステージ</h2>
        <p className="page-desc">
          12組×4カ国。各組上位2カ国と、3位のうち成績上位8カ国がラウンド32へ進出。
          <span className="lg lg-1">■</span> 1-2位 <span className="lg lg-3">■</span> 3位(上位8枠で進出の可能性)
        </p>
      </div>
      <div className="groups-grid">
        {GROUPS.map((g) => {
          const rows = t.standings.get(g)!;
          const groupMatches = SCHEDULE.filter((m) => m.stage === 'group' && m.group === g);
          return (
            <section className="group-card" key={g}>
              <h3 className="group-title">グループ {g}</h3>
              <table className="standings">
                <thead>
                  <tr>
                    <th className="col-pos">#</th>
                    <th className="col-team">チーム</th>
                    <th>試</th>
                    <th>勝</th>
                    <th>分</th>
                    <th>敗</th>
                    <th>得失</th>
                    <th>点</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => {
                    const team = teamById(r.teamId);
                    const followed = followedTeams.includes(r.teamId);
                    return (
                      <tr key={r.teamId} className={`rank-${i + 1}`}>
                        <td className="col-pos">{i + 1}</td>
                        <td className="col-team">
                          <button
                            className={`star ${followed ? 'on' : ''}`}
                            title={followed ? 'フォロー解除' : 'この国をフォロー'}
                            onClick={() => toggleTeam(r.teamId)}
                          >
                            {followed ? '★' : '☆'}
                          </button>
                          <span className="team-name">
                            {team.flag} {team.name}
                          </span>
                        </td>
                        <td>{r.played}</td>
                        <td>{r.won}</td>
                        <td>{r.drawn}</td>
                        <td>{r.lost}</td>
                        <td className="col-gd">{r.gd > 0 ? `+${r.gd}` : r.gd}</td>
                        <td className="col-pts">{r.pts}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="group-matches">
                {groupMatches.map((m) => (
                  <MiniMatch key={m.id} v={t.views.get(m.id)!} />
                ))}
              </div>
              <div className="group-venue-hint">
                会場: {[...new Set(groupMatches.map((m) => venueById(m.venueId).city))].join(' / ')}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
