import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Lightbulb, Star, Type } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Exercise } from '@/data/types';

interface Props {
  exercise: Exercise;
  onAnswer: (correct: boolean, answer: string) => void;
  showResult?: boolean;
}

export default function FillBlank({ exercise, onAnswer, showResult }: Props) {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [exercise.id]);

  const correct = typeof exercise.correctAnswer === 'string'
    ? exercise.correctAnswer
    : exercise.correctAnswer[0];

  const handleSubmit = () => {
    if (!input.trim() || submitted) return;
    setSubmitted(true);
    const isCorrect = input.trim().toLowerCase() === correct.toLowerCase();
    onAnswer(isCorrect, input.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const getCharColor = (index: number) => {
    if (!submitted || !showResult) return 'text-gray-800';
    const userChar = input[index]?.toLowerCase();
    const correctChar = correct[index]?.toLowerCase();
    if (!userChar) return 'text-gray-300';
    return userChar === correctChar ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="flex flex-col gap-5 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100">
          <Type className="h-6 w-6 text-orange-500" />
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
            className="max-h-40 rounded-2xl object-contain shadow-md"
          />
        </div>
      )}

      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-2">
          {correct.split('').map((_, i) => (
            <span
              key={i}
              className={cn(
                'inline-block w-8 border-b-3 pb-1 text-center text-2xl font-bold transition-colors',
                getCharColor(i),
                submitted && showResult && 'border-b-green-400',
                !submitted && 'border-b-gray-300',
              )}
            >
              {submitted && showResult ? (input[i] || '_') : (input[i] || '')}
            </span>
          ))}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => !submitted && setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={submitted}
          placeholder="Type your answer..."
          className={cn(
            'w-full max-w-sm rounded-2xl border-3 px-5 py-3 text-center text-xl font-semibold outline-none transition-all',
            'border-blue-200 bg-blue-50 focus:border-blue-400 focus:ring-4 focus:ring-blue-100',
            submitted && showResult && input.trim().toLowerCase() === correct.toLowerCase()
              && '!border-green-400 !bg-green-50',
            submitted && showResult && input.trim().toLowerCase() !== correct.toLowerCase()
              && '!border-red-400 !bg-red-50',
          )}
        />

        <AnimatePresence>
          {showHint && !submitted && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="rounded-xl bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-700 shadow-sm"
            >
              💡 Hint: The word starts with &quot;<span className="font-bold text-yellow-600">{correct[0]}</span>&quot;
              &nbsp;and has {correct.length} letters
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-3">
          {!showHint && !submitted && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowHint(true)}
              className="flex items-center gap-2 rounded-full bg-yellow-100 px-5 py-2.5 text-sm font-bold text-yellow-700 shadow-sm transition-colors hover:bg-yellow-200"
            >
              <Lightbulb className="h-4 w-4" />
              Hint
            </motion.button>
          )}
          {!submitted && (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleSubmit}
              disabled={!input.trim()}
              className={cn(
                'rounded-full px-8 py-2.5 text-lg font-bold text-white shadow-lg transition-all',
                input.trim()
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:shadow-xl'
                  : 'cursor-not-allowed bg-gray-300',
              )}
            >
              Check
            </motion.button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {submitted && showResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              'flex items-center justify-center gap-2 rounded-2xl p-4 text-center text-lg font-bold',
              input.trim().toLowerCase() === correct.toLowerCase()
                ? 'bg-green-50 text-green-600'
                : 'bg-red-50 text-red-600',
            )}
          >
            {input.trim().toLowerCase() === correct.toLowerCase() ? (
              <>
                <CheckCircle2 className="h-6 w-6" />
                Excellent! That&apos;s correct!
              </>
            ) : (
              <>
                <XCircle className="h-6 w-6" />
                The correct answer is: <span className="underline">{correct}</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
