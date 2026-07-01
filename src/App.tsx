import { useEffect } from 'react';
import { BracketPage } from './components/BracketPage';
import { FollowPage } from './components/FollowPage';
import { Header } from './components/Header';
import { MatchDetailModal } from './components/MatchDetailModal';
import { SchedulePage } from './components/SchedulePage';
import { useTournament } from './hooks';
import { useAppStore } from './store';

export default function App() {
  const tab = useAppStore((s) => s.tab);
  const tick = useAppStore((s) => s.tick);

  useEffect(() => {
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tick]);

  const t = useTournament();

  return (
    <div className="app">
      <Header t={t} />
      <main className="main">
        {tab === 'bracket' && <BracketPage t={t} />}
        {tab === 'schedule' && <SchedulePage t={t} />}
        {tab === 'follow' && <FollowPage t={t} />}
      </main>
      <footer className="footer">
        グループステージは終了。本サイトは決勝トーナメント(ラウンド32以降)に絞って掲載しています。日程・会場はFIFA公式発表、
        試合結果は src/data/results.json の更新時に反映されます(npm run update-results)。放送・配信情報は発表内容に基づき随時更新します。
      </footer>
      <MatchDetailModal t={t} />
    </div>
  );
}
