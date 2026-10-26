import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, BarChart3, Printer, Settings, Star, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useProgressStore } from "@/stores/useProgressStore";

const NAV_ITEMS = [
  { path: "/", label: "Home", icon: Home },
  { path: "/library", label: "Library", icon: BookOpen },
  { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { path: "/print", label: "Print", icon: Printer },
  { path: "/settings", label: "Settings", icon: Settings },
];

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalStars = useProgressStore((s) => s.totalStars);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-primary-500 via-lavender-500 to-pink-500 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🦁</span>
            <span className="font-display text-xl font-extrabold text-white tracking-wide">
              English Genius
            </span>
            <Star className="h-5 w-5 text-sunny-300 animate-bounce-slow" fill="currentColor" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-2xl text-sm font-semibold transition-all duration-200",
                    active
                      ? "bg-white/25 text-white shadow-sm"
                      : "text-white/80 hover:bg-white/15 hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Star counter + hamburger */}
          <div className="flex items-center gap-3">
            <motion.div
              className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1.5 text-white font-bold text-sm"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Star className="h-4 w-4 text-sunny-300" fill="currentColor" />
              <span>{totalStars}</span>
            </motion.div>

            <button
              className="md:hidden p-2 rounded-xl text-white hover:bg-white/15 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-primary-600/95 backdrop-blur-sm"
          >
            <div className="px-4 py-3 space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-semibold transition-all",
                      active
                        ? "bg-white/20 text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
