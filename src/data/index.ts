export type {
  Unit,
  VocabularyItem,
  Lesson,
  Reading,
  Exercise,
  QuestionType,
  UserProgress,
  UnitProgress,
  Badge,
  UserSettings,
} from './types';

export { default as unit1 } from './units/unit1';
export { default as unit2 } from './units/unit2';
export { default as unit3 } from './units/unit3';
export { default as unit4 } from './units/unit4';
export { default as unit5 } from './units/unit5';
export { default as unit6 } from './units/unit6';

export { default as book1 } from './books/book1';
export { default as book2 } from './books/book2';
export { default as book3 } from './books/book3';

import type { Unit, Reading } from './types';
import unit1 from './units/unit1';
import unit2 from './units/unit2';
import unit3 from './units/unit3';
import unit4 from './units/unit4';
import unit5 from './units/unit5';
import unit6 from './units/unit6';
import book1 from './books/book1';
import book2 from './books/book2';
import book3 from './books/book3';

export const allUnits: Unit[] = [unit1, unit2, unit3, unit4, unit5, unit6];
export const units = allUnits;

export const allBooks: Reading[] = [book1, book2, book3];
export const books = allBooks;

export const getUnitById = (id: string): Unit | undefined => {
  return allUnits.find((unit) => unit.id === id);
};

export const getBookById = (id: string): Reading | undefined => {
  return allBooks.find((book) => book.id === id);
};
