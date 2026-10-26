import { cn } from '@/lib/utils';

interface KeyboardGuideProps {
  targetChar?: string;
}

const rows = [
  { keys: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], color: 'bg-pink-100 border-pink-300 text-pink-800', activeColor: 'bg-pink-500 text-white' },
  { keys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'], color: 'bg-blue-100 border-blue-300 text-blue-800', activeColor: 'bg-blue-500 text-white' },
  { keys: ['Z', 'X', 'C', 'V', 'B', 'N', 'M'], color: 'bg-green-100 border-green-300 text-green-800', activeColor: 'bg-green-500 text-white' },
];

export default function KeyboardGuide({ targetChar }: KeyboardGuideProps) {
  const target = targetChar?.toUpperCase() || '';

  return (
    <div className="max-w-xl mx-auto px-4 py-4">
      <p className="text-xs font-bold text-gray-400 mb-3 text-center uppercase tracking-wider">
        Keyboard Guide
      </p>

      <div className="space-y-1.5">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex justify-center gap-1">
            {row.keys.map((key) => {
              const isActive = key === target;
              return (
                <div
                  key={key}
                  className={cn(
                    'w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-2 flex items-center justify-center text-sm sm:text-base font-bold transition-all',
                    isActive
                      ? [row.activeColor, 'scale-110 shadow-lg ring-4 ring-blue-200']
                      : row.color
                  )}
                >
                  {key}
                </div>
              );
            })}
          </div>
        ))}

        {/* Space bar */}
        <div className="flex justify-center gap-1">
          <div
            className={cn(
              'h-10 sm:h-12 rounded-xl border-2 flex items-center justify-center text-sm font-bold px-12 transition-all',
              target === ' ' || target === 'SPACE'
                ? 'bg-gray-700 text-white scale-105 shadow-lg ring-4 ring-blue-200'
                : 'bg-gray-100 border-gray-300 text-gray-500'
            )}
          >
            Space
          </div>
        </div>
      </div>
    </div>
  );
}
