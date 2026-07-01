import { useState } from 'react';
import { BROADCASTS } from '../data/broadcasts';
import { SCHEDULE, STAGE_LABELS } from '../data/schedule';
import { useFollowedTeamIds } from '../hooks';
import type { MatchStatus, TournamentState } from '../types';
import { fmtJstDate } from '../utils/time';
import { MatchRow } from './MatchBits';

type StatusFilter = 'all' | MatchStatus;

export function SchedulePage({ t }: { t: TournamentState }) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [followedOnly, setFollowedOnly] = useState(false);
  const followed = useFollowedTeamIds();

  // グループステージは終了済み。決勝トーナメント(ラウンド32以降)のみ掲載。
  const filtered = SCHEDULE.filter((m) => {
    if (m.stage === 'group') return false;
    const v = t.views.get(m.id)!;
    if (statusFilter !== 'all' && v.status !== statusFilter) return false;
    if (followedOnly) {
      const involves =
        (v.homeTeamId && followed.has(v.homeTeamId)) || (v.awayTeamId && followed.has(v.awayTeamId));
      if (!involves) return false;
    }
    return true;
  });

  // 日本時間の日付ごとにグループ化
  const byDate = new Map<string, typeof filtered>();
  for (const m of filtered) {
    const key = fmtJstDate(m.kickoffUtc);
    if (!byDate.has(key)) byDate.set(key, []);
    byDate.get(key)!.push(m);
  }

  return (
    <div className="page">
      <div className="page-head">
        <h2>決勝トーナメント 日程・放送/配信</h2>
        <p className="page-desc">
          ラウンド32以降の全試合。時刻は日本時間(JST)と現地時刻を併記。クリックで詳細・視聴ツールを表示。
        </p>
      </div>

      <div className="broadcast-legend">
        <h3>視聴できるツール</h3>
        <div className="bl-grid">
          {BROADCASTS.map((b) => (
            <div key={b.id} className="bl-item">
              <span className={`chip ${b.type === '地上波' ? 'chip-terr' : b.type === 'BS' ? 'chip-bs' : 'chip-stream'}`}>
                {b.name}
              </span>
              <small>
                {b.type} — {b.note}
              </small>
            </div>
          ))}
        </div>
      </div>

      <div className="filters">
        <div className="filter-group">
          {(
            [
              ['all', '全状態'],
              ['scheduled', '開始前'],
              ['finished', '終了'],
            ] as [StatusFilter, string][]
          ).map(([key, label]) => (
            <button key={key} className={`filter-btn ${statusFilter === key ? 'active' : ''}`} onClick={() => setStatusFilter(key)}>
              {label}
            </button>
          ))}
        </div>
        <label className={`filter-btn toggle ${followedOnly ? 'active' : ''}`}>
          <input type="checkbox" checked={followedOnly} onChange={(e) => setFollowedOnly(e.target.checked)} />
          ★ フォロー中のみ
        </label>
      </div>

      {filtered.length === 0 && <p className="empty">条件に合う試合がありません。</p>}

      {[...byDate.entries()].map(([date, ms]) => (
        <section key={date} className="day-section">
          <h3 className="day-title">{date} <small>日本時間</small></h3>
          <div className="day-matches">
            {ms.map((m) => {
              const v = t.views.get(m.id)!;
              return (
                <div key={m.id} className="day-match">
                  <span className="stage-tag">
                    {STAGE_LABELS[m.stage]}
                    {m.group ? ` ${m.group}組` : ''}
                  </span>
                  <MatchRow v={v} />
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
