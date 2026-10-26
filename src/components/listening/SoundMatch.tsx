import { useState, useCallback, useEffect } from 'react';
import { Play, Trophy, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SoundMatchItem {
  id: string;
  text: string;
  imageUrl: string;
}

interface SoundMatchProps {
  items: SoundMatchItem[];
  onComplete: (score: number) => void;
}

type FeedbackType = 'correct' | 'wrong' | null;

export default function SoundMatch({ items, onComplete }: SoundMatchProps) {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [options, setOptions] = useState<SoundMatchItem[]>([]);

  const maxRounds = Math.min(items.length, 8);

  const shuffle = useCallback(<T,>(arr: T[]): T[] => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }, []);

  const generateOptions = useCallback(
    (correctItem: SoundMatchItem) => {
      const others = items.filter((i) => i.id !== correctItem.id);
      const shuffledOthers = shuffle(others).slice(0, 3);
      return shuffle([correctItem, ...shuffledOthers]);
    },
    [items, shuffle]
  );

  const speak = useCallback((text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    if (round < maxRounds) {
      const currentItem = items[round];
      setOptions(generateOptions(currentItem));
      setSelectedId(null);
      setFeedback(null);
      setTimeout(() => speak(currentItem.text), 500);
    }
  }, [round, items, maxRounds, generateOptions, speak]);

  const handleSelect = (item: SoundMatchItem) => {
    if (feedback !== null) return;

    setSelectedId(item.id);
    const correct = items[round];

    if (item.id === correct.id) {
      setFeedback('correct');
      setScore((s) => s + 1);
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      if (round + 1 >= maxRounds) {
        setIsFinished(true);
      } else {
        setRound((r) => r + 1);
      }
    }, 1200);
  };

  const handleComplete = () => {
    onComplete(score);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">No items available.</div>
    );
  }

  if (isFinished) {
    const percent = Math.round((score / maxRounds) * 100);
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md mx-auto text-center py-8 px-4"
      >
        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-8 shadow-xl">
          <Trophy size={64} className="mx-auto text-yellow-500 mb-4" />
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Well Done!</h2>
          <p className="text-gray-600 mb-2">
            You got <span className="font-bold text-green-600">{score}</span> out of{' '}
            <span className="font-bold">{maxRounds}</span> correct!
          </p>
          <div className="flex items-center justify-center gap-1 mb-4">
            {Array.from({ length: maxRounds }).map((_, i) => (
              <Star
                key={i}
                size={24}
                className={i < score ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
              />
            ))}
          </div>
          <div className="text-5xl font-extrabold text-orange-500 mb-6">{percent}%</div>
          <button
            onClick={handleComplete}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            Continue
          </button>
        </div>
      </motion.div>
    );
  }

  const currentItem = items[round];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-gray-600">
            Round {round + 1} of {maxRounds}
          </span>
          <span className="text-sm font-bold text-green-600">Score: {score}</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-300"
            style={{ width: `${((round + 1) / maxRounds) * 100}%` }}
          />
        </div>
      </div>

      {/* Play audio button */}
      <div className="text-center mb-8">
        <p className="text-base font-bold text-gray-600 mb-3">
          Listen and pick the matching picture!
        </p>
        <motion.button
          onClick={() => speak(currentItem.text)}
          disabled={isPlaying}
          className={cn(
            'w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg transition-colors',
            isPlaying ? 'bg-orange-500' : 'bg-blue-500 hover:bg-blue-600'
          )}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
        >
          <Play size={32} className={cn('text-white', !isPlaying && 'ml-1')} />
        </motion.button>
        {isPlaying && (
          <div className="flex items-center justify-center gap-1 mt-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-2 bg-blue-400 rounded-full"
                animate={{ height: [8, 24, 8] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Options grid */}
      <div className="grid grid-cols-2 gap-4">
        {options.map((item) => {
          const isSelected = selectedId === item.id;
          const isCorrect = item.id === currentItem.id;
          const showCorrect = feedback !== null && isCorrect;
          const showWrong = feedback === 'wrong' && isSelected && !isCorrect;

          return (
            <motion.button
              key={item.id}
              onClick={() => handleSelect(item)}
              disabled={feedback !== null}
              className={cn(
                'relative aspect-square rounded-2xl border-4 overflow-hidden shadow-md transition-all',
                showCorrect && 'border-green-400 ring-4 ring-green-200',
                showWrong && 'border-red-400 ring-4 ring-red-200',
                !feedback && 'border-gray-200 hover:border-blue-300 hover:scale-105',
                feedback && !showCorrect && !showWrong && 'border-gray-200 opacity-50'
              )}
              whileTap={!feedback ? { scale: 0.95 } : undefined}
            >
              <img
                src={item.imageUrl}
                alt={item.text}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="50%" x="50%" text-anchor="middle" dominant-baseline="middle" font-size="40">🖼️</text></svg>';
                }}
              />
              {showCorrect && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 bg-green-400/30 flex items-center justify-center"
                >
                  <span className="text-5xl">✅</span>
                </motion.div>
              )}
              {showWrong && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 bg-red-400/30 flex items-center justify-center"
                >
                  <span className="text-5xl">❌</span>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback text */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className={cn(
              'mt-6 rounded-2xl p-4 text-center font-bold text-lg',
              feedback === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            )}
          >
            {feedback === 'correct'
              ? "That's right! Excellent!"
              : `Not quite! The answer is "${currentItem.text}"`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
