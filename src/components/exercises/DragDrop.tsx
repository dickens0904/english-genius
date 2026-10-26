import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, Star, Puzzle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Exercise } from '@/data/types';

interface Props {
  exercise: Exercise;
  onAnswer: (correct: boolean) => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function DragDrop({ exercise, onAnswer }: Props) {
  const correctAnswer = Array.isArray(exercise.correctAnswer)
    ? exercise.correctAnswer
    : exercise.correctAnswer.split(' ');

  const [wordBank] = useState(() => shuffle(correctAnswer));
  const [placed, setPlaced] = useState<(string | null)[]>(() =>
    new Array(correctAnswer.length).fill(null),
  );
  const [submitted, setSubmitted] = useState(false);

  const usedWords = placed.filter(Boolean) as string[];

  const handlePlaceWord = (word: string) => {
    if (submitted) return;
    const nextEmpty = placed.indexOf(null);
    if (nextEmpty === -1) return;
    const next = [...placed];
    next[nextEmpty] = word;
    setPlaced(next);
  };

  const handleRemoveWord = (index: number) => {
    if (submitted) return;
    const next = [...placed];
    next[index] = null;
    setPlaced(next);
  };

  const allPlaced = placed.every(Boolean);

  const handleSubmit = () => {
    if (!allPlaced || submitted) return;
    setSubmitted(true);
    const isCorrect = placed.every((w, i) => w === correctAnswer[i]);
    onAnswer(isCorrect);
  };

  const isCorrect = submitted && placed.every((w, i) => w === correctAnswer[i]);

  return (
    <div className="flex flex-col gap-5 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-100">
          <Puzzle className="h-6 w-6 text-pink-500" />
        </div>
        <div className="flex-1">
          <p className="text-xl font-bold text-gray-800">{exercise.question}</p>
          <div className="mt-1 flex items-center gap-1 text-sm text-yellow-500">
            <Star className="h-4 w-4 fill-yellow-400" />
            <span className="font-semibold">{exercise.points} points</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/50 p-4 min-h-[64px]">
        {placed.map((word, i) => (
          <motion.div
            key={i}
            layout
            initial={word ? { scale: 0.8, opacity: 0 } : false}
            animate={word ? { scale: 1, opacity: 1 } : undefined}
            onClick={() => word && handleRemoveWord(i)}
            className={cn(
              'flex items-center justify-center rounded-xl border-2 px-4 py-2 text-base font-bold min-w-[60px] transition-colors',
              word
                ? submitted
                  ? isCorrect
                    ? 'border-green-400 bg-green-100 text-green-700 cursor-default'
                    : 'border-red-400 bg-red-100 text-red-700 cursor-default'
                  : 'border-blue-300 bg-white text-blue-700 cursor-pointer hover:bg-blue-50'
                : 'border-dashed border-gray-300 bg-white/50 text-gray-300',
            )}
          >
            {word || '___'}
          </motion.div>
        ))}
      </div>

      {!submitted && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {wordBank.map((word) => {
            const isUsed = usedWords.includes(word);
            return (
              <motion.button
                key={word}
                whileHover={!isUsed ? { scale: 1.08, y: -2 } : undefined}
                whileTap={!isUsed ? { scale: 0.92 } : undefined}
                onClick={() => !isUsed && handlePlaceWord(word)}
                disabled={isUsed}
                className={cn(
                  'rounded-xl border-2 px-4 py-2.5 text-base font-bold shadow-sm transition-all',
                  isUsed
                    ? 'border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed'
                    : 'border-pink-300 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 hover:shadow-md cursor-pointer',
                )}
              >
                {word}
              </motion.button>
            );
          })}
        </div>
      )}

      {!submitted && (
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <ArrowRight className="h-4 w-4" />
          Click a word to place it. Click a placed word to remove it.
        </div>
      )}

      {!submitted && (
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleSubmit}
          disabled={!allPlaced}
          className={cn(
            'mx-auto rounded-full px-10 py-3 text-lg font-bold text-white shadow-lg transition-all',
            allPlaced
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:shadow-xl'
              : 'cursor-not-allowed bg-gray-300',
          )}
        >
          Check Sentence
        </motion.button>
      )}

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              'flex items-center justify-center gap-2 rounded-2xl p-4 text-center text-lg font-bold',
              isCorrect ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600',
            )}
          >
            {isCorrect ? (
              <>
                <CheckCircle2 className="h-6 w-6" />
                Perfect sentence! Well done!
              </>
            ) : (
              <>
                <XCircle className="h-6 w-6" />
                Not quite. The correct order is: &quot;{correctAnswer.join(' ')}&quot;
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
