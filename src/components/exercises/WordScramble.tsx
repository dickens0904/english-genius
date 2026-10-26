import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Lightbulb, Star, LetterText } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Exercise } from '@/data/types';

interface Props {
  exercise: Exercise;
  onAnswer: (correct: boolean, answer: string) => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const LETTER_GRADIENTS = [
  'from-blue-400 to-blue-500',
  'from-yellow-400 to-yellow-500',
  'from-green-400 to-green-500',
  'from-purple-400 to-purple-500',
  'from-pink-400 to-pink-500',
  'from-orange-400 to-orange-500',
  'from-teal-400 to-teal-500',
  'from-red-400 to-red-500',
];

export default function WordScramble({ exercise, onAnswer }: Props) {
  const correctWord = typeof exercise.correctAnswer === 'string'
    ? exercise.correctAnswer.toLowerCase()
    : exercise.correctAnswer[0].toLowerCase();

  const [scrambled] = useState(() => shuffle(correctWord.split('')));
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const builtWord = selectedIndices.map((i) => scrambled[i]).join('');

  const handleLetterClick = (index: number) => {
    if (submitted) return;
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter((i) => i !== index));
    } else {
      setSelectedIndices([...selectedIndices, index]);
    }
  };

  const handleSubmit = () => {
    if (builtWord.length !== correctWord.length || submitted) return;
    setSubmitted(true);
    const isCorrect = builtWord === correctWord;
    onAnswer(isCorrect, builtWord);
  };

  const isCorrect = submitted && builtWord === correctWord;

  return (
    <div className="flex flex-col gap-5 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-100">
          <LetterText className="h-6 w-6 text-cyan-500" />
        </div>
        <div className="flex-1">
          <p className="text-xl font-bold text-gray-800">{exercise.question}</p>
          <div className="mt-1 flex items-center gap-1 text-sm text-yellow-500">
            <Star className="h-4 w-4 fill-yellow-400" />
            <span className="font-semibold">{exercise.points} points</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-cyan-200 bg-cyan-50/50 p-4 min-h-[64px]">
        {Array.from({ length: correctWord.length }).map((_, i) => {
          const letterIdx = selectedIndices[i];
          const letter = letterIdx !== undefined ? scrambled[letterIdx] : null;
          return (
            <motion.div
              key={i}
              layout
              initial={letter ? { scale: 0.8, opacity: 0 } : false}
              animate={letter ? { scale: 1, opacity: 1 } : undefined}
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-xl border-2 text-xl font-extrabold uppercase',
                letter
                  ? submitted
                    ? isCorrect
                      ? 'border-green-400 bg-green-100 text-green-600'
                      : 'border-red-400 bg-red-100 text-red-600'
                    : 'border-cyan-300 bg-white text-cyan-700'
                  : 'border-dashed border-gray-300 bg-white/50 text-transparent',
              )}
            >
              {letter || '_'}
            </motion.div>
          );
        })}
      </div>

      {showHint && !submitted && (
        <div className="flex justify-center gap-1">
          {correctWord.split('').map((_, i) => (
            <span key={i} className="text-lg text-gray-300">_</span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-2">
        {scrambled.map((letter, i) => {
          const isSelected = selectedIndices.includes(i);
          const gradient = LETTER_GRADIENTS[i % LETTER_GRADIENTS.length];
          return (
            <motion.button
              key={i}
              whileHover={!isSelected && !submitted ? { scale: 1.12, y: -3 } : undefined}
              whileTap={!isSelected && !submitted ? { scale: 0.88 } : undefined}
              animate={isSelected ? { scale: 0.9, opacity: 0.4 } : { scale: 1, opacity: 1 }}
              onClick={() => handleLetterClick(i)}
              disabled={submitted}
              className={cn(
                'flex h-14 w-14 items-center justify-center rounded-xl border-2 text-2xl font-extrabold uppercase text-white shadow-md transition-all',
                `bg-gradient-to-br ${gradient} border-white/30`,
                isSelected && 'opacity-40 cursor-pointer',
                !isSelected && !submitted && 'cursor-pointer hover:shadow-lg',
                submitted && 'cursor-default',
              )}
            >
              {letter}
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-center gap-3">
        {!showHint && !submitted && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowHint(true)}
            className="flex items-center gap-2 rounded-full bg-yellow-100 px-5 py-2.5 text-sm font-bold text-yellow-700 shadow-sm hover:bg-yellow-200"
          >
            <Lightbulb className="h-4 w-4" />
            Hint ({correctWord.length} letters)
          </motion.button>
        )}
        {!submitted && (
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleSubmit}
            disabled={builtWord.length !== correctWord.length}
            className={cn(
              'rounded-full px-8 py-2.5 text-lg font-bold text-white shadow-lg transition-all',
              builtWord.length === correctWord.length
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-xl'
                : 'cursor-not-allowed bg-gray-300',
            )}
          >
            Check Word
          </motion.button>
        )}
      </div>

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
                Brilliant! You unscrambled it!
              </>
            ) : (
              <>
                <XCircle className="h-6 w-6" />
                The word is: <span className="uppercase underline">{correctWord}</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
