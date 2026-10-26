import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-8 pb-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 py-6 border-t border-primary-100/50">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary-400">
            <span className="text-lg">🌈</span>
            <span>Keep Learning!</span>
            <span className="text-lg">📚</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>Made with</span>
            <Heart className="h-3.5 w-3.5 text-pink-400" fill="currentColor" />
            <span>for young learners</span>
          </div>

          {/* Decorative dots */}
          <div className="flex gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-primary-300" />
            <span className="w-2 h-2 rounded-full bg-sunny-300" />
            <span className="w-2 h-2 rounded-full bg-fresh-300" />
            <span className="w-2 h-2 rounded-full bg-coral-300" />
            <span className="w-2 h-2 rounded-full bg-lavender-300" />
            <span className="w-2 h-2 rounded-full bg-pink-300" />
          </div>
        </div>
      </div>
    </footer>
  );
}
