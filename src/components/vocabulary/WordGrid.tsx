import { useState, useMemo } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { VocabularyItem } from '@/data/types';
import WordCard from './WordCard';

interface WordGridProps {
  words: VocabularyItem[];
  onWordSelect: (word: VocabularyItem) => void;
  masteredIds: string[];
}

const tabs = [
  { key: 'all', label: 'All Words' },
  { key: 'easy', label: 'Easy' },
  { key: 'medium', label: 'Medium' },
  { key: 'hard', label: 'Hard' },
] as const;

export default function WordGrid({ words, onWordSelect, masteredIds }: WordGridProps) {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [flippedId, setFlippedId] = useState<string | null>(null);

  const filteredWords = useMemo(() => {
    if (activeTab === 'all') return words;
    return words.filter((w) => w.difficulty === activeTab);
  }, [words, activeTab]);

  const masteredCount = useMemo(
    () => words.filter((w) => masteredIds.includes(w.id)).length,
    [words, masteredIds]
  );

  const progressPercent = words.length > 0 ? Math.round((masteredCount / words.length) * 100) : 0;

  const handleSpeak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      {/* Progress */}
      <div className="mb-6 bg-white rounded-2xl p-5 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Star size={20} className="text-yellow-500 fill-yellow-500" />
            <span className="font-bold text-gray-700">Progress</span>
          </div>
          <span className="text-sm font-semibold text-gray-600">
            {masteredCount} / {words.length} mastered ({progressPercent}%)
          </span>
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'px-5 py-2 rounded-full font-bold text-sm transition-all shadow-sm',
              activeTab === tab.key
                ? 'bg-blue-500 text-white shadow-blue-200 shadow-lg scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredWords.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No words found for this filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWords.map((word) => (
            <div
              key={word.id}
              onClick={() => onWordSelect(word)}
            >
              <WordCard
                word={word}
                isFlipped={flippedId === word.id}
                onFlip={() => setFlippedId(flippedId === word.id ? null : word.id)}
                onSpeak={handleSpeak}
                mastered={masteredIds.includes(word.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
