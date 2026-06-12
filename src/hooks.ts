import { useMemo } from 'react';
import { playerById } from './data/players';
import { computeTournament } from './engine';
import { useAppStore } from './store';
import type { TournamentState } from './types';

export function useTournament(): TournamentState {
  const now = useAppStore((s) => s.now);
  return useMemo(() => computeTournament(now), [now]);
}

// フォロー中チーム + フォロー中選手の所属チーム
export function useFollowedTeamIds(): Set<string> {
  const followedTeams = useAppStore((s) => s.followedTeams);
  const followedPlayers = useAppStore((s) => s.followedPlayers);
  return useMemo(() => {
    const set = new Set(followedTeams);
    for (const pid of followedPlayers) {
      const teamId = playerById(pid)?.teamId;
      if (teamId) set.add(teamId);
    }
    return set;
  }, [followedTeams, followedPlayers]);
}
