import { create } from 'zustand';

interface AppState {
  currentUnit: string | null;
  isMenuOpen: boolean;
  currentView: string;
  setCurrentUnit: (unitId: string | null) => void;
  toggleMenu: () => void;
  setCurrentView: (view: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentUnit: null,
  isMenuOpen: false,
  currentView: 'home',
  setCurrentUnit: (unitId) => set({ currentUnit: unitId }),
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  setCurrentView: (view) => set({ currentView: view }),
}));
