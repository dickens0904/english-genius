import { useMemo } from 'react';
import { useProgressStore } from '@/stores/useProgressStore';
import { allUnits } from '@/data';

export function useProgress() {
  const store = useProgressStore();

  const getUnitProgress = (unitId: string) => {
    return store.unitProgress[unitId] || null;
  };

  const getTotalStars = () => {
    return store.totalStars;
  };

  const getCompletionPercentage = (unitId: string): number => {
    const unit = allUnits.find((u) => u.id === unitId);
    if (!unit) return 0;

    const progress = store.unitProgress[unitId];
    if (!progress) return 0;

    const totalVocab = unit.vocabulary.length;
    const totalLessons = unit.lessons.length;
    const totalReadings = unit.readings.length;
    const totalExercises = unit.exercises.length;

    const totalItems = totalVocab + totalLessons + totalReadings + totalExercises;
    if (totalItems === 0) return 0;

    const completedItems =
      progress.vocabularyMastered.length +
      progress.listeningCompleted.length +
      progress.readingCompleted.length +
      progress.writingCompleted.length;

    return Math.round((completedItems / totalItems) * 100);
  };

  const isUnitCompleted = (unitId: string): boolean => {
    return getCompletionPercentage(unitId) >= 100;
  };

  const overallProgress = useMemo(() => {
    if (allUnits.length === 0) return 0;
    const total = allUnits.reduce(
      (sum, unit) => sum + getCompletionPercentage(unit.id),
      0
    );
    return Math.round(total / allUnits.length);
  }, [store.unitProgress]);

  return {
    ...store,
    getUnitProgress,
    getTotalStars,
    getCompletionPercentage,
    isUnitCompleted,
    overallProgress,
  };
}
