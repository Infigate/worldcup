import type { Match, Stage } from '../types';
import { venueById } from './venues';

// 2026年W杯 公式日程 (出典: FIFA / Wikipedia、2026-06-12取得)
// 形式: [試合番号, 組, ホーム, アウェイ, 日付(月-日), 現地時刻, 会場ID]
type GroupRow = [number, string, string, string, string, string, string];

const GROUP_MATCHES: GroupRow[] = [
  [1, 'A', 'mex', 'rsa', '06-11', '13:00', 'azteca'],
  [2, 'A', 'kor', 'cze', '06-11', '20:00', 'akron'],
  [3, 'B', 'can', 'bih', '06-12', '15:00', 'bmo'],
  [4, 'D', 'usa', 'par', '06-12', '18:00', 'sofi'],
  [5, 'C', 'hai', 'sco', '06-13', '21:00', 'gillette'],
  [6, 'D', 'aus', 'tur', '06-13', '21:00', 'bcplace'],
  [7, 'C', 'bra', 'mar', '06-13', '18:00', 'metlife'],
  [8, 'B', 'qat', 'sui', '06-13', '12:00', 'levis'],
  [9, 'E', 'civ', 'ecu', '06-14', '19:00', 'lincoln'],
  [10, 'E', 'ger', 'cuw', '06-14', '12:00', 'nrg'],
  [11, 'F', 'ned', 'jpn', '06-14', '15:00', 'att'],
  [12, 'F', 'swe', 'tun', '06-14', '20:00', 'bbva'],
  [13, 'H', 'ksa', 'uru', '06-15', '18:00', 'hardrock'],
  [14, 'H', 'esp', 'cpv', '06-15', '12:00', 'mercedes'],
  [15, 'G', 'irn', 'nzl', '06-15', '18:00', 'sofi'],
  [16, 'G', 'bel', 'egy', '06-15', '12:00', 'lumen'],
  [17, 'I', 'fra', 'sen', '06-16', '15:00', 'metlife'],
  [18, 'I', 'irq', 'nor', '06-16', '18:00', 'gillette'],
  [19, 'J', 'arg', 'alg', '06-16', '20:00', 'arrowhead'],
  [20, 'J', 'aut', 'jor', '06-16', '21:00', 'levis'],
  [21, 'L', 'gha', 'pan', '06-17', '19:00', 'bmo'],
  [22, 'L', 'eng', 'cro', '06-17', '15:00', 'att'],
  [23, 'K', 'por', 'cod', '06-17', '12:00', 'nrg'],
  [24, 'K', 'uzb', 'col', '06-17', '20:00', 'azteca'],
  [25, 'A', 'cze', 'rsa', '06-18', '12:00', 'mercedes'],
  [26, 'B', 'sui', 'bih', '06-18', '12:00', 'sofi'],
  [27, 'B', 'can', 'qat', '06-18', '15:00', 'bcplace'],
  [28, 'A', 'mex', 'kor', '06-18', '19:00', 'akron'],
  [29, 'C', 'bra', 'hai', '06-19', '20:30', 'lincoln'],
  [30, 'C', 'sco', 'mar', '06-19', '18:00', 'gillette'],
  [31, 'D', 'tur', 'par', '06-19', '20:00', 'levis'],
  [32, 'D', 'usa', 'aus', '06-19', '12:00', 'lumen'],
  [33, 'E', 'ger', 'civ', '06-20', '16:00', 'bmo'],
  [34, 'E', 'ecu', 'cuw', '06-20', '19:00', 'arrowhead'],
  [35, 'F', 'ned', 'swe', '06-20', '12:00', 'nrg'],
  [36, 'F', 'tun', 'jpn', '06-20', '22:00', 'bbva'],
  [37, 'H', 'uru', 'cpv', '06-21', '18:00', 'hardrock'],
  [38, 'H', 'esp', 'ksa', '06-21', '12:00', 'mercedes'],
  [39, 'G', 'bel', 'irn', '06-21', '12:00', 'sofi'],
  [40, 'G', 'nzl', 'egy', '06-21', '18:00', 'bcplace'],
  [41, 'I', 'nor', 'sen', '06-22', '20:00', 'metlife'],
  [42, 'I', 'fra', 'irq', '06-22', '17:00', 'lincoln'],
  [43, 'J', 'arg', 'aut', '06-22', '12:00', 'att'],
  [44, 'J', 'jor', 'alg', '06-22', '20:00', 'levis'],
  [45, 'L', 'eng', 'gha', '06-23', '16:00', 'gillette'],
  [46, 'L', 'pan', 'cro', '06-23', '19:00', 'bmo'],
  [47, 'K', 'por', 'uzb', '06-23', '12:00', 'nrg'],
  [48, 'K', 'col', 'cod', '06-23', '20:00', 'akron'],
  [49, 'C', 'sco', 'bra', '06-24', '18:00', 'hardrock'],
  [50, 'C', 'mar', 'hai', '06-24', '18:00', 'mercedes'],
  [51, 'B', 'sui', 'can', '06-24', '12:00', 'bcplace'],
  [52, 'B', 'bih', 'qat', '06-24', '12:00', 'lumen'],
  [53, 'A', 'cze', 'mex', '06-24', '19:00', 'azteca'],
  [54, 'A', 'rsa', 'kor', '06-24', '19:00', 'bbva'],
  [55, 'E', 'cuw', 'civ', '06-25', '16:00', 'lincoln'],
  [56, 'E', 'ecu', 'ger', '06-25', '16:00', 'metlife'],
  [57, 'F', 'jpn', 'swe', '06-25', '18:00', 'att'],
  [58, 'F', 'tun', 'ned', '06-25', '18:00', 'arrowhead'],
  [59, 'D', 'tur', 'usa', '06-25', '19:00', 'sofi'],
  [60, 'D', 'par', 'aus', '06-25', '19:00', 'levis'],
  [61, 'I', 'nor', 'fra', '06-26', '15:00', 'gillette'],
  [62, 'I', 'sen', 'irq', '06-26', '15:00', 'bmo'],
  [63, 'G', 'egy', 'irn', '06-26', '20:00', 'lumen'],
  [64, 'G', 'nzl', 'bel', '06-26', '20:00', 'bcplace'],
  [65, 'H', 'cpv', 'ksa', '06-26', '19:00', 'nrg'],
  [66, 'H', 'uru', 'esp', '06-26', '18:00', 'akron'],
  [67, 'L', 'pan', 'eng', '06-27', '17:00', 'metlife'],
  [68, 'L', 'cro', 'gha', '06-27', '17:00', 'lincoln'],
  [69, 'J', 'alg', 'aut', '06-27', '21:00', 'arrowhead'],
  [70, 'J', 'jor', 'arg', '06-27', '21:00', 'att'],
  [71, 'K', 'col', 'por', '06-27', '19:30', 'hardrock'],
  [72, 'K', 'cod', 'uzb', '06-27', '19:30', 'mercedes'],
];

// ノックアウト: [試合番号, ステージ, 日付, 現地時刻, 会場ID, ホーム表記, アウェイ表記]
type KoRow = [number, Stage, string, string, string, string, string];

const KO_MATCHES: KoRow[] = [
  [73, 'r32', '06-28', '12:00', 'sofi', 'A組2位', 'B組2位'],
  [74, 'r32', '06-29', '16:30', 'gillette', 'E組1位', '3位(A/B/C/D/F組)'],
  [75, 'r32', '06-29', '19:00', 'bbva', 'F組1位', 'C組2位'],
  [76, 'r32', '06-29', '12:00', 'nrg', 'C組1位', 'F組2位'],
  [77, 'r32', '06-30', '17:00', 'metlife', 'I組1位', '3位(C/D/F/G/H組)'],
  [78, 'r32', '06-30', '12:00', 'att', 'E組2位', 'I組2位'],
  [79, 'r32', '06-30', '19:00', 'azteca', 'A組1位', '3位(C/E/F/H/I組)'],
  [80, 'r32', '07-01', '12:00', 'mercedes', 'L組1位', '3位(E/H/I/J/K組)'],
  [81, 'r32', '07-01', '17:00', 'levis', 'D組1位', '3位(B/E/F/I/J組)'],
  [82, 'r32', '07-01', '13:00', 'lumen', 'G組1位', '3位(A/E/H/I/J組)'],
  [83, 'r32', '07-02', '19:00', 'bmo', 'K組2位', 'L組2位'],
  [84, 'r32', '07-02', '12:00', 'sofi', 'H組1位', 'J組2位'],
  [85, 'r32', '07-02', '20:00', 'bcplace', 'B組1位', '3位(E/F/G/I/J組)'],
  [86, 'r32', '07-03', '18:00', 'hardrock', 'J組1位', 'H組2位'],
  [87, 'r32', '07-03', '20:30', 'arrowhead', 'K組1位', '3位(D/E/I/J/L組)'],
  [88, 'r32', '07-03', '13:00', 'att', 'D組2位', 'G組2位'],
  [89, 'r16', '07-04', '17:00', 'lincoln', '第74試合の勝者', '第77試合の勝者'],
  [90, 'r16', '07-04', '12:00', 'nrg', '第73試合の勝者', '第75試合の勝者'],
  [91, 'r16', '07-05', '16:00', 'metlife', '第76試合の勝者', '第78試合の勝者'],
  [92, 'r16', '07-05', '18:00', 'azteca', '第79試合の勝者', '第80試合の勝者'],
  [93, 'r16', '07-06', '14:00', 'att', '第83試合の勝者', '第84試合の勝者'],
  [94, 'r16', '07-06', '17:00', 'lumen', '第81試合の勝者', '第82試合の勝者'],
  [95, 'r16', '07-07', '12:00', 'mercedes', '第86試合の勝者', '第88試合の勝者'],
  [96, 'r16', '07-07', '13:00', 'bcplace', '第85試合の勝者', '第87試合の勝者'],
  [97, 'qf', '07-09', '16:00', 'gillette', '第89試合の勝者', '第90試合の勝者'],
  [98, 'qf', '07-10', '12:00', 'sofi', '第93試合の勝者', '第94試合の勝者'],
  [99, 'qf', '07-11', '17:00', 'hardrock', '第91試合の勝者', '第92試合の勝者'],
  [100, 'qf', '07-11', '20:00', 'arrowhead', '第95試合の勝者', '第96試合の勝者'],
  [101, 'sf', '07-14', '14:00', 'att', '準々決勝1の勝者', '準々決勝2の勝者'],
  [102, 'sf', '07-15', '15:00', 'mercedes', '準々決勝3の勝者', '準々決勝4の勝者'],
  [103, 'third', '07-18', '17:00', 'hardrock', '準決勝1の敗者', '準決勝2の敗者'],
  [104, 'final', '07-19', '15:00', 'metlife', '準決勝1の勝者', '準決勝2の勝者'],
];

// R32の出場枠定義 (公式ブラケット)
export type Slot = { pos: 1 | 2; group: string } | { third: string[] };

export const R32_SLOTS: Record<string, [Slot, Slot]> = {
  m73: [{ pos: 2, group: 'A' }, { pos: 2, group: 'B' }],
  m74: [{ pos: 1, group: 'E' }, { third: ['A', 'B', 'C', 'D', 'F'] }],
  m75: [{ pos: 1, group: 'F' }, { pos: 2, group: 'C' }],
  m76: [{ pos: 1, group: 'C' }, { pos: 2, group: 'F' }],
  m77: [{ pos: 1, group: 'I' }, { third: ['C', 'D', 'F', 'G', 'H'] }],
  m78: [{ pos: 2, group: 'E' }, { pos: 2, group: 'I' }],
  m79: [{ pos: 1, group: 'A' }, { third: ['C', 'E', 'F', 'H', 'I'] }],
  m80: [{ pos: 1, group: 'L' }, { third: ['E', 'H', 'I', 'J', 'K'] }],
  m81: [{ pos: 1, group: 'D' }, { third: ['B', 'E', 'F', 'I', 'J'] }],
  m82: [{ pos: 1, group: 'G' }, { third: ['A', 'E', 'H', 'I', 'J'] }],
  m83: [{ pos: 2, group: 'K' }, { pos: 2, group: 'L' }],
  m84: [{ pos: 1, group: 'H' }, { pos: 2, group: 'J' }],
  m85: [{ pos: 1, group: 'B' }, { third: ['E', 'F', 'G', 'I', 'J'] }],
  m86: [{ pos: 1, group: 'J' }, { pos: 2, group: 'H' }],
  m87: [{ pos: 1, group: 'K' }, { third: ['D', 'E', 'I', 'J', 'L'] }],
  m88: [{ pos: 2, group: 'D' }, { pos: 2, group: 'G' }],
};

// R16以降の供給元: matchId -> [home供給元, away供給元]。thirdのみ敗者、他は勝者。
export const KNOCKOUT_LINKS: Record<string, [string, string]> = {
  m89: ['m74', 'm77'],
  m90: ['m73', 'm75'],
  m91: ['m76', 'm78'],
  m92: ['m79', 'm80'],
  m93: ['m83', 'm84'],
  m94: ['m81', 'm82'],
  m95: ['m86', 'm88'],
  m96: ['m85', 'm87'],
  m97: ['m89', 'm90'],
  m98: ['m93', 'm94'],
  m99: ['m91', 'm92'],
  m100: ['m95', 'm96'],
  m101: ['m97', 'm98'],
  m102: ['m99', 'm100'],
  m103: ['m101', 'm102'],
  m104: ['m101', 'm102'],
};

function kickoffIso(date: string, localTime: string, venueId: string): string {
  const [mo, d] = date.split('-').map(Number);
  const [h, mi] = localTime.split(':').map(Number);
  const offset = venueById(venueId).utcOffset;
  return new Date(Date.UTC(2026, mo - 1, d, h - offset, mi)).toISOString();
}

// 決勝トーナメントの地上波(NHK総合/日本テレビ系/フジテレビ系)中継ラインアップ。
// 出典: NHK・民放各社 発表 (オリコン/Goal.com 等, 2026年7月)。放送局はJST日時で
// 本アプリの日程に対応させて確定分のみ記載 (未発表分は順次追記)。
const TERRESTRIAL_KO: Record<number, string> = {
  // ラウンド32 (NHK総合が決勝T1回戦の主要9試合を地上波中継)
  73: 'nhk', 75: 'nhk', 76: 'nhk', 79: 'nhk', 81: 'nhk', 82: 'nhk', 84: 'nhk', 85: 'nhk', 88: 'nhk',
  // ラウンド16
  89: 'ntv', 90: 'nhk', 91: 'nhk', 93: 'ntv', 94: 'fuji', 96: 'nhk',
  // 準々決勝
  98: 'fuji', 99: 'nhk',
  // 準決勝
  101: 'ntv', 102: 'nhk',
  // 3位決定戦・決勝
  103: 'nhk', 104: 'nhk',
};

// 視聴ツール: DAZN(全試合) + ABEMA de DAZN + NHK BSプレミアム4K(全試合) + 確定済み地上波
function broadcastsFor(n: number): string[] {
  const ids = ['dazn', 'abemadazn', 'nhkbs4k'];
  if (n === 11 || n === 57) ids.push('nhk'); // グループ日本戦第1戦・第3戦 = NHK総合
  if (n === 36) ids.push('ntv'); // グループ日本戦第2戦 = 日本テレビ
  if (TERRESTRIAL_KO[n]) ids.push(TERRESTRIAL_KO[n]); // 決勝トーナメントの地上波
  return ids;
}

function buildSchedule(): Match[] {
  const matches: Match[] = [];
  for (const [n, group, home, away, date, time, venueId] of GROUP_MATCHES) {
    matches.push({
      id: `m${n}`,
      stage: 'group',
      group,
      matchday: n <= 24 ? 1 : n <= 48 ? 2 : 3,
      homeTeamId: home,
      awayTeamId: away,
      kickoffUtc: kickoffIso(date, time, venueId),
      venueId,
      broadcastIds: broadcastsFor(n),
    });
  }
  for (const [n, stage, date, time, venueId, homeLabel, awayLabel] of KO_MATCHES) {
    matches.push({
      id: `m${n}`,
      stage,
      homeLabel,
      awayLabel,
      kickoffUtc: kickoffIso(date, time, venueId),
      venueId,
      broadcastIds: broadcastsFor(n),
    });
  }
  return matches.sort((a, b) => a.kickoffUtc.localeCompare(b.kickoffUtc) || a.id.localeCompare(b.id));
}

export const SCHEDULE: Match[] = buildSchedule();

export const matchById = (id: string): Match => SCHEDULE.find((m) => m.id === id)!;

export const STAGE_LABELS: Record<string, string> = {
  group: 'グループステージ',
  r32: 'ラウンド32',
  r16: 'ラウンド16',
  qf: '準々決勝',
  sf: '準決勝',
  third: '3位決定戦',
  final: '決勝',
};
