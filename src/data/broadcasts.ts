import type { Broadcast } from '../types';

// 2026年W杯の日本国内における放送・配信 (2026年6月時点の発表に基づく)
export const BROADCASTS: Broadcast[] = [
  { id: 'dazn', name: 'DAZN', type: '配信', note: '全104試合をライブ配信。日本戦3試合は無料配信' },
  { id: 'abemadazn', name: 'ABEMA de DAZN', type: '配信', note: 'ABEMA経由でDAZNを契約して視聴' },
  { id: 'nhkbs4k', name: 'NHK BSプレミアム4K', type: 'BS', note: '全104試合を生中継または録画で放送' },
  { id: 'nhk', name: 'NHK総合', type: '地上波', note: '日本戦第1戦・第3戦ほか一部試合を生中継' },
  { id: 'ntv', name: '日本テレビ', type: '地上波', note: '日本戦第2戦(チュニジア戦)を生中継' },
  { id: 'fuji', name: 'フジテレビ', type: '地上波', note: '一部試合を放送(対戦カードは順次発表)' },
];

export const broadcastById = (id: string): Broadcast => BROADCASTS.find((b) => b.id === id)!;
