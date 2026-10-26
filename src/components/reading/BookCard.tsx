import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BookCardProps {
  book: {
    id: string;
    title: string;
    imageUrl: string;
    level: string;
  };
  onClick: () => void;
}

const levelColors: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700 border-green-300',
  intermediate: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  advanced: 'bg-orange-100 text-orange-700 border-orange-300',
};

const borderColors: Record<string, string> = {
  beginner: 'border-green-400',
  intermediate: 'border-yellow-400',
  advanced: 'border-orange-400',
};

export default function BookCard({ book, onClick }: BookCardProps) {
  const levelKey = book.level.toLowerCase();
  const levelStyle = levelColors[levelKey] || levelColors.beginner;
  const borderColor = borderColors[levelKey] || borderColors.beginner;

  return (
    <motion.div
      onClick={onClick}
      className="cursor-pointer group"
      whileHover={{ y: -8, rotateZ: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <div
        className={cn(
          'rounded-2xl border-4 overflow-hidden shadow-lg bg-white transition-shadow group-hover:shadow-2xl',
          borderColor
        )}
      >
        {/* Book cover */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280"><rect width="200" height="280" fill="%23f3f4f6"/><text x="100" y="140" text-anchor="middle" dominant-baseline="middle" font-size="60">📖</text></svg>';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Level badge */}
          <span
            className={cn(
              'absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full border',
              levelStyle
            )}
          >
            {book.level}
          </span>
        </div>

        {/* Title */}
        <div className="p-4">
          <h3 className="text-base font-bold text-gray-800 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
            {book.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}
