// 检测是否存在可用语音引擎（voices 异步加载，加超时兜底避免永久挂起）
export function hasVoiceEngine(): Promise<boolean> {
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

export function getVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(filterEnglishVoices(voices));
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        const updatedVoices = window.speechSynthesis.getVoices();
        resolve(filterEnglishVoices(updatedVoices));
      };
    }
  });
}

function filterEnglishVoices(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
  const englishVoices = voices.filter((v) => v.lang.startsWith('en'));
  return englishVoices.length > 0 ? englishVoices : voices;
}

export function speakText(
  text: string,
  options?: { rate?: number; pitch?: number; volume?: number }
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('Speech synthesis is not supported'));
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = options?.rate ?? 0.8;
    utterance.pitch = options?.pitch ?? 1;
    utterance.volume = options?.volume ?? 1;

    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
      // 无语音引擎时给出明确提示，便于调用方提示用户安装 TTS 引擎
      utterance.onend = () => resolve();
      utterance.onerror = (e) => reject(new Error('语音引擎不可用，请在系统安装 TTS 语音引擎'));
      window.speechSynthesis.speak(utterance);
      return;
    }
    const englishVoice =
      voices.find((v) => v.lang === 'en-US') ||
      voices.find((v) => v.lang.startsWith('en'));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => reject(new Error('Speech synthesis error'));

    window.speechSynthesis.speak(utterance);
  });
}

export function cancelSpeech(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
