import { broadcastById } from '../data/broadcasts';
import { STAGE_LABELS } from '../data/schedule';
import { teamById } from '../data/teams';
import { venueById } from '../data/venues';
import { useAppStore } from '../store';
import type { TournamentState } from '../types';
import { fmtJst, fmtLocal } from '../utils/time';
import { StatusBadge } from './MatchBits';

const CHIP_CLASS: Record<string, string> = { 地上波: 'chip-terr', BS: 'chip-bs', 配信: 'chip-stream' };

export function MatchDetailModal({ t }: { t: TournamentState }) {
  const selectedMatchId = useAppStore((s) => s.selectedMatchId);
  const selectMatch = useAppStore((s) => s.selectMatch);
  const followedTeams = useAppStore((s) => s.followedTeams);
  const toggleTeam = useAppStore((s) => s.toggleTeam);

  if (!selectedMatchId) return null;
  const v = t.views.get(selectedMatchId);
  if (!v) return null;

  const m = v.match;
  const venue = venueById(m.venueId);
  const home = v.homeTeamId ? teamById(v.homeTeamId) : null;
  const away = v.awayTeamId ? teamById(v.awayTeamId) : null;

  const TeamBlock = ({ team, label }: { team: typeof home; label?: string }) => (
    <div className="md-team">
      {team ? (
        <>
          <span className="md-flag">{team.flag}</span>
          <span className="md-name">{team.name}</span>
          <button
            className={`star ${followedTeams.includes(team.id) ? 'on' : ''}`}
            onClick={() => toggleTeam(team.id)}
          >
            {followedTeams.includes(team.id) ? '★ フォロー中' : '☆ フォロー'}
          </button>
        </>
      ) : (
        <span className="md-name tbd">{label ?? '未定'}</span>
      )}
    </div>
  );

  return (
    <div className="modal-overlay" onClick={() => selectMatch(null)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => selectMatch(null)}>
          ✕
        </button>

        <div className="md-stage">
          {STAGE_LABELS[m.stage]}
          {m.group ? ` グループ${m.group} 第${m.matchday}節` : ''}
        </div>

        <div className="md-scoreboard">
          <TeamBlock team={home} label={m.homeLabel} />
          <div className="md-center">
            <div className="md-score">
              {v.homeScore !== null ? `${v.homeScore} - ${v.awayScore}` : 'vs'}
            </div>
            {v.pkText && <div className="md-pk">{v.pkText}</div>}
            <StatusBadge v={v} />
            {v.phaseLabel !== '開始前' && v.phaseLabel !== '試合終了' && (
              <div className="md-phase">{v.phaseLabel}</div>
            )}
          </div>
          <TeamBlock team={away} label={m.awayLabel} />
        </div>

        <div className="md-info">
          <div className="md-info-row">
            <span className="md-label">🇯🇵 日本時間</span>
            <b>{fmtJst(m.kickoffUtc)} キックオフ</b>
          </div>
          <div className="md-info-row">
            <span className="md-label">📍 現地時刻</span>
            <b>{fmtLocal(m.kickoffUtc, venue.tz)} キックオフ</b>
          </div>
          <div className="md-info-row">
            <span className="md-label">🏟️ 会場</span>
            <span>
              {venue.name}({venue.city} / {venue.country})収容 {venue.capacity.toLocaleString()}人
            </span>
          </div>
        </div>

        <div className="md-broadcasts">
          <h4>📺 視聴できるツール</h4>
          <ul>
            {m.broadcastIds.map((id) => {
              const b = broadcastById(id);
              return (
                <li key={id}>
                  <span className={`chip ${CHIP_CLASS[b.type]}`}>{b.name}</span>
                  <small>
                    {b.type} — {b.note}
                  </small>
                </li>
              );
            })}
          </ul>
        </div>

      </div>
    </div>
  );
}
