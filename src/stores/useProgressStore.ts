import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProgress, UnitProgress, Badge } from '@/data/types';

const defaultUnitProgress = (): UnitProgress => ({
  vocabularyMastered: [],
  listeningCompleted: [],
  readingCompleted: [],
  writingCompleted: [],
  exerciseScores: {},
  starsEarned: 0,
  bestScore: 0,
});

const defaultProgress: UserProgress = {
  userId: 'student-1',
  totalStars: 0,
  currentStreak: 0,
  longestStreak: 0,
  unitProgress: {},
  badges: [],
  lastActive: new Date().toISOString(),
};

interface ProgressActions {
  addStars: (unitId: string, stars: number) => void;
  completeVocabulary: (unitId: string, vocabId: string) => void;
  completeListening: (unitId: string, lessonId: string) => void;
  completeReading: (unitId: string, readingId: string) => void;
  completeWriting: (unitId: string, exerciseId: string) => void;
  recordExerciseScore: (unitId: string, exerciseId: string, score: number) => void;
  earnBadge: (badge: Badge) => void;
  resetProgress: () => void;
  updateStreak: () => void;
}

type ProgressState = UserProgress & ProgressActions;

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...defaultProgress,

      addStars: (unitId, stars) =>
        set((state) => {
          const unitProgress = { ...state.unitProgress };
          if (!unitProgress[unitId]) {
            unitProgress[unitId] = defaultUnitProgress();
          }
          unitProgress[unitId] = {
            ...unitProgress[unitId],
            starsEarned: unitProgress[unitId].starsEarned + stars,
          };
          const totalStars = Object.values(unitProgress).reduce(
            (sum, up) => sum + up.starsEarned,
            0
          );
          return { unitProgress, totalStars, lastActive: new Date().toISOString() };
        }),

      completeVocabulary: (unitId, vocabId) =>
        set((state) => {
          const unitProgress = { ...state.unitProgress };
          if (!unitProgress[unitId]) {
            unitProgress[unitId] = defaultUnitProgress();
          }
          const current = unitProgress[unitId];
          if (!current.vocabularyMastered.includes(vocabId)) {
            unitProgress[unitId] = {
              ...current,
              vocabularyMastered: [...current.vocabularyMastered, vocabId],
            };
          }
          return { unitProgress, lastActive: new Date().toISOString() };
        }),

      completeListening: (unitId, lessonId) =>
        set((state) => {
          const unitProgress = { ...state.unitProgress };
          if (!unitProgress[unitId]) {
            unitProgress[unitId] = defaultUnitProgress();
          }
          const current = unitProgress[unitId];
          if (!current.listeningCompleted.includes(lessonId)) {
            unitProgress[unitId] = {
              ...current,
              listeningCompleted: [...current.listeningCompleted, lessonId],
            };
          }
          return { unitProgress, lastActive: new Date().toISOString() };
        }),

      completeReading: (unitId, readingId) =>
        set((state) => {
          const unitProgress = { ...state.unitProgress };
          if (!unitProgress[unitId]) {
            unitProgress[unitId] = defaultUnitProgress();
          }
          const current = unitProgress[unitId];
          if (!current.readingCompleted.includes(readingId)) {
            unitProgress[unitId] = {
              ...current,
              readingCompleted: [...current.readingCompleted, readingId],
            };
          }
          return { unitProgress, lastActive: new Date().toISOString() };
        }),

      completeWriting: (unitId, exerciseId) =>
        set((state) => {
          const unitProgress = { ...state.unitProgress };
          if (!unitProgress[unitId]) {
            unitProgress[unitId] = defaultUnitProgress();
          }
          const current = unitProgress[unitId];
          if (!current.writingCompleted.includes(exerciseId)) {
            unitProgress[unitId] = {
              ...current,
              writingCompleted: [...current.writingCompleted, exerciseId],
            };
          }
          return { unitProgress, lastActive: new Date().toISOString() };
        }),

      recordExerciseScore: (unitId, exerciseId, score) =>
        set((state) => {
          const unitProgress = { ...state.unitProgress };
          if (!unitProgress[unitId]) {
            unitProgress[unitId] = defaultUnitProgress();
          }
          const current = unitProgress[unitId];
          const existingScore = current.exerciseScores[exerciseId] ?? 0;
          unitProgress[unitId] = {
            ...current,
            exerciseScores: {
              ...current.exerciseScores,
              [exerciseId]: Math.max(existingScore, score),
            },
            bestScore: Math.max(current.bestScore, score),
          };
          return { unitProgress, lastActive: new Date().toISOString() };
        }),

      earnBadge: (badge) =>
        set((state) => {
          const alreadyEarned = state.badges.some((b) => b.id === badge.id);
          if (alreadyEarned) return state;
          return {
            badges: [
              ...state.badges,
              { ...badge, earnedAt: new Date().toISOString() },
            ],
            lastActive: new Date().toISOString(),
          };
        }),

      updateStreak: () =>
        set((state) => {
          const now = new Date();
          const lastActive = new Date(state.lastActive);
          const diffDays = Math.floor(
            (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
          );

          let currentStreak = state.currentStreak;
          if (diffDays === 0) {
            return state;
          } else if (diffDays === 1) {
            currentStreak += 1;
          } else {
            currentStreak = 1;
          }

          const longestStreak = Math.max(currentStreak, state.longestStreak);

          return {
            currentStreak,
            longestStreak,
            lastActive: now.toISOString(),
          };
        }),

      resetProgress: () => set({ ...defaultProgress }),
    }),
    {
      name: 'english-genius-progress',
    }
  )
);
