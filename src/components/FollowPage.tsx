import { PLAYERS } from '../data/players';
import { TEAMS, teamById } from '../data/teams';
import { useFollowedTeamIds } from '../hooks';
import { useAppStore } from '../store';
import type { MatchView, TournamentState } from '../types';
import { fmtCountdown } from '../utils/time';
import { MatchRow } from './MatchBits';

export function FollowPage({ t }: { t: TournamentState }) {
  const followedTeams = useAppStore((s) => s.followedTeams);
  const followedPlayers = useAppStore((s) => s.followedPlayers);
  const toggleTeam = useAppStore((s) => s.toggleTeam);
  const togglePlayer = useAppStore((s) => s.togglePlayer);
  const now = useAppStore((s) => s.now);
  const followed = useFollowedTeamIds();

  const involvesFollowed = (v: MatchView) =>
    (!!v.homeTeamId && followed.has(v.homeTeamId)) || (!!v.awayTeamId && followed.has(v.awayTeamId));

  const all = [...t.views.values()].sort((a, b) => a.match.kickoffUtc.localeCompare(b.match.kickoffUtc));
  const pending = all.filter((v) => v.status === 'scheduled' && v.phaseLabel === '結果更新待ち' && involvesFollowed(v));
  const upcoming = all
    .filter((v) => v.status === 'scheduled' && v.phaseLabel === '開始前' && involvesFollowed(v))
    .slice(0, 6);
  const recent = all
    .filter((v) => v.status === 'finished' && involvesFollowed(v))
    .slice(-6)
    .reverse();

  const hasFollows = followed.size > 0;

  return (
    <div className="page">
      <div className="page-head">
        <h2>マイフォロー</h2>
        <p className="page-desc">注目の国・選手を選ぶと、関連する試合を自動で追っかけ。結果は1日4回の更新で反映されます。</p>
      </div>

      {hasFollows && (
        <section className="follow-feed">
          <h3>📡 フォロー中の試合</h3>

          {pending.length > 0 && (
            <>
              <h4>⏳ 結果更新待ち</h4>
              <div className="follow-rows">
                {pending.map((v) => (
                  <MatchRow key={v.match.id} v={v} compact />
                ))}
              </div>
            </>
          )}

          <h4>⏰ 今後の試合</h4>
          {upcoming.length > 0 ? (
            <div className="follow-rows">
              {upcoming.map((v) => (
                <div key={v.match.id} className="follow-upcoming">
                  <span className="countdown">{fmtCountdown(Date.parse(v.match.kickoffUtc) - now)}</span>
                  <MatchRow v={v} />
                </div>
              ))}
            </div>
          ) : (
            <p className="empty">予定されているフォロー試合はありません。</p>
          )}

          <h4>📋 最近の結果</h4>
          {recent.length > 0 ? (
            <div className="follow-rows">
              {recent.map((v) => (
                <MatchRow key={v.match.id} v={v} compact />
              ))}
            </div>
          ) : (
            <p className="empty">終了したフォロー試合はまだありません。</p>
          )}
        </section>
      )}

      <section className="pick-section">
        <h3>🌍 国を選択 ({followedTeams.length})</h3>
        <div className="team-pick-grid">
          {TEAMS.map((team) => {
            const on = followedTeams.includes(team.id);
            return (
              <button key={team.id} className={`team-pick ${on ? 'on' : ''}`} onClick={() => toggleTeam(team.id)}>
                <span className="tp-flag">{team.flag}</span>
                <span className="tp-name">{team.name}</span>
                <span className="tp-group">{team.group}組</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="pick-section">
        <h3>⭐ 注目選手を選択 ({followedPlayers.length})</h3>
        <div className="player-pick-grid">
          {PLAYERS.map((p) => {
            const team = teamById(p.teamId);
            const on = followedPlayers.includes(p.id);
            return (
              <button key={p.id} className={`player-pick ${on ? 'on' : ''}`} onClick={() => togglePlayer(p.id)}>
                <div className="pp-top">
                  <span className="pp-name">{p.name}</span>
                  <span className="pp-star">{on ? '★' : '☆'}</span>
                </div>
                <div className="pp-meta">
                  {team.flag} {team.name} / {p.position} / {p.club}
                </div>
                <div className="pp-note">{p.note}</div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
