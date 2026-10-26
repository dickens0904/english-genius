import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserSettings } from '@/data/types';

const defaultSettings: UserSettings = {
  voiceSpeed: 0.8,
  volume: 1,
  difficulty: 'normal',
  showPhonetics: true,
  autoPlayAudio: true,
  playerName: 'Student',
};

interface SettingsState extends UserSettings {
  updateSettings: (settings: Partial<UserSettings>) => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,
      updateSettings: (settings) =>
        set((state) => ({ ...state, ...settings })),
      resetSettings: () => set({ ...defaultSettings }),
    }),
    {
      name: 'english-genius-settings',
    }
  )
);
