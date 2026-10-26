import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, HelpCircle, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Exercise } from '@/data/types';

interface Props {
  exercise: Exercise;
  onAnswer: (correct: boolean, answer: string) => void;
  showResult?: boolean;
}

const LETTERS = ['A', 'B', 'C', 'D'];
const OPTION_COLORS = [
  'from-blue-400 to-blue-500 border-blue-300',
  'from-yellow-400 to-yellow-500 border-yellow-300',
  'from-green-400 to-green-500 border-green-300',
  'from-purple-400 to-purple-500 border-purple-300',
];

export default function MultipleChoice({ exercise, onAnswer, showResult }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const options = exercise.options ?? [];

  const handleSelect = (option: string) => {
    if (submitted) return;
    setSelected(option);
  };

  const handleSubmit = () => {
    if (!selected || submitted) return;
    setSubmitted(true);
    const correct = selected === exercise.correctAnswer;
    onAnswer(correct, selected);
  };

  const getOptionState = (option: string) => {
    if (!submitted || !showResult) return 'default';
    if (option === exercise.correctAnswer) return 'correct';
    if (option === selected) return 'wrong';
    return 'default';
  };

  return (
    <div className="flex flex-col gap-5 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
          <HelpCircle className="h-6 w-6 text-blue-500" />
        </div>
        <div className="flex-1">
          <p className="text-xl font-bold text-gray-800">{exercise.question}</p>
          <div className="mt-1 flex items-center gap-1 text-sm text-yellow-500">
            <Star className="h-4 w-4 fill-yellow-400" />
            <span className="font-semibold">{exercise.points} points</span>
          </div>
        </div>
      </div>

      {exercise.imageUrl && (
        <div className="flex justify-center">
          <img
            src={exercise.imageUrl}
            alt="Question"
            className="max-h-48 rounded-2xl object-contain shadow-md"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {options.map((option, i) => {
          const state = getOptionState(option);
          const isSelected = selected === option;
          return (
            <motion.button
              key={option}
              whileHover={!submitted ? { scale: 1.03 } : undefined}
              whileTap={!submitted ? { scale: 0.97 } : undefined}
              animate={
                state === 'correct'
                  ? { scale: [1, 1.05, 1] }
                  : state === 'wrong'
                    ? { x: [0, -6, 6, -6, 0] }
                    : undefined
              }
              onClick={() => handleSelect(option)}
              disabled={submitted}
              className={cn(
                'relative flex items-center gap-3 rounded-2xl border-2 bg-gradient-to-br p-4 text-left transition-colors',
                OPTION_COLORS[i],
                !submitted && isSelected && 'ring-4 ring-blue-300 shadow-lg',
                !submitted && !isSelected && 'opacity-80 hover:opacity-100',
                state === 'correct' && 'ring-4 ring-green-400 !border-green-400 !from-green-100 !to-green-200',
                state === 'wrong' && 'ring-4 ring-red-400 !border-red-400 !from-red-100 !to-red-200',
                state === 'default' && submitted && 'opacity-50',
              )}
            >
              <span
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-xl bg-white/30 text-lg font-extrabold text-white',
                  state === 'correct' && '!bg-green-500 text-white',
                  state === 'wrong' && '!bg-red-500 text-white',
                )}
              >
                {LETTERS[i]}
              </span>
              <span
                className={cn(
                  'flex-1 text-base font-semibold text-white',
                  (state === 'correct' || state === 'wrong') && '!text-gray-800',
                )}
              >
                {option}
              </span>
              <AnimatePresence>
                {state === 'correct' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <CheckCircle2 className="h-7 w-7 text-green-500" />
                  </motion.div>
                )}
                {state === 'wrong' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <XCircle className="h-7 w-7 text-red-500" />
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
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-xl'
              : 'cursor-not-allowed bg-gray-300',
          )}
        >
          Submit Answer
        </motion.button>
      )}
    </div>
  );
}
