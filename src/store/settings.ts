import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { appStorage } from './storage';

export type Theme = 'night' | 'parchment';
export type ReadingMode = 'standard' | 'focus' | 'compact';

interface SettingsState {
  theme: Theme;
  readingMode: ReadingMode;
  sidebarCollapsed: boolean;
  contextPanel: boolean;
  reduceMotion: boolean;
  fontScale: number;
  set: (p: Partial<Omit<SettingsState, 'set'>>) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'night',
      readingMode: 'standard',
      sidebarCollapsed: false,
      contextPanel: true,
      reduceMotion: false,
      fontScale: 1,
      set: (p) => set(p),
    }),
    { name: 'hme-settings', storage: appStorage, version: 1 },
  ),
);
