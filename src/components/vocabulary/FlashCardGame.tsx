import { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Volume2, RotateCw, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { VocabularyItem } from '@/data/types';

interface FlashCardGameProps {
  words: VocabularyItem[];
  onComplete: (score: number) => void;
}

export default function FlashCardGame({ words, onComplete }: FlashCardGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [mastered, setMastered] = useState<Set<string>>(new Set());
  const [direction, setDirection] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentWord = words[currentIndex];
  const progress = ((currentIndex + 1) / words.length) * 100;

  const speak = useCallback((text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    if (currentWord && !isFinished) {
      speak(currentWord.word);
    }
  }, [currentIndex, currentWord, isFinished, speak]);

  const goNext = () => {
    if (currentIndex < words.length - 1) {
      setDirection(1);
      setIsRevealed(false);
      setCurrentIndex((i) => i + 1);
    } else {
      setIsFinished(true);
      onComplete(mastered.size);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setIsRevealed(false);
      setCurrentIndex((i) => i - 1);
    }
  };

  const toggleMastered = () => {
    const next = new Set(mastered);
    if (next.has(currentWord.id)) {
      next.delete(currentWord.id);
    } else {
      next.add(currentWord.id);
    }
    setMastered(next);
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  if (words.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-lg">
        No words available for flashcards.
      </div>
    );
  }

  if (isFinished) {
    const score = Math.round((mastered.size / words.length) * 100);
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md mx-auto text-center py-12 px-6"
      >
        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-8 shadow-xl">
          <Trophy size={64} className="mx-auto text-yellow-500 mb-4" />
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Great Job!</h2>
          <p className="text-gray-600 mb-4">
            You mastered <span className="font-bold text-green-600">{mastered.size}</span> out of{' '}
            <span className="font-bold">{words.length}</span> words!
          </p>
          <div className="text-5xl font-extrabold text-orange-500 mb-6">{score}%</div>
          <button
            onClick={() => onComplete(mastered.size)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            Continue
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-gray-600">
            Card {currentIndex + 1} of {words.length}
          </span>
          <span className="text-sm font-bold text-green-600">
            Mastered: {mastered.size}
          </span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="perspective-[1000px] mb-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
          >
            <motion.div
              className="w-full h-[380px] cursor-pointer"
              onClick={() => setIsRevealed(!isRevealed)}
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: isRevealed ? 180 : 0 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl border-4 border-blue-200 p-6 flex flex-col items-center justify-center gap-4 shadow-xl"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="w-36 h-36 rounded-2xl overflow-hidden bg-white shadow-lg flex items-center justify-center">
                  <img
                    src={currentWord.imageUrl}
                    alt={currentWord.word}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="50%" x="50%" text-anchor="middle" dominant-baseline="middle" font-size="40">📖</text></svg>';
                    }}
                  />
                </div>

                <h2 className="text-4xl font-extrabold text-gray-800">{currentWord.word}</h2>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(currentWord.word);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-md transition-transform hover:scale-110 active:scale-95"
                >
                  <Volume2 size={24} />
                </button>

                <p className="text-sm text-gray-400 flex items-center gap-1">
                  <RotateCw size={14} /> Tap to reveal
                </p>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-100 rounded-3xl border-4 border-purple-200 p-6 flex flex-col items-center justify-center gap-4 shadow-xl"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <h2 className="text-3xl font-extrabold text-gray-800">{currentWord.word}</h2>
                <p className="text-lg text-blue-600 font-semibold bg-blue-50 px-5 py-2 rounded-full">
                  {currentWord.phonetic}
                </p>
                <div className="bg-white rounded-2xl p-5 shadow-sm w-full">
                  <p className="text-base text-gray-600 text-center italic leading-relaxed">
                    &ldquo;{currentWord.exampleSentence}&rdquo;
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(currentWord.exampleSentence);
                  }}
                  className="bg-purple-500 hover:bg-purple-600 text-white rounded-full p-2 shadow-md transition-transform hover:scale-110"
                >
                  <Volume2 size={20} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className={cn(
            'p-3 rounded-full shadow-md transition-all',
            currentIndex === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-100 hover:scale-110'
          )}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={toggleMastered}
          className={cn(
            'flex-1 py-3 rounded-full font-bold text-base shadow-md transition-all',
            mastered.has(currentWord.id)
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          )}
        >
          {mastered.has(currentWord.id) ? '✓ Mastered!' : 'Mark as Mastered'}
        </button>

        <button
          onClick={goNext}
          className="p-3 rounded-full bg-orange-500 text-white shadow-md hover:bg-orange-600 hover:scale-110 transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
