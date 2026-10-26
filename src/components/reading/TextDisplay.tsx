import { useCallback } from 'react';
import { Volume2, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TextDisplayProps {
  content: string;
  title?: string;
  imageUrl?: string;
  onWordClick?: (word: string) => void;
}

export default function TextDisplay({ content, title, imageUrl, onWordClick }: TextDisplayProps) {
  const speak = useCallback((text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }, []);

  const handleWordClick = (word: string) => {
    const clean = word.replace(/[^a-zA-Z'-]/g, '');
    if (!clean) return;
    speak(clean);
    onWordClick?.(clean);
  };

  const renderClickableText = (text: string) => {
    return text.split(/(\s+)/).map((segment, i) => {
      if (/^\s+$/.test(segment)) return <span key={i}>{segment}</span>;
      return (
        <span
          key={i}
          onClick={() => handleWordClick(segment)}
          className="cursor-pointer hover:bg-yellow-200 hover:rounded px-0.5 transition-colors inline"
          title="Click to hear"
        >
          {segment}
        </span>
      );
    });
  };

  const paragraphs = content.split('\n').filter((p) => p.trim());

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
      {/* Image header */}
      {imageUrl && (
        <div className="relative w-full h-52 overflow-hidden">
          <img
            src={imageUrl}
            alt={title || 'Reading'}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}

      <div className="p-6 sm:p-8">
        {/* Title */}
        {title && (
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 rounded-full p-2">
              <BookOpen size={20} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-800">{title}</h2>
          </div>
        )}

        {/* Read aloud button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => speak(content)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full text-sm font-bold transition-colors"
          >
            <Volume2 size={16} />
            Read Aloud
          </button>
        </div>

        {/* Content */}
        <div className="text-lg leading-relaxed text-gray-700 space-y-4">
          {paragraphs.map((paragraph, idx) => (
            <p
              key={idx}
              className={cn(
                'indent-0',
                idx === 0 && 'first-letter:text-3xl first-letter:font-bold first-letter:text-blue-600 first-letter:mr-1'
              )}
            >
              {renderClickableText(paragraph)}
            </p>
          ))}
        </div>

        {/* Footer helper */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center">
            Tap any word to hear its pronunciation
          </p>
        </div>
      </div>
    </div>
  );
}
