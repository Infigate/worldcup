// 試合結果を openfootball/worldcup.json (パブリックドメイン) から取得して
// src/data/results.json に反映するスクリプト。
//   実行: npm run update-results
// フィードにまだスコアが無い試合はスキップされる。手動で編集する場合は
// src/data/results.json の results に { "m<試合番号>": { "score": [h, a] } } を追記する。
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const FEED_URL = 'https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RESULTS_PATH = path.join(__dirname, '../src/data/results.json');

// openfootballの英語チーム名 → 本アプリのチームID (表記ゆれを含む)
const TEAM_ALIASES = {
  mexico: 'mex',
  'south africa': 'rsa',
  'south korea': 'kor', 'korea republic': 'kor',
  'czech republic': 'cze', czechia: 'cze',
  canada: 'can',
  'bosnia and herzegovina': 'bih', 'bosnia-herzegovina': 'bih', bosnia: 'bih',
  qatar: 'qat',
  switzerland: 'sui',
  brazil: 'bra',
  morocco: 'mar',
  haiti: 'hai',
  scotland: 'sco',
  'united states': 'usa', usa: 'usa',
  paraguay: 'par',
  australia: 'aus',
  turkey: 'tur', turkiye: 'tur', 'türkiye': 'tur',
  germany: 'ger',
  curacao: 'cuw', 'curaçao': 'cuw',
  "cote d'ivoire": 'civ', "côte d'ivoire": 'civ', 'ivory coast': 'civ',
  ecuador: 'ecu',
  netherlands: 'ned',
  japan: 'jpn',
  sweden: 'swe',
  tunisia: 'tun',
  belgium: 'bel',
  egypt: 'egy',
  iran: 'irn', 'ir iran': 'irn',
  'new zealand': 'nzl',
  spain: 'esp',
  'cape verde': 'cpv', 'cabo verde': 'cpv',
  'saudi arabia': 'ksa',
  uruguay: 'uru',
  france: 'fra',
  senegal: 'sen',
  iraq: 'irq',
  norway: 'nor',
  argentina: 'arg',
  algeria: 'alg',
  austria: 'aut',
  jordan: 'jor',
  portugal: 'por',
  'dr congo': 'cod', 'congo dr': 'cod', 'democratic republic of the congo': 'cod',
  uzbekistan: 'uzb',
  colombia: 'col',
  england: 'eng',
  croatia: 'cro',
  ghana: 'gha',
  panama: 'pan',
};

function teamId(name) {
  if (!name) return null;
  const key = String(name).toLowerCase().trim();
  return TEAM_ALIASES[key] ?? null;
}

// 本アプリのグループステージ日程 (試合番号 → [ホームID, アウェイID, 現地日付])。
// schedule.ts と同一データ。照合キーとして使用。
const GROUP_FIXTURES = [
  [1, 'mex', 'rsa', '2026-06-11'], [2, 'kor', 'cze', '2026-06-11'],
  [3, 'can', 'bih', '2026-06-12'], [4, 'usa', 'par', '2026-06-12'],
  [5, 'hai', 'sco', '2026-06-13'], [6, 'aus', 'tur', '2026-06-13'],
  [7, 'bra', 'mar', '2026-06-13'], [8, 'qat', 'sui', '2026-06-13'],
  [9, 'civ', 'ecu', '2026-06-14'], [10, 'ger', 'cuw', '2026-06-14'],
  [11, 'ned', 'jpn', '2026-06-14'], [12, 'swe', 'tun', '2026-06-14'],
  [13, 'ksa', 'uru', '2026-06-15'], [14, 'esp', 'cpv', '2026-06-15'],
  [15, 'irn', 'nzl', '2026-06-15'], [16, 'bel', 'egy', '2026-06-15'],
  [17, 'fra', 'sen', '2026-06-16'], [18, 'irq', 'nor', '2026-06-16'],
  [19, 'arg', 'alg', '2026-06-16'], [20, 'aut', 'jor', '2026-06-16'],
  [21, 'gha', 'pan', '2026-06-17'], [22, 'eng', 'cro', '2026-06-17'],
  [23, 'por', 'cod', '2026-06-17'], [24, 'uzb', 'col', '2026-06-17'],
  [25, 'cze', 'rsa', '2026-06-18'], [26, 'sui', 'bih', '2026-06-18'],
  [27, 'can', 'qat', '2026-06-18'], [28, 'mex', 'kor', '2026-06-18'],
  [29, 'bra', 'hai', '2026-06-19'], [30, 'sco', 'mar', '2026-06-19'],
  [31, 'tur', 'par', '2026-06-19'], [32, 'usa', 'aus', '2026-06-19'],
  [33, 'ger', 'civ', '2026-06-20'], [34, 'ecu', 'cuw', '2026-06-20'],
  [35, 'ned', 'swe', '2026-06-20'], [36, 'tun', 'jpn', '2026-06-20'],
  [37, 'uru', 'cpv', '2026-06-21'], [38, 'esp', 'ksa', '2026-06-21'],
  [39, 'bel', 'irn', '2026-06-21'], [40, 'nzl', 'egy', '2026-06-21'],
  [41, 'nor', 'sen', '2026-06-22'], [42, 'fra', 'irq', '2026-06-22'],
  [43, 'arg', 'aut', '2026-06-22'], [44, 'jor', 'alg', '2026-06-22'],
  [45, 'eng', 'gha', '2026-06-23'], [46, 'pan', 'cro', '2026-06-23'],
  [47, 'por', 'uzb', '2026-06-23'], [48, 'col', 'cod', '2026-06-23'],
  [49, 'sco', 'bra', '2026-06-24'], [50, 'mar', 'hai', '2026-06-24'],
  [51, 'sui', 'can', '2026-06-24'], [52, 'bih', 'qat', '2026-06-24'],
  [53, 'cze', 'mex', '2026-06-24'], [54, 'rsa', 'kor', '2026-06-24'],
  [55, 'cuw', 'civ', '2026-06-25'], [56, 'ecu', 'ger', '2026-06-25'],
  [57, 'jpn', 'swe', '2026-06-25'], [58, 'tun', 'ned', '2026-06-25'],
  [59, 'tur', 'usa', '2026-06-25'], [60, 'par', 'aus', '2026-06-25'],
  [61, 'nor', 'fra', '2026-06-26'], [62, 'sen', 'irq', '2026-06-26'],
  [63, 'egy', 'irn', '2026-06-26'], [64, 'nzl', 'bel', '2026-06-26'],
  [65, 'cpv', 'ksa', '2026-06-26'], [66, 'uru', 'esp', '2026-06-26'],
  [67, 'pan', 'eng', '2026-06-27'], [68, 'cro', 'gha', '2026-06-27'],
  [69, 'alg', 'aut', '2026-06-27'], [70, 'jor', 'arg', '2026-06-27'],
  [71, 'col', 'por', '2026-06-27'], [72, 'cod', 'uzb', '2026-06-27'],
];

// チームペア(順不同)→ 試合番号
const pairKey = (a, b) => [a, b].sort().join('|');
const FIXTURE_BY_PAIR = new Map(GROUP_FIXTURES.map(([n, h, a]) => [pairKey(h, a), n]));

function extractScore(m) {
  // openfootballのスコア表現の揺れに対応
  if (typeof m.score1 === 'number' && typeof m.score2 === 'number') return [m.score1, m.score2];
  if (m.score?.ft && Array.isArray(m.score.ft)) return m.score.ft;
  if (Array.isArray(m.score) && m.score.length === 2) return m.score;
  return null;
}

async function main() {
  console.log(`フィード取得中: ${FEED_URL}`);
  const res = await fetch(FEED_URL);
  if (!res.ok) {
    console.error(`取得失敗: HTTP ${res.status}。src/data/results.json を手動で編集してください。`);
    process.exit(1);
  }
  const feed = await res.json();
  const matches = feed.matches ?? feed.rounds?.flatMap((r) => r.matches) ?? [];
  if (!matches.length) {
    console.error('フィードに試合データがありません。形式が変わった可能性があります。');
    process.exit(1);
  }

  const data = JSON.parse(await readFile(RESULTS_PATH, 'utf8'));
  let updated = 0;
  let unmatched = 0;

  for (const m of matches) {
    const score = extractScore(m);
    if (!score) continue;
    const h = teamId(m.team1?.name ?? m.team1);
    const a = teamId(m.team2?.name ?? m.team2);
    if (!h || !a) {
      console.warn(`チーム名を解決できません: ${JSON.stringify(m.team1)} vs ${JSON.stringify(m.team2)}`);
      unmatched++;
      continue;
    }
    const n = m.num ?? FIXTURE_BY_PAIR.get(pairKey(h, a));
    if (!n) {
      console.warn(`日程と照合できません: ${h} vs ${a} (ノックアウトは手動で追記してください)`);
      unmatched++;
      continue;
    }
    const id = `m${n}`;
    // フィードのhome/awayが本アプリと逆向きの場合はスコアを入れ替える
    const fixture = GROUP_FIXTURES.find(([num]) => num === n);
    const flipped = fixture && fixture[1] !== h;
    const entry = { score: flipped ? [score[1], score[0]] : score };
    const prev = data.results[id];
    if (!prev || prev.score[0] !== entry.score[0] || prev.score[1] !== entry.score[1]) {
      data.results[id] = { ...prev, ...entry };
      console.log(`更新: ${id} ${h} ${entry.score[0]} - ${entry.score[1]} ${a}`);
      updated++;
    }
  }

  if (updated > 0) {
    data.lastUpdated = new Date().toISOString();
    await writeFile(RESULTS_PATH, JSON.stringify(data, null, 2) + '\n');
  }
  console.log(`完了: ${updated}件更新 / 照合不可${unmatched}件 / 総${matches.length}試合分のフィード`);
  if (updated === 0) {
    console.log('新しい結果はありませんでした(フィード未反映の場合は results.json を手動編集)。');
  }
}

main().catch((e) => {
  console.error('エラー:', e.message);
  process.exit(1);
});
