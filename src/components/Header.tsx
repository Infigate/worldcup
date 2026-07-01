import { teamById } from '../data/teams';
import { LAST_UPDATED } from '../engine';
import { useAppStore, type Tab } from '../store';
import type { TournamentState } from '../types';
import { fmtJst, fmtClock } from '../utils/time';

const TABS: [Tab, string][] = [
  ['bracket', '決勝トーナメント'],
  ['schedule', '日程・放送'],
  ['follow', 'マイフォロー'],
];

export function Header({ t }: { t: TournamentState }) {
  const tab = useAppStore((s) => s.tab);
  const setTab = useAppStore((s) => s.setTab);
  const now = useAppStore((s) => s.now);
  const followedTeams = useAppStore((s) => s.followedTeams);
  const followedPlayers = useAppStore((s) => s.followedPlayers);

  const champion = t.championId ? teamById(t.championId) : null;
  const followCount = followedTeams.length + followedPlayers.length;
  const pendingCount = [...t.views.values()].filter((v) => v.phaseLabel === '結果更新待ち').length;

  return (
    <header className="header">
      <div className="header-top">
        <h1>
          <span className="trophy">🏆</span> FIFA ワールドカップ 2026
        </h1>
        <p className="header-sub">アメリカ・カナダ・メキシコ大会 — 48カ国 / 104試合 / 16都市</p>
      </div>

      {champion && (
        <div className="champion-banner">
          🎉 優勝: {champion.flag} {champion.name} 🎉
        </div>
      )}

      <div className="update-info">
        <span className="update-clock">🕒 {fmtClock(now)} JST</span>
        📡 結果データ最終更新: <b>{fmtJst(LAST_UPDATED)}</b>
        {pendingCount > 0 && <span className="update-pending">結果待ち {pendingCount}試合</span>}
      </div>

      <nav className="tabs">
        {TABS.map(([key, label]) => (
          <button key={key} className={`tab ${tab === key ? 'active' : ''}`} onClick={() => setTab(key)}>
            {label}
            {key === 'follow' && followCount > 0 && <span className="tab-badge">{followCount}</span>}
          </button>
        ))}
      </nav>
    </header>
  );
}
