import { useState, useCallback, useEffect, useRef } from 'react';

interface UseTTSOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: string;
}

// 检测是否存在可用语音引擎（voices 异步加载，加超时兜底避免永久挂起）
function hasVoiceEngine(): Promise<boolean> {
  if (!('speechSynthesis' in window)) return Promise.resolve(false);
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve(window.speechSynthesis.getVoices().length > 0);
    }, 1000);
    const check = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        clearTimeout(timer);
        resolve(true);
      }
    };
    check();
    window.speechSynthesis.onvoiceschanged = check;
  });
}

export function useTTS(options?: UseTTSOptions) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    let mounted = true;
    // speechSynthesis 存在不代表有可用语音引擎，需进一步检测 voices
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }
    setIsSupported(true);
    hasVoiceEngine().then(ok => {
      if (mounted && !ok) {
        console.warn('未检测到可用语音引擎，朗读功能将不可用');
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const speak = useCallback(
    (text: string, rate?: number) => {
      if (!isSupported) return;

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = options?.lang || 'en-US';
      utterance.rate = rate ?? options?.rate ?? 0.8;
      utterance.pitch = options?.pitch ?? 1;
      utterance.volume = options?.volume ?? 1;

      // Prefer en-US voice
      const voices = window.speechSynthesis.getVoices();
      const englishVoice =
        voices.find((v) => v.lang === 'en-US') ||
        voices.find((v) => v.lang.startsWith('en'));
      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [isSupported, options?.lang, options?.pitch, options?.rate, options?.volume]
  );

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  return { speak, stop, isSpeaking, isSupported };
}
