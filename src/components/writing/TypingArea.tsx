import { useState, useRef, useEffect, useCallback } from 'react';
import { Trophy, Zap, Keyboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TypingAreaProps {
  targetText: string;
  onComplete: (accuracy: number, speed: number) => void;
}

export default function TypingArea({ targetText, onComplete }: TypingAreaProps) {
  const [typed, setTyped] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [errors, setErrors] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const charCount = typed.length;
  const targetLen = targetText.length;
  const accuracy = charCount > 0 ? Math.round(((charCount - errors) / charCount) * 100) : 100;

  const wpm = useCallback(() => {
    if (!startTime || charCount === 0) return 0;
    const elapsed = (Date.now() - startTime) / 1000 / 60;
    const words = charCount / 5;
    return Math.round(words / Math.max(elapsed, 0.01));
  }, [startTime, charCount]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!startTime && value.length > 0) {
      setStartTime(Date.now());
    }

    const newErrors = value.split('').filter((ch, i) => ch !== targetText[i]).length;
    setErrors(newErrors);
    setTyped(value);

    if (value === targetText) {
      setIsComplete(true);
      const elapsed = (Date.now() - (startTime || Date.now())) / 1000 / 60;
      const words = targetText.length / 5;
      const finalWpm = Math.round(words / Math.max(elapsed, 0.01));
      const finalAccuracy = Math.round(((targetText.length - newErrors) / targetText.length) * 100);
      onComplete(finalAccuracy, finalWpm);
    }
  };

  const renderTargetText = () => {
    return targetText.split('').map((char, i) => {
      let colorClass = 'text-gray-400';
      let bgClass = '';

      if (i < typed.length) {
        if (typed[i] === char) {
          colorClass = 'text-green-600';
        } else {
          colorClass = 'text-red-500';
          bgClass = 'bg-red-100';
        }
      } else if (i === typed.length) {
        bgClass = 'bg-blue-200 border-b-2 border-blue-500';
      }

      return (
        <span
          key={i}
          className={cn(
            'text-xl font-mono px-0.5 rounded transition-colors inline-block',
            colorClass,
            bgClass
          )}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  const resetAll = () => {
    setTyped('');
    setStartTime(null);
    setIsComplete(false);
    setErrors(0);
    inputRef.current?.focus();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Stats bar */}
      <div className="flex items-center justify-between mb-4 bg-white rounded-2xl p-4 shadow-md">
        <div className="flex items-center gap-2 text-blue-600">
          <Zap size={18} />
          <span className="font-bold text-sm">WPM: {wpm()}</span>
        </div>
        <div className="flex items-center gap-2 text-green-600">
          <Trophy size={18} />
          <span className="font-bold text-sm">Accuracy: {accuracy}%</span>
        </div>
        <div className="flex items-center gap-2 text-orange-600">
          <Keyboard size={18} />
          <span className="font-bold text-sm">{charCount}/{targetLen}</span>
        </div>
      </div>

      {/* Target text display */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
        <p className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Type this text:</p>
        <div className="leading-loose tracking-wide">{renderTargetText()}</div>
      </div>

      {/* Typing input */}
      <div className="mb-4">
        <input
          ref={inputRef}
          type="text"
          value={typed}
          onChange={handleInput}
          disabled={isComplete}
          placeholder="Start typing here..."
          className={cn(
            'w-full px-5 py-4 rounded-2xl border-3 text-lg font-mono text-gray-800 outline-none transition-all',
            isComplete
              ? 'border-green-400 bg-green-50'
              : 'border-gray-200 bg-gray-50 focus:border-blue-400 focus:ring-4 focus:ring-blue-100'
          )}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>

      {/* Virtual keyboard hint */}
      {!isComplete && typed.length < targetText.length && (
        <div className="bg-gray-100 rounded-2xl p-4 mb-4 text-center">
          <p className="text-xs font-bold text-gray-500 mb-2">Press this key:</p>
          <span className="inline-block bg-white border-2 border-blue-400 rounded-xl px-6 py-3 text-2xl font-bold text-blue-600 shadow-md min-w-[48px]">
            {targetText[typed.length] === ' ' ? 'Space' : targetText[typed.length]}
          </span>
        </div>
      )}

      {/* Completion */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-6 shadow-xl">
              <Trophy size={48} className="mx-auto text-yellow-500 mb-3" />
              <h3 className="text-2xl font-extrabold text-gray-800 mb-1">Typing Complete!</h3>
              <p className="text-gray-600 mb-4">
                <span className="font-bold text-green-600">{wpm()} WPM</span> with{' '}
                <span className="font-bold text-blue-600">{accuracy}%</span> accuracy
              </p>
              <button
                onClick={resetAll}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
