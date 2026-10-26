import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SentenceBuilderProps {
  words: string[];
  correctSentence: string;
  onComplete: (correct: boolean) => void;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SentenceBuilder({ words, correctSentence, onComplete }: SentenceBuilderProps) {
  const [shuffled, setShuffled] = useState(() => shuffleArray(words));
  const [placed, setPlaced] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const placedWords = placed.map((i) => shuffled[i]);
  const unused = shuffled.map((_, i) => !placed.includes(i));

  const handlePlace = (index: number) => {
    if (submitted) return;
    if (placed.includes(index)) return;
    setPlaced([...placed, index]);
  };

  const handleRemove = (placedIndex: number) => {
    if (submitted) return;
    setPlaced(placed.filter((_, i) => i !== placedIndex));
  };

  const handleSubmit = () => {
    if (placed.length !== words.length) return;
    const userSentence = placedWords.join(' ');
    const correct = userSentence === correctSentence;
    setIsCorrect(correct);
    setSubmitted(true);
    onComplete(correct);
  };

  const handleReset = useCallback(() => {
    setShuffled(shuffleArray(words));
    setPlaced([]);
    setSubmitted(false);
    setIsCorrect(false);
  }, [words]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Drop zone */}
      <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
        <p className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
          Build your sentence here:
        </p>
        <div
          className={cn(
            'min-h-[80px] rounded-2xl border-3 border-dashed p-4 flex flex-wrap gap-2 items-center transition-colors',
            submitted && isCorrect && 'border-green-400 bg-green-50',
            submitted && !isCorrect && 'border-red-400 bg-red-50',
            !submitted && 'border-gray-300 bg-gray-50'
          )}
        >
          {placed.length === 0 && !submitted && (
            <p className="text-gray-300 text-sm">Tap words below to add them here...</p>
          )}
          <AnimatePresence>
            {placedWords.map((word, idx) => (
              <motion.button
                key={`placed-${idx}-${word}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                onClick={() => handleRemove(idx)}
                disabled={submitted}
                className={cn(
                  'px-4 py-2 rounded-xl font-bold text-base shadow-sm transition-colors',
                  submitted && isCorrect
                    ? 'bg-green-200 text-green-800'
                    : submitted && !isCorrect
                    ? 'bg-red-200 text-red-800'
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer'
                )}
              >
                {word}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Word buttons */}
      <div className="bg-gray-100 rounded-3xl p-6 mb-6">
        <p className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
          Available words:
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {shuffled.map((word, idx) => {
            const isUsed = placed.includes(idx);
            return (
              <motion.button
                key={`word-${idx}`}
                onClick={() => handlePlace(idx)}
                disabled={isUsed || submitted}
                className={cn(
                  'px-5 py-3 rounded-2xl font-bold text-base shadow-md transition-all',
                  isUsed
                    ? 'bg-gray-200 text-gray-400 opacity-50 cursor-not-allowed'
                    : 'bg-white text-gray-800 hover:bg-blue-50 hover:border-blue-300 border-2 border-gray-200 hover:scale-105 active:scale-95'
                )}
                whileTap={!isUsed && !submitted ? { scale: 0.9 } : undefined}
              >
                {word}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={cn(
              'rounded-2xl p-4 mb-4 text-center',
              isCorrect ? 'bg-green-100' : 'bg-red-100'
            )}
          >
            {isCorrect ? (
              <div className="flex items-center justify-center gap-2">
                <Check size={24} className="text-green-600" />
                <span className="text-lg font-bold text-green-700">
                  Perfect sentence! Well done!
                </span>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <X size={24} className="text-red-600" />
                  <span className="text-lg font-bold text-red-700">Not quite right</span>
                </div>
                <p className="text-sm text-red-600">
                  The correct sentence: <span className="font-bold">{correctSentence}</span>
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      <div className="flex gap-3">
        {!submitted ? (
          <>
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-300 transition-all"
            >
              <RotateCw size={16} />
              Shuffle
            </button>
            <button
              onClick={handleSubmit}
              disabled={placed.length !== words.length}
              className={cn(
                'flex-1 py-3 rounded-full font-bold text-sm transition-all',
                placed.length === words.length
                  ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-md'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              )}
            >
              Check Sentence ({placed.length}/{words.length})
            </button>
          </>
        ) : (
          <button
            onClick={handleReset}
            className="flex-1 py-3 rounded-full bg-blue-500 text-white font-bold text-sm hover:bg-blue-600 shadow-md transition-all"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
