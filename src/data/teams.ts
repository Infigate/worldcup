import type { Team } from '../types';

// 2026年W杯の正式な組分け (2025年12月抽選 + 2026年3月プレーオフで確定)
export const TEAMS: Team[] = [
  // Group A
  { id: 'mex', name: 'メキシコ', nameEn: 'Mexico', flag: '🇲🇽', group: 'A' },
  { id: 'rsa', name: '南アフリカ', nameEn: 'South Africa', flag: '🇿🇦', group: 'A' },
  { id: 'kor', name: '韓国', nameEn: 'South Korea', flag: '🇰🇷', group: 'A' },
  { id: 'cze', name: 'チェコ', nameEn: 'Czech Republic', flag: '🇨🇿', group: 'A' },
  // Group B
  { id: 'can', name: 'カナダ', nameEn: 'Canada', flag: '🇨🇦', group: 'B' },
  { id: 'bih', name: 'ボスニア・ヘルツェゴビナ', nameEn: 'Bosnia and Herzegovina', flag: '🇧🇦', group: 'B' },
  { id: 'qat', name: 'カタール', nameEn: 'Qatar', flag: '🇶🇦', group: 'B' },
  { id: 'sui', name: 'スイス', nameEn: 'Switzerland', flag: '🇨🇭', group: 'B' },
  // Group C
  { id: 'bra', name: 'ブラジル', nameEn: 'Brazil', flag: '🇧🇷', group: 'C' },
  { id: 'mar', name: 'モロッコ', nameEn: 'Morocco', flag: '🇲🇦', group: 'C' },
  { id: 'hai', name: 'ハイチ', nameEn: 'Haiti', flag: '🇭🇹', group: 'C' },
  { id: 'sco', name: 'スコットランド', nameEn: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', group: 'C' },
  // Group D
  { id: 'usa', name: 'アメリカ', nameEn: 'United States', flag: '🇺🇸', group: 'D' },
  { id: 'par', name: 'パラグアイ', nameEn: 'Paraguay', flag: '🇵🇾', group: 'D' },
  { id: 'aus', name: 'オーストラリア', nameEn: 'Australia', flag: '🇦🇺', group: 'D' },
  { id: 'tur', name: 'トルコ', nameEn: 'Turkey', flag: '🇹🇷', group: 'D' },
  // Group E
  { id: 'ger', name: 'ドイツ', nameEn: 'Germany', flag: '🇩🇪', group: 'E' },
  { id: 'cuw', name: 'キュラソー', nameEn: 'Curaçao', flag: '🇨🇼', group: 'E' },
  { id: 'civ', name: 'コートジボワール', nameEn: "Côte d'Ivoire", flag: '🇨🇮', group: 'E' },
  { id: 'ecu', name: 'エクアドル', nameEn: 'Ecuador', flag: '🇪🇨', group: 'E' },
  // Group F
  { id: 'ned', name: 'オランダ', nameEn: 'Netherlands', flag: '🇳🇱', group: 'F' },
  { id: 'jpn', name: '日本', nameEn: 'Japan', flag: '🇯🇵', group: 'F' },
  { id: 'swe', name: 'スウェーデン', nameEn: 'Sweden', flag: '🇸🇪', group: 'F' },
  { id: 'tun', name: 'チュニジア', nameEn: 'Tunisia', flag: '🇹🇳', group: 'F' },
  // Group G
  { id: 'bel', name: 'ベルギー', nameEn: 'Belgium', flag: '🇧🇪', group: 'G' },
  { id: 'egy', name: 'エジプト', nameEn: 'Egypt', flag: '🇪🇬', group: 'G' },
  { id: 'irn', name: 'イラン', nameEn: 'Iran', flag: '🇮🇷', group: 'G' },
  { id: 'nzl', name: 'ニュージーランド', nameEn: 'New Zealand', flag: '🇳🇿', group: 'G' },
  // Group H
  { id: 'esp', name: 'スペイン', nameEn: 'Spain', flag: '🇪🇸', group: 'H' },
  { id: 'cpv', name: 'カーボベルデ', nameEn: 'Cape Verde', flag: '🇨🇻', group: 'H' },
  { id: 'ksa', name: 'サウジアラビア', nameEn: 'Saudi Arabia', flag: '🇸🇦', group: 'H' },
  { id: 'uru', name: 'ウルグアイ', nameEn: 'Uruguay', flag: '🇺🇾', group: 'H' },
  // Group I
  { id: 'fra', name: 'フランス', nameEn: 'France', flag: '🇫🇷', group: 'I' },
  { id: 'sen', name: 'セネガル', nameEn: 'Senegal', flag: '🇸🇳', group: 'I' },
  { id: 'irq', name: 'イラク', nameEn: 'Iraq', flag: '🇮🇶', group: 'I' },
  { id: 'nor', name: 'ノルウェー', nameEn: 'Norway', flag: '🇳🇴', group: 'I' },
  // Group J
  { id: 'arg', name: 'アルゼンチン', nameEn: 'Argentina', flag: '🇦🇷', group: 'J' },
  { id: 'alg', name: 'アルジェリア', nameEn: 'Algeria', flag: '🇩🇿', group: 'J' },
  { id: 'aut', name: 'オーストリア', nameEn: 'Austria', flag: '🇦🇹', group: 'J' },
  { id: 'jor', name: 'ヨルダン', nameEn: 'Jordan', flag: '🇯🇴', group: 'J' },
  // Group K
  { id: 'por', name: 'ポルトガル', nameEn: 'Portugal', flag: '🇵🇹', group: 'K' },
  { id: 'cod', name: 'DRコンゴ', nameEn: 'DR Congo', flag: '🇨🇩', group: 'K' },
  { id: 'uzb', name: 'ウズベキスタン', nameEn: 'Uzbekistan', flag: '🇺🇿', group: 'K' },
  { id: 'col', name: 'コロンビア', nameEn: 'Colombia', flag: '🇨🇴', group: 'K' },
  // Group L
  { id: 'eng', name: 'イングランド', nameEn: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'L' },
  { id: 'cro', name: 'クロアチア', nameEn: 'Croatia', flag: '🇭🇷', group: 'L' },
  { id: 'gha', name: 'ガーナ', nameEn: 'Ghana', flag: '🇬🇭', group: 'L' },
  { id: 'pan', name: 'パナマ', nameEn: 'Panama', flag: '🇵🇦', group: 'L' },
];

export const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

export const teamById = (id: string): Team => TEAMS.find((t) => t.id === id)!;

export const teamsInGroup = (g: string): Team[] => TEAMS.filter((t) => t.group === g);
