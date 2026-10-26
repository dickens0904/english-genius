export function calculateScore(
  correct: number,
  total: number,
  timeBonus?: number
): number {
  if (total === 0) return 0;
  const baseScore = Math.round((correct / total) * 100);
  const bonus = timeBonus ?? 0;
  return Math.min(100, baseScore + bonus);
}

export function getStarRating(score: number): 1 | 2 | 3 {
  if (score >= 95) return 3;
  if (score >= 80) return 2;
  return 1;
}

export function getGrade(score: number): string {
  if (score >= 97) return 'A+';
  if (score >= 93) return 'A';
  if (score >= 90) return 'A-';
  if (score >= 87) return 'B+';
  if (score >= 83) return 'B';
  if (score >= 80) return 'B-';
  if (score >= 77) return 'C+';
  if (score >= 73) return 'C';
  if (score >= 70) return 'C-';
  if (score >= 67) return 'D+';
  if (score >= 63) return 'D';
  if (score >= 60) return 'D-';
  return 'F';
}
