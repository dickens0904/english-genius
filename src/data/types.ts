export type QuestionType =
  | 'multiple_choice'
  | 'fill_blank'
  | 'true_false'
  | 'matching'
  | 'drag_drop'
  | 'dictation'
  | 'image_select'
  | 'sentence_building'
  | 'word_scramble'
  | 'reading_comprehension';

export interface VocabularyItem {
  id: string;
  word: string;
  phonetic: string;
  imageUrl: string;
  exampleSentence: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export interface Exercise {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  hint?: string;
  imageUrl?: string;
  points: number;
}

export interface Reading {
  id: string;
  title: string;
  content: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  imageUrl: string;
  questions: Exercise[];
  isExtracurricular: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  audioScript: string;
  keyPhrases: string[];
}

export interface Unit {
  id: string;
  title: string;
  theme: string;
  level: number;
  color: string;
  icon: string;
  thumbnail?: string;
  vocabulary: VocabularyItem[];
  lessons: Lesson[];
  readings: Reading[];
  exercises: Exercise[];
}

export interface UserProgress {
  userId: string;
  totalStars: number;
  currentStreak: number;
  longestStreak: number;
  unitProgress: Record<string, UnitProgress>;
  badges: Badge[];
  lastActive: string;
}

export interface UnitProgress {
  vocabularyMastered: string[];
  listeningCompleted: string[];
  readingCompleted: string[];
  writingCompleted: string[];
  exerciseScores: Record<string, number>;
  starsEarned: number;
  bestScore: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
}

export interface UserSettings {
  voiceSpeed: number;
  volume: number;
  difficulty: 'easy' | 'normal' | 'hard';
  showPhonetics: boolean;
  autoPlayAudio: boolean;
  playerName?: string;
}

export interface QuizResult {
  score: number;
  total: number;
  percentage: number;
  stars: 1 | 2 | 3;
  answers: Array<{
    exerciseId: string;
    correct: boolean;
    answer: string;
  }>;
}
