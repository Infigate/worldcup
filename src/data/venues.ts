import type { Venue } from '../types';

export const VENUES: Venue[] = [
  { id: 'metlife', name: 'メットライフ・スタジアム', city: 'ニューヨーク/ニュージャージー', country: 'アメリカ', tz: 'America/New_York', utcOffset: -4, capacity: 82500 },
  { id: 'gillette', name: 'ジレット・スタジアム', city: 'ボストン', country: 'アメリカ', tz: 'America/New_York', utcOffset: -4, capacity: 65878 },
  { id: 'lincoln', name: 'リンカーン・ファイナンシャル・フィールド', city: 'フィラデルフィア', country: 'アメリカ', tz: 'America/New_York', utcOffset: -4, capacity: 69796 },
  { id: 'hardrock', name: 'ハードロック・スタジアム', city: 'マイアミ', country: 'アメリカ', tz: 'America/New_York', utcOffset: -4, capacity: 64767 },
  { id: 'mercedes', name: 'メルセデス・ベンツ・スタジアム', city: 'アトランタ', country: 'アメリカ', tz: 'America/New_York', utcOffset: -4, capacity: 71000 },
  { id: 'att', name: 'AT&Tスタジアム', city: 'ダラス', country: 'アメリカ', tz: 'America/Chicago', utcOffset: -5, capacity: 80000 },
  { id: 'nrg', name: 'NRGスタジアム', city: 'ヒューストン', country: 'アメリカ', tz: 'America/Chicago', utcOffset: -5, capacity: 72220 },
  { id: 'arrowhead', name: 'アローヘッド・スタジアム', city: 'カンザスシティ', country: 'アメリカ', tz: 'America/Chicago', utcOffset: -5, capacity: 76416 },
  { id: 'sofi', name: 'SoFiスタジアム', city: 'ロサンゼルス', country: 'アメリカ', tz: 'America/Los_Angeles', utcOffset: -7, capacity: 70240 },
  { id: 'levis', name: "リーバイス・スタジアム", city: 'サンフランシスコ・ベイエリア', country: 'アメリカ', tz: 'America/Los_Angeles', utcOffset: -7, capacity: 68500 },
  { id: 'lumen', name: 'ルーメン・フィールド', city: 'シアトル', country: 'アメリカ', tz: 'America/Los_Angeles', utcOffset: -7, capacity: 69000 },
  { id: 'bmo', name: 'BMOフィールド', city: 'トロント', country: 'カナダ', tz: 'America/Toronto', utcOffset: -4, capacity: 45736 },
  { id: 'bcplace', name: 'BCプレイス', city: 'バンクーバー', country: 'カナダ', tz: 'America/Vancouver', utcOffset: -7, capacity: 54500 },
  { id: 'azteca', name: 'エスタディオ・アステカ', city: 'メキシコシティ', country: 'メキシコ', tz: 'America/Mexico_City', utcOffset: -6, capacity: 87523 },
  { id: 'akron', name: 'エスタディオ・アクロン', city: 'グアダラハラ', country: 'メキシコ', tz: 'America/Mexico_City', utcOffset: -6, capacity: 49850 },
  { id: 'bbva', name: 'エスタディオBBVA', city: 'モンテレイ', country: 'メキシコ', tz: 'America/Monterrey', utcOffset: -6, capacity: 53500 },
];

export const venueById = (id: string): Venue => VENUES.find((v) => v.id === id)!;
