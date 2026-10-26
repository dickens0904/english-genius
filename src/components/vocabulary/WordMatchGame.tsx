import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Timer, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { VocabularyItem } from '@/data/types';

interface WordMatchGameProps {
  words: VocabularyItem[];
  onComplete: (score: number) => void;
}

interface MatchCard {
  id: string;
  pairId: string;
  type: 'word' | 'image';
  content: string;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function WordMatchGame({ words, onComplete }: WordMatchGameProps) {
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [wrongPair, setWrongPair] = useState<string[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const maxPairs = Math.min(words.length, 6);

  const initGame = useCallback(() => {
    const selected = shuffleArray(words).slice(0, maxPairs);
    const wordCards: MatchCard[] = selected.map((w) => ({
      id: `word-${w.id}`,
      pairId: w.id,
      type: 'word',
      content: w.word,
    }));
    const imageCards: MatchCard[] = selected.map((w) => ({
      id: `image-${w.id}`,
      pairId: w.id,
      type: 'image',
      content: w.imageUrl,
    }));
    setCards(shuffleArray([...wordCards, ...imageCards]));
    setSelected([]);
    setMatched(new Set());
    setMoves(0);
    setTimer(0);
    setIsRunning(true);
    setShowCelebration(false);
    setWrongPair([]);
  }, [words, maxPairs]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const handleCardClick = (card: MatchCard) => {
    if (matched.has(card.id) || selected.includes(card.id) || wrongPair.length > 0) return;

    const next = [...selected, card.id];
    setSelected(next);

    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [firstId, secondId] = next;
      const first = cards.find((c) => c.id === firstId)!;
      const second = cards.find((c) => c.id === secondId)!;

      if (first.pairId === second.pairId && first.type !== second.type) {
        const newMatched = new Set(matched);
        newMatched.add(firstId);
        newMatched.add(secondId);
        setMatched(newMatched);
        setSelected([]);

        if (newMatched.size === cards.length) {
          setIsRunning(false);
          setTimeout(() => setShowCelebration(true), 400);
        }
      } else {
        setWrongPair([firstId, secondId]);
        setTimeout(() => {
          setWrongPair([]);
          setSelected([]);
        }, 800);
      }
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const calculateScore = () => {
    const baseScore = maxPairs * 100;
    const movePenalty = Math.max(0, (moves - maxPairs) * 10);
    const timePenalty = Math.max(0, (timer - maxPairs * 5) * 2);
    return Math.max(10, baseScore - movePenalty - timePenalty);
  };

  const handleComplete = () => {
    onComplete(calculateScore());
  };

  if (cards.length === 0) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Stats bar */}
      <div className="flex items-center justify-between mb-6 bg-white rounded-2xl p-4 shadow-md">
        <div className="flex items-center gap-2 text-blue-600">
          <Zap size={20} />
          <span className="font-bold text-sm">Moves: {moves}</span>
        </div>
        <div className="flex items-center gap-2 text-orange-600">
          <Timer size={20} />
          <span className="font-bold text-sm">{formatTime(timer)}</span>
        </div>
        <div className="flex items-center gap-2 text-green-600">
          <Trophy size={20} />
          <span className="font-bold text-sm">
            Matched: {matched.size / 2}/{maxPairs}
          </span>
        </div>
      </div>

      {/* Game grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {cards.map((card) => {
          const isMatched = matched.has(card.id);
          const isSelected = selected.includes(card.id);
          const isWrong = wrongPair.includes(card.id);

          return (
            <motion.button
              key={card.id}
              onClick={() => handleCardClick(card)}
              disabled={isMatched}
              className={cn(
                'relative aspect-square rounded-2xl border-3 shadow-md transition-all overflow-hidden',
                isMatched && 'border-green-400 bg-green-50 opacity-70',
                isSelected && !isMatched && 'border-blue-500 ring-4 ring-blue-200 scale-105',
                isWrong && 'border-red-500 ring-4 ring-red-200 animate-[shake_0.3s_ease-in-out]',
                !isMatched && !isSelected && !isWrong && 'border-gray-200 bg-white hover:border-blue-300 hover:scale-105'
              )}
              initial={false}
              animate={
                isWrong
                  ? { x: [0, -8, 8, -8, 8, 0] }
                  : { x: 0 }
              }
              transition={{ duration: 0.4 }}
            >
              <div className="w-full h-full flex items-center justify-center p-3">
                {card.type === 'word' ? (
                  <span className={cn(
                    'text-lg sm:text-xl font-extrabold text-center',
                    isMatched ? 'text-green-600' : 'text-gray-800'
                  )}>
                    {card.content}
                  </span>
                ) : (
                  <div className="w-full h-full rounded-xl overflow-hidden flex items-center justify-center bg-gray-50">
                    <img
                      src={card.content}
                      alt="match"
                      className="w-full h-full object-cover rounded-xl"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="50%" x="50%" text-anchor="middle" dominant-baseline="middle" font-size="40">🖼️</text></svg>';
                      }}
                    />
                  </div>
                )}
              </div>

              {isMatched && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 bg-green-400/20 flex items-center justify-center"
                >
                  <span className="text-3xl">✅</span>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Celebration */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <div className="bg-gradient-to-br from-yellow-100 via-orange-50 to-pink-100 rounded-3xl p-8 shadow-2xl max-w-sm mx-4 text-center">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
              >
                <Trophy size={72} className="mx-auto text-yellow-500 mb-4" />
              </motion.div>
              <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Amazing!</h2>
              <p className="text-gray-600 mb-4">
                You matched all pairs in <span className="font-bold text-orange-600">{moves}</span> moves
                and <span className="font-bold text-blue-600">{formatTime(timer)}</span>!
              </p>
              <div className="text-5xl font-extrabold text-green-500 mb-6">
                +{calculateScore()} pts
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={initGame}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-full transition-all"
                >
                  Play Again
                </button>
                <button
                  onClick={handleComplete}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform hover:scale-105"
                >
                  Continue
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
