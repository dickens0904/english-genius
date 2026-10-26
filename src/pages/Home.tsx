import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Sparkles, BookOpen, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { units } from "@/data";
import { useProgressStore } from "@/stores/useProgressStore";
import Layout from "@/components/layout/Layout";

const DAILY_TIPS = [
  "Try reading a short English story every day to build your vocabulary!",
  "Practice speaking English with your friends — even 5 minutes helps!",
  "Listen to English songs and try to sing along!",
  "Write 3 new English words in a notebook each morning.",
  "Watch a cartoon in English with subtitles — it's fun and helpful!",
];

const MASCOTS = ["🦉", "🐱", "🦊", "🐼", "🐰"];

function ProgressRing({ percent, size = 48 }: { percent: number; size?: number }) {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth={strokeWidth}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#f59e0b"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1, ease: "easeOut" }}
        strokeLinecap="round"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs font-bold fill-gray-700"
        transform={`rotate(90 ${size / 2} ${size / 2})`}
      >
        {Math.round(percent)}%
      </text>
    </svg>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const totalStars = useProgressStore((s) => s.totalStars);
  const unitProgress = useProgressStore((s) => s.unitProgress);
  const badges = useProgressStore((s) => s.badges);
  const currentStreak = useProgressStore((s) => s.currentStreak);

  const dailyTip = useMemo(
    () => DAILY_TIPS[Math.floor(Math.random() * DAILY_TIPS.length)],
    []
  );
  const mascot = useMemo(
    () => MASCOTS[Math.floor(Math.random() * MASCOTS.length)],
    []
  );

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3"
        >
          <motion.div
            className="text-6xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            {mascot}
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Welcome to English Genius!
          </h1>
          <p className="text-gray-500 text-lg">
            Learn English the fun way — one adventure at a time!
          </p>
          <div className="flex items-center justify-center gap-2 text-amber-500 font-bold text-lg">
            <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
            <span>{totalStars} Stars Earned</span>
          </div>
        </motion.section>

        {/* Daily Tip */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-5 flex items-start gap-3 border border-blue-100"
        >
          <Sparkles className="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-purple-700 text-sm">Daily Tip</p>
            <p className="text-gray-600">{dailyTip}</p>
          </div>
        </motion.section>

        {/* Unit Grid */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-800">Your Units</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {units.map((unit, i) => {
              const up = unitProgress[unit.id];
              const percent = up ? Math.round((up.vocabularyMastered.length + up.listeningCompleted.length + up.readingCompleted.length + up.writingCompleted.length) / 20 * 100) : 0;
              const stars = up?.starsEarned ?? 0;

              return (
                <motion.div
                  key={unit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/unit/${unit.id}`)}
                  className={cn(
                    "cursor-pointer rounded-2xl p-5 shadow-md border-2 transition-shadow hover:shadow-lg",
                    "bg-white"
                  )}
                  style={{ borderColor: unit.color || "#e5e7eb" }}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <span className="text-3xl">{unit.icon || "📚"}</span>
                      <h3 className="font-bold text-gray-800 text-lg mt-1">
                        {unit.title}
                      </h3>
                      <p className="text-sm text-gray-500">{unit.theme}</p>
                    </div>
                    <ProgressRing percent={percent} />
                  </div>
                  <div className="flex items-center gap-1 mt-3 text-amber-500 text-sm font-semibold">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{stars} stars</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Quick Stats */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {[
            {
              label: "Total Stars",
              value: totalStars,
              icon: <Star className="w-5 h-5 text-amber-400" />,
              bg: "bg-amber-50",
            },
            {
              label: "Units",
              value: units.length,
              icon: <BookOpen className="w-5 h-5 text-blue-400" />,
              bg: "bg-blue-50",
            },
            {
              label: "Active Days",
              value: currentStreak,
              icon: <TrendingUp className="w-5 h-5 text-green-400" />,
              bg: "bg-green-50",
            },
            {
              label: "Badges",
              value: badges.length,
              icon: <Sparkles className="w-5 h-5 text-purple-400" />,
              bg: "bg-purple-50",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={cn(
                "rounded-xl p-4 flex flex-col items-center gap-1",
                stat.bg
              )}
            >
              {stat.icon}
              <span className="text-xl font-extrabold text-gray-800">
                {stat.value}
              </span>
              <span className="text-xs text-gray-500">{stat.label}</span>
            </div>
          ))}
        </motion.section>
      </div>
    </Layout>
  );
}
