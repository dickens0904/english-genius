import { useState, useRef, useCallback } from 'react';
import { Play, Pause, RotateCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AudioControlsProps {
  text: string;
  speed: number;
  onSpeedChange: (speed: number) => void;
  autoPlay?: boolean;
}

const speeds = [0.5, 0.8, 1.0, 1.2] as const;

export default function AudioControls({ text, speed, onSpeedChange }: AudioControlsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported] = useState(typeof window !== 'undefined' && 'speechSynthesis' in window);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = speed;
    utterance.pitch = 1.1;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [text, speed, isSupported]);

  const handlePlayPause = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      speak();
    }
  };

  const handleRepeat = () => {
    window.speechSynthesis.cancel();
    speak();
  };

  const bars = [0, 1, 2, 3, 4];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg max-w-md mx-auto">
      {/* Sound wave visualization */}
      <div className="flex items-center justify-center gap-1.5 h-16 mb-6">
        {bars.map((i) => (
          <motion.div
            key={i}
            className={cn(
              'w-3 rounded-full',
              isPlaying ? 'bg-blue-500' : 'bg-gray-300'
            )}
            animate={
              isPlaying
                ? {
                    height: [16, 48, 24, 56, 20, 40, 16],
                  }
                : { height: 16 }
            }
            transition={
              isPlaying
                ? {
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: i * 0.1,
                    ease: 'easeInOut',
                  }
                : { duration: 0.3 }
            }
          />
        ))}
      </div>

      {/* Main play button */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <motion.button
          onClick={handlePlayPause}
          className={cn(
            'w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-colors',
            isPlaying
              ? 'bg-orange-500 hover:bg-orange-600'
              : 'bg-blue-500 hover:bg-blue-600'
          )}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
        >
          {isPlaying ? (
            <Pause size={32} className="text-white" />
          ) : (
            <Play size={32} className="text-white ml-1" />
          )}
        </motion.button>

        <motion.button
          onClick={handleRepeat}
          className="w-12 h-12 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center shadow-md transition-colors"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1, rotate: 180 }}
          transition={{ duration: 0.3 }}
        >
          <RotateCw size={20} className="text-purple-600" />
        </motion.button>
      </div>

      {/* Speed controls */}
      <div>
        <p className="text-sm font-bold text-gray-500 mb-2 text-center">Speed</p>
        <div className="flex items-center justify-center gap-2">
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={cn(
                'px-4 py-2 rounded-full font-bold text-sm transition-all shadow-sm',
                speed === s
                  ? 'bg-blue-500 text-white shadow-blue-200 shadow-md scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {!isSupported && (
        <p className="text-xs text-red-400 text-center mt-4">
          Speech synthesis is not supported in this browser.
        </p>
      )}
    </div>
  );
}
