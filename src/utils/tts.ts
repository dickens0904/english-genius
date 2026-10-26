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
