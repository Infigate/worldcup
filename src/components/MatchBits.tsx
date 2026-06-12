import { broadcastById } from '../data/broadcasts';
import { teamById } from '../data/teams';
import { venueById } from '../data/venues';
import { useFollowedTeamIds } from '../hooks';
import { useAppStore } from '../store';
import type { MatchView } from '../types';
import { fmtJstTime, fmtLocalTime } from '../utils/time';

const CHIP_CLASS: Record<string, string> = { 地上波: 'chip-terr', BS: 'chip-bs', 配信: 'chip-stream' };

export function StatusBadge({ v }: { v: MatchView }) {
  if (v.status === 'finished') return <span className="badge badge-finished">終了</span>;
  if (v.phaseLabel === '結果更新待ち') return <span className="badge badge-pending">結果待ち</span>;
  return <span className="badge badge-scheduled">予定</span>;
}

export function BroadcastChips({ ids, max }: { ids: string[]; max?: number }) {
  const shown = max ? ids.slice(0, max) : ids;
  return (
    <span className="chips">
      {shown.map((id) => {
        const b = broadcastById(id);
        return (
          <span key={id} className={`chip ${CHIP_CLASS[b.type]}`} title={`${b.type}: ${b.note}`}>
            {b.name}
          </span>
        );
      })}
      {max && ids.length > max && <span className="chip chip-more">+{ids.length - max}</span>}
    </span>
  );
}

export function MatchRow({ v, compact }: { v: MatchView; compact?: boolean }) {
  const selectMatch = useAppStore((s) => s.selectMatch);
  const followed = useFollowedTeamIds();
  const m = v.match;
  const venue = venueById(m.venueId);
  const home = v.homeTeamId ? teamById(v.homeTeamId) : null;
  const away = v.awayTeamId ? teamById(v.awayTeamId) : null;

  return (
    <button className={`match-row status-${v.status}`} onClick={() => selectMatch(m.id)}>
      <div className="mr-time">
        <span className="mr-jst">{fmtJstTime(m.kickoffUtc)}</span>
        <span className="mr-local">現地 {fmtLocalTime(m.kickoffUtc, venue.tz)}</span>
      </div>
      <div className="mr-teams">
        <span className={`mr-side mr-home ${home && followed.has(home.id) ? 'followed' : ''}`}>
          {home ? `${home.name} ${home.flag}` : m.homeLabel ?? '未定'}
        </span>
        <span className="mr-score">
          {v.homeScore !== null ? (
            <>
              {v.homeScore} - {v.awayScore}
              {v.pkText && <small className="mr-pk">{v.pkText}</small>}
            </>
          ) : (
            'vs'
          )}
        </span>
        <span className={`mr-side mr-away ${away && followed.has(away.id) ? 'followed' : ''}`}>
          {away ? `${away.flag} ${away.name}` : m.awayLabel ?? '未定'}
        </span>
      </div>
      <StatusBadge v={v} />
      {!compact && (
        <div className="mr-meta">
          <span className="mr-venue" title={venue.name}>
            📍 {venue.city}
          </span>
          <BroadcastChips ids={m.broadcastIds} max={4} />
        </div>
      )}
    </button>
  );
}
