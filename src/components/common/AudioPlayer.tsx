import { useState, useRef, useCallback, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

const SPEEDS = [0.5, 0.8, 1, 1.2] as const;

interface AudioPlayerProps {
  text: string;
  autoPlay?: boolean;
  onPlayComplete?: () => void;
  showText?: boolean;
  speed?: number;
  className?: string;
}

export default function AudioPlayer({
  text,
  autoPlay = false,
  onPlayComplete,
  showText = true,
  speed: initialSpeed = 1,
  className,
}: AudioPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(initialSpeed);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const speedCycle = useCallback(() => {
    setSpeed((prev) => {
      const idx = SPEEDS.indexOf(prev as typeof SPEEDS[number]);
      return SPEEDS[(idx + 1) % SPEEDS.length];
    });
  }, []);

  const speak = useCallback(() => {
    if (!text) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = speed;
    utt.lang = "en-US";
    utt.onend = () => {
      setPlaying(false);
      onPlayComplete?.();
    };
    utt.onerror = () => setPlaying(false);
    utteranceRef.current = utt;
    window.speechSynthesis.speak(utt);
    setPlaying(true);
  }, [text, speed, onPlayComplete]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setPlaying(false);
  }, []);

  useEffect(() => {
    if (autoPlay && text) speak();
    return () => window.speechSynthesis.cancel();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        onClick={playing ? stop : speak}
        className={cn(
          "relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200",
          "active:scale-90 hover:scale-105",
          playing
            ? "bg-gradient-to-br from-coral-500 to-pink-500 text-white shadow-md"
            : "bg-gradient-to-br from-primary-500 to-lavender-500 text-white shadow-md"
        )}
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}

        {playing && (
          <span className="absolute -inset-1 rounded-full border-2 border-primary-300/50 animate-ping" />
        )}
      </button>

      {playing && (
        <div className="flex items-end gap-0.5 h-5" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="w-1 rounded-full bg-gradient-to-t from-primary-400 to-lavender-400 animate-pulse"
              style={{
                height: `${6 + Math.random() * 14}px`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      )}

      <button
        onClick={speedCycle}
        className="px-2 py-1 rounded-xl bg-slate-100 text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors tabular-nums"
        aria-label={`Speed ${speed}x`}
      >
        {speed}x
      </button>

      {showText && (
        <span className="text-sm font-semibold text-slate-700 truncate max-w-[200px]">{text}</span>
      )}
    </div>
  );
}
