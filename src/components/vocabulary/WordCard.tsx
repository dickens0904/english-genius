import { useState, useEffect } from 'react';
import { Volume2, Check, RotateCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { VocabularyItem } from '@/data/types';

interface WordCardProps {
  word: VocabularyItem;
  isFlipped: boolean;
  onFlip: () => void;
  onSpeak: (text: string) => void;
  mastered: boolean;
}

const difficultyColors = {
  easy: 'border-green-400 bg-green-50',
  medium: 'border-yellow-400 bg-yellow-50',
  hard: 'border-orange-400 bg-orange-50',
};

const difficultyBadgeColors = {
  easy: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  hard: 'bg-orange-100 text-orange-700',
};

export default function WordCard({ word, isFlipped, onFlip, onSpeak, mastered }: WordCardProps) {
  const [isMastered, setIsMastered] = useState(mastered);

  useEffect(() => {
    setIsMastered(mastered);
  }, [mastered]);

  const handleMasteredToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMastered(!isMastered);
  };

  return (
    <div
      className="perspective-[1000px] w-full h-[320px] cursor-pointer"
      onClick={onFlip}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Front */}
        <div
          className={cn(
            'absolute inset-0 rounded-2xl border-4 p-5 flex flex-col items-center justify-center gap-3 shadow-lg backface-hidden',
            difficultyColors[word.difficulty],
            isMastered && 'ring-4 ring-green-300'
          )}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {isMastered && (
            <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-1">
              <Check size={16} />
            </div>
          )}

          <span className={cn('absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-full', difficultyBadgeColors[word.difficulty])}>
            {word.difficulty}
          </span>

          <div className="w-28 h-28 rounded-xl overflow-hidden bg-white shadow-md flex items-center justify-center">
            <img
              src={word.imageUrl}
              alt={word.word}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="50%" x="50%" text-anchor="middle" dominant-baseline="middle" font-size="40">📖</text></svg>';
              }}
            />
          </div>

          <h3 className="text-2xl font-extrabold text-gray-800 tracking-wide">{word.word}</h3>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSpeak(word.word);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-md transition-transform hover:scale-110 active:scale-95"
          >
            <Volume2 size={22} />
          </button>

          <p className="text-xs text-gray-400 mt-auto flex items-center gap-1">
            <RotateCw size={12} /> Tap to flip
          </p>
        </div>

        {/* Back */}
        <div
          className={cn(
            'absolute inset-0 rounded-2xl border-4 p-5 flex flex-col items-center justify-center gap-3 shadow-lg',
            difficultyColors[word.difficulty]
          )}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h3 className="text-xl font-bold text-gray-700">{word.word}</h3>

          <p className="text-base text-blue-600 font-medium bg-blue-50 px-4 py-1 rounded-full">
            {word.phonetic}
          </p>

          <div className="bg-white rounded-xl p-4 shadow-sm w-full">
            <p className="text-sm text-gray-600 leading-relaxed text-center italic">
              &ldquo;{word.exampleSentence}&rdquo;
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSpeak(word.exampleSentence);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-md transition-transform hover:scale-110 active:scale-95"
          >
            <Volume2 size={18} />
          </button>

          <button
            onClick={handleMasteredToggle}
            className={cn(
              'mt-auto px-5 py-2 rounded-full font-bold text-sm shadow-md transition-all',
              isMastered
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            )}
          >
            <span className="flex items-center gap-2">
              <Check size={16} />
              {isMastered ? 'Mastered!' : 'Mark as Mastered'}
            </span>
          </button>

          <p className="text-xs text-gray-400 flex items-center gap-1">
            <RotateCw size={12} /> Tap to flip back
          </p>
        </div>
      </motion.div>
    </div>
  );
}
