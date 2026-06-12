import type { Player } from '../types';

// 注目選手(サンプル)。所属クラブは2025-26シーズン時点の参考情報。
export const PLAYERS: Player[] = [
  // 日本
  { id: 'mitoma', name: '三笘 薫', nameEn: 'Kaoru Mitoma', teamId: 'jpn', position: 'MF', club: 'ブライトン', note: '切れ味鋭いドリブルで左サイドを制圧' },
  { id: 'kubo', name: '久保 建英', nameEn: 'Takefusa Kubo', teamId: 'jpn', position: 'MF', club: 'レアル・ソシエダ', note: '創造性あふれるテクニシャン' },
  { id: 'endo-w', name: '遠藤 航', nameEn: 'Wataru Endo', teamId: 'jpn', position: 'MF', club: 'リバプール', note: 'キャプテン。中盤の潰し屋' },
  { id: 'doan', name: '堂安 律', nameEn: 'Ritsu Doan', teamId: 'jpn', position: 'MF', club: 'フランクフルト', note: '左足の強烈なカットインシュート' },
  { id: 'ueda', name: '上田 綺世', nameEn: 'Ayase Ueda', teamId: 'jpn', position: 'FW', club: 'フェイエノールト', note: 'エースストライカー' },
  { id: 'kamada', name: '鎌田 大地', nameEn: 'Daichi Kamada', teamId: 'jpn', position: 'MF', club: 'クリスタル・パレス', note: 'ゲームを操る司令塔' },
  // アルゼンチン
  { id: 'messi', name: 'リオネル・メッシ', nameEn: 'Lionel Messi', teamId: 'arg', position: 'FW', club: 'インテル・マイアミ', note: 'ラストダンスへ。史上最高の選手' },
  { id: 'alvarez', name: 'フリアン・アルバレス', nameEn: 'Julián Álvarez', teamId: 'arg', position: 'FW', club: 'アトレティコ・マドリード', note: '万能型ストライカー' },
  { id: 'enzo', name: 'エンソ・フェルナンデス', nameEn: 'Enzo Fernández', teamId: 'arg', position: 'MF', club: 'チェルシー', note: '中盤の心臓' },
  // フランス
  { id: 'mbappe', name: 'キリアン・エンバペ', nameEn: 'Kylian Mbappé', teamId: 'fra', position: 'FW', club: 'レアル・マドリード', note: '世界最速のスーパースター' },
  { id: 'griezmann', name: 'アントワーヌ・グリーズマン', nameEn: 'Antoine Griezmann', teamId: 'fra', position: 'FW', club: 'アトレティコ・マドリード', note: '攻撃の潤滑油' },
  // イングランド
  { id: 'bellingham', name: 'ジュード・ベリンガム', nameEn: 'Jude Bellingham', teamId: 'eng', position: 'MF', club: 'レアル・マドリード', note: '全てを兼ね備えたMF' },
  { id: 'kane', name: 'ハリー・ケイン', nameEn: 'Harry Kane', teamId: 'eng', position: 'FW', club: 'バイエルン', note: '得点王候補筆頭' },
  { id: 'saka', name: 'ブカヨ・サカ', nameEn: 'Bukayo Saka', teamId: 'eng', position: 'FW', club: 'アーセナル', note: '右サイドのスターボーイ' },
  // ブラジル
  { id: 'vinicius', name: 'ヴィニシウス・ジュニオール', nameEn: 'Vinícius Júnior', teamId: 'bra', position: 'FW', club: 'レアル・マドリード', note: '魔法のドリブラー' },
  { id: 'rodrygo', name: 'ロドリゴ', nameEn: 'Rodrygo', teamId: 'bra', position: 'FW', club: 'レアル・マドリード', note: '大舞台に強い男' },
  { id: 'endrick', name: 'エンドリッキ', nameEn: 'Endrick', teamId: 'bra', position: 'FW', club: 'レアル・マドリード', note: '怪物と呼ばれる若き才能' },
  // スペイン
  { id: 'yamal', name: 'ラミン・ヤマル', nameEn: 'Lamine Yamal', teamId: 'esp', position: 'FW', club: 'バルセロナ', note: '18歳の天才ウインガー' },
  { id: 'pedri', name: 'ペドリ', nameEn: 'Pedri', teamId: 'esp', position: 'MF', club: 'バルセロナ', note: '中盤の芸術家' },
  { id: 'rodri', name: 'ロドリ', nameEn: 'Rodri', teamId: 'esp', position: 'MF', club: 'マンチェスター・シティ', note: 'バロンドール受賞のアンカー' },
  // ポルトガル
  { id: 'ronaldo', name: 'クリスティアーノ・ロナウド', nameEn: 'Cristiano Ronaldo', teamId: 'por', position: 'FW', club: 'アル・ナスル', note: '41歳のレジェンド、最後のW杯' },
  { id: 'bfernandes', name: 'ブルーノ・フェルナンデス', nameEn: 'Bruno Fernandes', teamId: 'por', position: 'MF', club: 'マンチェスター・ユナイテッド', note: '攻撃の指揮者' },
  // オランダ
  { id: 'gakpo', name: 'コーディ・ガクポ', nameEn: 'Cody Gakpo', teamId: 'ned', position: 'FW', club: 'リバプール', note: 'W杯で輝くアタッカー' },
  { id: 'vandijk', name: 'フィルジル・ファン・ダイク', nameEn: 'Virgil van Dijk', teamId: 'ned', position: 'DF', club: 'リバプール', note: '世界最高のCB' },
  // ドイツ
  { id: 'musiala', name: 'ジャマル・ムシアラ', nameEn: 'Jamal Musiala', teamId: 'ger', position: 'MF', club: 'バイエルン', note: '狭い局面を打開する魔術師' },
  { id: 'wirtz', name: 'フロリアン・ヴィルツ', nameEn: 'Florian Wirtz', teamId: 'ger', position: 'MF', club: 'リバプール', note: 'ドイツの新たな10番' },
  // ベルギー
  { id: 'kdb', name: 'ケビン・デ・ブライネ', nameEn: 'Kevin De Bruyne', teamId: 'bel', position: 'MF', club: 'ナポリ', note: '黄金世代最後の輝き' },
  { id: 'doku', name: 'ジェレミー・ドク', nameEn: 'Jérémy Doku', teamId: 'bel', position: 'FW', club: 'マンチェスター・シティ', note: '電光石火のドリブラー' },
  // クロアチア
  { id: 'modric', name: 'ルカ・モドリッチ', nameEn: 'Luka Modrić', teamId: 'cro', position: 'MF', club: 'ミラン', note: '40歳の鉄人マエストロ' },
  // ウルグアイ
  { id: 'valverde', name: 'フェデリコ・バルベルデ', nameEn: 'Federico Valverde', teamId: 'uru', position: 'MF', club: 'レアル・マドリード', note: '爆発的な推進力と強烈なミドル' },
  { id: 'nunez', name: 'ダルウィン・ヌニェス', nameEn: 'Darwin Núñez', teamId: 'uru', position: 'FW', club: 'アル・ヒラル', note: '規格外のフィジカルモンスター' },
  // 韓国
  { id: 'son', name: 'ソン・フンミン', nameEn: 'Son Heung-min', teamId: 'kor', position: 'FW', club: 'LAFC', note: 'アジアの至宝' },
  { id: 'leekangin', name: 'イ・ガンイン', nameEn: 'Lee Kang-in', teamId: 'kor', position: 'MF', club: 'パリ・サンジェルマン', note: '左足のテクニシャン' },
  // アメリカ
  { id: 'pulisic', name: 'クリスティアン・プリシッチ', nameEn: 'Christian Pulisic', teamId: 'usa', position: 'FW', club: 'ミラン', note: '開催国のキャプテン・アメリカ' },
  // メキシコ
  { id: 'sgimenez', name: 'サンティアゴ・ヒメネス', nameEn: 'Santiago Giménez', teamId: 'mex', position: 'FW', club: 'ミラン', note: '開催国のエース' },
  // カナダ
  { id: 'davies', name: 'アルフォンソ・デイヴィス', nameEn: 'Alphonso Davies', teamId: 'can', position: 'DF', club: 'バイエルン', note: '世界最速の左サイドバック' },
  { id: 'jdavid', name: 'ジョナタン・デイヴィッド', nameEn: 'Jonathan David', teamId: 'can', position: 'FW', club: 'ユベントス', note: 'カナダの点取り屋' },
  // ノルウェー
  { id: 'haaland', name: 'アーリング・ハーランド', nameEn: 'Erling Haaland', teamId: 'nor', position: 'FW', club: 'マンチェスター・シティ', note: 'W杯初出場のゴールマシン' },
  { id: 'odegaard', name: 'マルティン・ウーデゴール', nameEn: 'Martin Ødegaard', teamId: 'nor', position: 'MF', club: 'アーセナル', note: 'ノルウェーの頭脳' },
  // エジプト
  { id: 'salah', name: 'モハメド・サラー', nameEn: 'Mohamed Salah', teamId: 'egy', position: 'FW', club: 'リバプール', note: 'エジプトの王' },
  // モロッコ
  { id: 'hakimi', name: 'アシュラフ・ハキミ', nameEn: 'Achraf Hakimi', teamId: 'mar', position: 'DF', club: 'パリ・サンジェルマン', note: '攻守万能の右サイドバック' },
  // セネガル
  { id: 'mane', name: 'サディオ・マネ', nameEn: 'Sadio Mané', teamId: 'sen', position: 'FW', club: 'アル・ナスル', note: 'セネガルの英雄' },
  // コロンビア
  { id: 'ldiaz', name: 'ルイス・ディアス', nameEn: 'Luis Díaz', teamId: 'col', position: 'FW', club: 'バイエルン', note: '南米屈指のウインガー' },
  // ガーナ
  { id: 'kudus', name: 'モハメド・クドゥス', nameEn: 'Mohammed Kudus', teamId: 'gha', position: 'MF', club: 'トッテナム', note: '推進力抜群のアタッカー' },
  // スウェーデン (日本と同組F)
  { id: 'isak', name: 'アレクサンデル・イサク', nameEn: 'Alexander Isak', teamId: 'swe', position: 'FW', club: 'リバプール', note: '北欧最高峰のストライカー' },
  { id: 'gyokeres', name: 'ヴィクトル・ギェケレシュ', nameEn: 'Viktor Gyökeres', teamId: 'swe', position: 'FW', club: 'アーセナル', note: '怪物級の得点量産マシン' },
  // トルコ
  { id: 'guler', name: 'アルダ・ギュレル', nameEn: 'Arda Güler', teamId: 'tur', position: 'MF', club: 'レアル・マドリード', note: 'トルコの至宝、左足の魔術師' },
];

export const playerById = (id: string): Player | undefined => PLAYERS.find((p) => p.id === id);

export const playersOfTeam = (teamId: string): Player[] => PLAYERS.filter((p) => p.teamId === teamId);
