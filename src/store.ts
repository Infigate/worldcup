import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Tab = 'groups' | 'bracket' | 'schedule' | 'follow';

interface AppState {
  now: number; // 現在時刻(ms)。1秒ごとに更新され、6時間境界を跨ぐと結果が反映される
  tab: Tab;
  selectedMatchId: string | null;
  followedTeams: string[];
  followedPlayers: string[];
  setTab: (tab: Tab) => void;
  selectMatch: (id: string | null) => void;
  toggleTeam: (id: string) => void;
  togglePlayer: (id: string) => void;
  tick: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      now: Date.now(),
      tab: 'groups',
      selectedMatchId: null,
      followedTeams: [],
      followedPlayers: [],

      setTab: (tab) => set({ tab }),
      selectMatch: (id) => set({ selectedMatchId: id }),
      toggleTeam: (id) =>
        set((s) => ({
          followedTeams: s.followedTeams.includes(id)
            ? s.followedTeams.filter((t) => t !== id)
            : [...s.followedTeams, id],
        })),
      togglePlayer: (id) =>
        set((s) => ({
          followedPlayers: s.followedPlayers.includes(id)
            ? s.followedPlayers.filter((p) => p !== id)
            : [...s.followedPlayers, id],
        })),

      tick: () => set({ now: Date.now() }),
    }),
    {
      name: 'wc2026-app',
      partialize: (s) => ({ followedTeams: s.followedTeams, followedPlayers: s.followedPlayers }),
    },
  ),
);
