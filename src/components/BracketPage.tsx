import { STAGE_LABELS } from '../data/schedule';
import { teamById } from '../data/teams';
import { useFollowedTeamIds } from '../hooks';
import { useAppStore } from '../store';
import type { MatchView, TournamentState } from '../types';
import { fmtJst } from '../utils/time';

function BracketSide({ teamId, label, score, isWinner, followed }: {
  teamId?: string;
  label?: string;
  score: number | null;
  isWinner: boolean;
  followed: boolean;
}) {
  const team = teamId ? teamById(teamId) : null;
  return (
    <div className={`bk-side ${isWinner ? 'winner' : ''} ${followed ? 'followed' : ''} ${team ? '' : 'tbd'}`}>
      <span className="bk-name">{team ? `${team.flag} ${team.name}` : label ?? '未定'}</span>
      <span className="bk-score">{score ?? ''}</span>
    </div>
  );
}

function BracketCard({ v }: { v: MatchView }) {
  const selectMatch = useAppStore((s) => s.selectMatch);
  const followed = useFollowedTeamIds();
  const m = v.match;
  return (
    <button className={`bk-card status-${v.status}`} onClick={() => selectMatch(m.id)}>
      <div className="bk-meta">
        <span>{fmtJst(m.kickoffUtc)}</span>
        {v.pkText && <span className="bk-pk">{v.pkText}</span>}
      </div>
      <BracketSide
        teamId={v.homeTeamId}
        label={m.homeLabel}
        score={v.homeScore}
        isWinner={v.status === 'finished' && v.winnerId === v.homeTeamId}
        followed={!!v.homeTeamId && followed.has(v.homeTeamId)}
      />
      <BracketSide
        teamId={v.awayTeamId}
        label={m.awayLabel}
        score={v.awayScore}
        isWinner={v.status === 'finished' && v.winnerId === v.awayTeamId}
        followed={!!v.awayTeamId && followed.has(v.awayTeamId)}
      />
    </button>
  );
}

// 公式試合番号をトーナメント表の構造順(隣接2試合の勝者が次の列で対戦)に並べる
const COLUMNS: { stage: string; ids: string[] }[] = [
  { stage: 'r32', ids: ['m74', 'm77', 'm73', 'm75', 'm83', 'm84', 'm81', 'm82', 'm76', 'm78', 'm79', 'm80', 'm86', 'm88', 'm85', 'm87'] },
  { stage: 'r16', ids: ['m89', 'm90', 'm93', 'm94', 'm91', 'm92', 'm95', 'm96'] },
  { stage: 'qf', ids: ['m97', 'm98', 'm99', 'm100'] },
  { stage: 'sf', ids: ['m101', 'm102'] },
];

export function BracketPage({ t }: { t: TournamentState }) {
  const champion = t.championId ? teamById(t.championId) : null;
  return (
    <div className="page">
      <div className="page-head">
        <h2>決勝トーナメント</h2>
        <p className="page-desc">
          ラウンド32から一発勝負のノックアウト方式。引き分けは延長戦・PK戦で決着。
          {!t.groupStageComplete &&
            ' 各組の順位確定にともない対戦カードが順次確定します。3位通過チーム(成績上位8カ国)の振り分けはFIFA規定の組み合わせ表に基づきます。'}
        </p>
      </div>
      <div className="bracket-scroll">
        <div className="bracket">
          {COLUMNS.map((col) => (
            <div className="bk-col" key={col.stage}>
              <h3 className="bk-col-title">{STAGE_LABELS[col.stage]}</h3>
              <div className="bk-col-matches">
                {col.ids.map((id) => (
                  <BracketCard key={id} v={t.views.get(id)!} />
                ))}
              </div>
            </div>
          ))}
          <div className="bk-col bk-col-final">
            <h3 className="bk-col-title">決勝</h3>
            <div className="bk-col-matches">
              <div className={`bk-champion ${champion ? 'decided' : ''}`}>
                <span className="bk-champ-label">優勝</span>
                <span className="bk-champ-team">{champion ? `${champion.flag} ${champion.name}` : '🏆'}</span>
              </div>
              <BracketCard v={t.views.get('m104')!} />
              <div className="bk-third">
                <h4>3位決定戦</h4>
                <BracketCard v={t.views.get('m103')!} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
