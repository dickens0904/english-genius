import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, CheckCircle2, XCircle, Star, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Exercise } from '@/data/types';

interface Props {
  exercise: Exercise;
  onAnswer: (correct: boolean, answer: string) => void;
  showResult?: boolean;
}

export default function TrueFalse({ exercise, onAnswer, showResult }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (value: string) => {
    if (submitted) return;
    setSelected(value);
  };

  const handleSubmit = () => {
    if (!selected || submitted) return;
    setSubmitted(true);
    const correct = selected === String(exercise.correctAnswer);
    onAnswer(correct, selected);
  };

  const isCorrectAnswer = (value: string) => value === String(exercise.correctAnswer);

  return (
    <div className="flex flex-col gap-5 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
          <BookOpen className="h-6 w-6 text-green-500" />
        </div>
        <div className="flex-1">
          <p className="text-xl font-bold text-gray-800">{exercise.question}</p>
          <div className="mt-1 flex items-center gap-1 text-sm text-yellow-500">
            <Star className="h-4 w-4 fill-yellow-400" />
            <span className="font-semibold">{exercise.points} points</span>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-md rounded-2xl border-2 border-gray-100 bg-gray-50 p-6 text-center shadow-inner">
        <p className="text-lg font-semibold text-gray-700">{exercise.options?.[0] ?? exercise.question}</p>
      </div>

      <div className="flex justify-center gap-5">
        {[
          { value: 'true', label: 'TRUE', icon: Check, gradient: 'from-green-400 to-emerald-500', ring: 'ring-green-300', bg: 'bg-green-50' },
          { value: 'false', label: 'FALSE', icon: X, gradient: 'from-red-400 to-rose-500', ring: 'ring-red-300', bg: 'bg-red-50' },
        ].map(({ value, label, icon: Icon, gradient, ring, bg }) => {
          const isSelected = selected === value;
          const isCorrect = submitted && showResult && isCorrectAnswer(value);
          const isWrong = submitted && showResult && isSelected && !isCorrectAnswer(value);
          return (
            <motion.button
              key={value}
              whileHover={!submitted ? { scale: 1.06, y: -2 } : undefined}
              whileTap={!submitted ? { scale: 0.94 } : undefined}
              animate={
                isCorrect
                  ? { scale: [1, 1.08, 1] }
                  : isWrong
                    ? { x: [0, -8, 8, -8, 0] }
                    : undefined
              }
              onClick={() => handleSelect(value)}
              disabled={submitted}
              className={cn(
                'flex flex-col items-center gap-2 rounded-2xl border-3 px-10 py-6 text-lg font-extrabold text-white shadow-lg transition-all',
                `bg-gradient-to-br ${gradient}`,
                !submitted && isSelected && `ring-4 ${ring} shadow-xl`,
                !submitted && !isSelected && 'opacity-70 hover:opacity-100',
                isCorrect && '!from-green-200 !to-green-300 !text-green-700 !border-green-400',
                isWrong && '!from-red-200 !to-red-300 !text-red-700 !border-red-400',
              )}
            >
              <Icon className="h-10 w-10" strokeWidth={3} />
              <span>{label}</span>
              <AnimatePresence>
                {isCorrect && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  </motion.div>
                )}
                {isWrong && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <XCircle className="h-6 w-6 text-red-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {!submitted && (
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleSubmit}
          disabled={!selected}
          className={cn(
            'mx-auto mt-2 rounded-full px-10 py-3 text-lg font-bold text-white shadow-lg transition-all',
            selected
              ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:shadow-xl'
              : 'cursor-not-allowed bg-gray-300',
          )}
        >
          Submit Answer
        </motion.button>
      )}

      <AnimatePresence>
        {submitted && showResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              'flex items-center justify-center gap-2 rounded-2xl p-4 text-center text-lg font-bold',
              isCorrectAnswer(selected!)
                ? 'bg-green-50 text-green-600'
                : 'bg-red-50 text-red-600',
            )}
          >
            {isCorrectAnswer(selected!) ? (
              <>
                <CheckCircle2 className="h-6 w-6" />
                That&apos;s right! Well done!
              </>
            ) : (
              <>
                <XCircle className="h-6 w-6" />
                The correct answer is: <span className="underline">{exercise.correctAnswer === 'true' ? 'TRUE' : 'FALSE'}</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
