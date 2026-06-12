export interface Team {
  id: string;
  name: string; // 日本語名
  nameEn: string;
  flag: string; // 絵文字
  group: string; // A-L
}

export interface Player {
  id: string;
  name: string;
  nameEn: string;
  teamId: string;
  position: 'GK' | 'DF' | 'MF' | 'FW';
  club: string;
  note: string;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  country: string;
  tz: string; // IANAタイムゾーン
  utcOffset: number; // 6-7月の実効UTCオフセット(時間)
  capacity: number;
}

export interface Broadcast {
  id: string;
  name: string;
  type: '地上波' | 'BS' | '配信';
  note: string;
}

export type Stage = 'group' | 'r32' | 'r16' | 'qf' | 'sf' | 'third' | 'final';

export interface Match {
  id: string;
  stage: Stage;
  group?: string;
  matchday?: number;
  // グループステージは確定、ノックアウトは未確定の場合あり
  homeTeamId?: string;
  awayTeamId?: string;
  // ノックアウト用プレースホルダー表記
  homeLabel?: string;
  awayLabel?: string;
  kickoffUtc: string; // ISO
  venueId: string;
  broadcastIds: string[];
}

export type MatchStatus = 'scheduled' | 'finished';

// results.json の1試合分のエントリ
export interface MatchResult {
  score: [number, number]; // 最終スコア(延長含む)
  pk?: [number, number]; // PK戦のスコア
  et?: boolean; // 延長戦の有無
}

// results.json 全体の形
export interface ResultsData {
  lastUpdated: string;
  results: Record<string, MatchResult>;
  // ノックアウトの手動チーム割り当て(3位通過チームの振り分けなど)
  slots: Record<string, { home?: string; away?: string }>;
}

export interface MatchView {
  match: Match;
  status: MatchStatus;
  phaseLabel: string; // "開始前" "結果更新待ち" "試合終了" など
  homeTeamId?: string;
  awayTeamId?: string;
  homeScore: number | null;
  awayScore: number | null;
  pkText: string | null;
  winnerId?: string;
}

export interface StandingRow {
  teamId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
}

export interface TournamentState {
  views: Map<string, MatchView>;
  standings: Map<string, StandingRow[]>; // group -> rows
  groupStageComplete: boolean;
  championId?: string;
}
