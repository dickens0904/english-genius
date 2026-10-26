import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Link, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Exercise } from '@/data/types';

interface Props {
  exercise: Exercise;
  onAnswer: (correct: boolean) => void;
}

const PAIR_COLORS = [
  'from-blue-400 to-blue-500',
  'from-yellow-400 to-yellow-500',
  'from-green-400 to-green-500',
  'from-purple-400 to-purple-500',
  'from-pink-400 to-pink-500',
  'from-orange-400 to-orange-500',
];

export default function Matching({ exercise, onAnswer }: Props) {
  const leftItems = exercise.options || [];
  const rightAnswers = Array.isArray(exercise.correctAnswer)
    ? exercise.correctAnswer
    : [];

  const [shuffledRightIndices] = useState<number[]>(() => {
    const indices = rightAnswers.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  });

  const shuffledRight = shuffledRightIndices.map((i) => rightAnswers[i]);

  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matches, setMatches] = useState<Map<number, number>>(new Map());
  const [wrongPair, setWrongPair] = useState<[number, number] | null>(null);
  const [completed, setCompleted] = useState(false);

  const matchedLefts = new Set(matches.keys());
  const matchedRightIndices = new Set(matches.values());

  const handleLeftClick = (idx: number) => {
    if (matchedLefts.has(idx) || completed) return;
    setSelectedLeft(selectedLeft === idx ? null : idx);
  };

  const handleRightClick = useCallback((displayIdx: number) => {
    if (selectedLeft === null || completed) return;
    if (matchedRightIndices.has(displayIdx)) return;

    const realRightIdx = shuffledRightIndices[displayIdx];
    if (selectedLeft === realRightIdx) {
      const next = new Map(matches);
      next.set(selectedLeft, displayIdx);
      setMatches(next);
      setSelectedLeft(null);
      if (next.size === leftItems.length) {
        setCompleted(true);
        onAnswer(true);
      }
    } else {
      setWrongPair([selectedLeft, displayIdx]);
      setTimeout(() => setWrongPair(null), 600);
    }
  }, [selectedLeft, matches, shuffledRightIndices, leftItems.length, onAnswer, completed, matchedRightIndices]);

  return (
    <div className="flex flex-col gap-5 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100">
          <Link className="h-6 w-6 text-purple-500" />
        </div>
        <div className="flex-1">
          <p className="text-xl font-bold text-gray-800">{exercise.question}</p>
          <div className="mt-1 flex items-center gap-1 text-sm text-yellow-500">
            <Star className="h-4 w-4 fill-yellow-400" />
            <span className="font-semibold">{exercise.points} points</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-2 rounded-2xl bg-green-50 p-4 text-lg font-bold text-green-600"
          >
            <CheckCircle2 className="h-6 w-6" />
            All matched correctly! Great job!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          <p className="text-center text-sm font-bold text-gray-500">Words</p>
          {leftItems.map((item, idx) => {
            const isMatched = matchedLefts.has(idx);
            const isSelected = selectedLeft === idx;
            const isWrong = wrongPair?.[0] === idx;
            return (
              <motion.button
                key={idx}
                whileHover={!isMatched ? { scale: 1.03 } : undefined}
                whileTap={!isMatched ? { scale: 0.97 } : undefined}
                animate={isWrong ? { x: [0, -6, 6, -6, 0] } : undefined}
                onClick={() => handleLeftClick(idx)}
                disabled={isMatched}
                className={cn(
                  'rounded-2xl border-2 p-3 text-center text-base font-bold text-white transition-all',
                  `bg-gradient-to-r ${PAIR_COLORS[idx % PAIR_COLORS.length]}`,
                  isSelected && 'ring-4 ring-blue-300 shadow-lg scale-105',
                  isMatched && '!bg-green-100 !text-green-700 !border-green-300',
                  isWrong && '!bg-red-100 !text-red-700 !border-red-300',
                  !isMatched && !isSelected && 'opacity-80 hover:opacity-100',
                )}
              >
                {item}
              </motion.button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-center text-sm font-bold text-gray-500">Meanings</p>
          {shuffledRight.map((item, displayIdx) => {
            const isMatched = matchedRightIndices.has(displayIdx);
            const isWrong = wrongPair?.[1] === displayIdx;
            const matchedLeftIdx = isMatched
              ? Array.from(matches.entries()).find(([, v]) => v === displayIdx)?.[0]
              : undefined;
            const colorIdx = matchedLeftIdx !== undefined ? matchedLeftIdx : 0;
            return (
              <motion.button
                key={displayIdx}
                whileHover={!isMatched && selectedLeft !== null ? { scale: 1.03 } : undefined}
                whileTap={!isMatched && selectedLeft !== null ? { scale: 0.97 } : undefined}
                animate={isWrong ? { x: [0, -6, 6, -6, 0] } : undefined}
                onClick={() => handleRightClick(displayIdx)}
                disabled={isMatched || selectedLeft === null}
                className={cn(
                  'rounded-2xl border-2 p-3 text-center text-base font-bold transition-all',
                  !isMatched && `bg-gradient-to-r ${PAIR_COLORS[colorIdx]} text-white`,
                  selectedLeft !== null && !isMatched && 'ring-2 ring-blue-200 cursor-pointer',
                  isMatched && 'bg-green-100 text-green-700 border-green-300',
                  isWrong && '!bg-red-100 !text-red-700 !border-red-300',
                  !isMatched && selectedLeft === null && 'opacity-60',
                )}
              >
                {item}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center">
        <p className="text-sm text-gray-400">
          Matched: {matches.size} / {leftItems.length}
        </p>
      </div>
    </div>
  );
}
