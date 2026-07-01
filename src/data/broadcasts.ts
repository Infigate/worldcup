import type { Broadcast } from '../types';

// 2026年W杯の日本国内における放送・配信 (2026年7月時点の発表に基づき随時更新)
export const BROADCASTS: Broadcast[] = [
  { id: 'dazn', name: 'DAZN', type: '配信', note: '全104試合をライブ・見逃し配信' },
  { id: 'abemadazn', name: 'ABEMA de DAZN', type: '配信', note: 'ABEMA経由でDAZNを契約して視聴' },
  { id: 'nhkbs4k', name: 'NHK BSプレミアム4K', type: 'BS', note: '全104試合を生中継または録画で放送' },
  { id: 'nhk', name: 'NHK総合', type: '地上波', note: '決勝トーナメントは決勝を含む15試合を地上波生中継' },
  { id: 'ntv', name: '日本テレビ系', type: '地上波', note: '決勝トーナメントを含む複数試合を生中継' },
  { id: 'fuji', name: 'フジテレビ系', type: '地上波', note: '決勝トーナメントを含む複数試合を生中継(一部は順次発表)' },
];

export const broadcastById = (id: string): Broadcast => BROADCASTS.find((b) => b.id === id)!;
