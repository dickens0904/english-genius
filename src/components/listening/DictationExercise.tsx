import { useState, useCallback, useRef } from 'react';
import { Play, Lightbulb, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DictationExerciseProps {
  text: string;
  hint?: string;
  onCorrect: () => void;
  onWrong: () => void;
}

type Feedback = 'correct' | 'wrong' | null;

export default function DictationExercise({ text, hint, onCorrect, onWrong }: DictationExerciseProps) {
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [showHint, setShowHint] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const speak = useCallback(() => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  }, [text]);

  const getHint = () => {
    if (hint) return hint;
    return text
      .split(' ')
      .map((w) => w[0] + '_ '.repeat(Math.max(0, w.length - 1)))
      .join(' ');
  };

  const handleSubmit = () => {
    const normalized = userInput.trim().toLowerCase().replace(/[.!?]/g, '');
    const expected = text.trim().toLowerCase().replace(/[.!?]/g, '');

    if (normalized === expected) {
      setFeedback('correct');
      onCorrect();
    } else {
      setFeedback('wrong');
      onWrong();
    }
  };

  const handleReset = () => {
    setUserInput('');
    setFeedback(null);
    setShowHint(false);
    inputRef.current?.focus();
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-3xl p-6 shadow-lg">
      {/* Audio play section */}
      <div className="text-center mb-6">
        <p className="text-sm font-bold text-gray-500 mb-3">Listen carefully and type what you hear</p>
        <motion.button
          onClick={speak}
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-1 mt-3"
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-2 bg-blue-400 rounded-full"
                animate={{ height: [8, 24, 8] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Input area */}
      <div className="mb-4">
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value);
            if (feedback) setFeedback(null);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && userInput.trim() && !feedback) handleSubmit();
          }}
          placeholder="Type what you hear..."
          disabled={feedback !== null}
          className={cn(
            'w-full px-5 py-4 rounded-2xl border-3 text-lg font-medium text-gray-800 outline-none transition-all',
            feedback === 'correct'
              ? 'border-green-400 bg-green-50'
              : feedback === 'wrong'
              ? 'border-red-400 bg-red-50'
              : 'border-gray-200 bg-gray-50 focus:border-blue-400 focus:ring-4 focus:ring-blue-100'
          )}
        />
      </div>

      {/* Hint */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-4"
          >
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 text-center">
              <p className="text-sm font-bold text-yellow-700 mb-1">Hint</p>
              <p className="text-base text-yellow-800 font-mono tracking-wider">{getHint()}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className={cn(
              'rounded-2xl p-4 mb-4 text-center',
              feedback === 'correct' ? 'bg-green-100' : 'bg-red-100'
            )}
          >
            {feedback === 'correct' ? (
              <div className="flex items-center justify-center gap-2">
                <Check size={24} className="text-green-600" />
                <span className="text-lg font-bold text-green-700">Correct! Great listening!</span>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <X size={24} className="text-red-600" />
                  <span className="text-lg font-bold text-red-700">Not quite right</span>
                </div>
                <p className="text-sm text-red-600">
                  The correct answer: <span className="font-bold">{text}</span>
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      <div className="flex gap-3">
        {!feedback && (
          <>
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-yellow-100 text-yellow-700 font-bold text-sm hover:bg-yellow-200 transition-all"
            >
              <Lightbulb size={18} />
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
            <button
              onClick={handleSubmit}
              disabled={!userInput.trim()}
              className={cn(
                'flex-1 py-3 rounded-full font-bold text-sm transition-all',
                userInput.trim()
                  ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-md'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              )}
            >
              Check Answer
            </button>
          </>
        )}
        {feedback && (
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
