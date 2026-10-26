import { useMemo } from "react";
import { motion } from "framer-motion";
import { Star, Flame, BookOpen, Trophy, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { units } from "@/data";
import { useProgressStore } from "@/stores/useProgressStore";
import Layout from "@/components/layout/Layout";

const BADGES = [
  { id: "first-star", label: "First Star", emoji: "⭐", desc: "Earn your first star" },
  { id: "word-master", label: "Word Master", emoji: "📖", desc: "Learn 20 words" },
  { id: "listening-pro", label: "Listening Pro", emoji: "🎧", desc: "Complete 5 listening exercises" },
  { id: "bookworm", label: "Bookworm", emoji: "🐛", desc: "Read 3 books" },
  { id: "perfect-score", label: "Perfect Score", emoji: "💯", desc: "Get 100% on an exercise" },
  { id: "streak-7", label: "7-Day Streak", emoji: "🔥", desc: "Study 7 days in a row" },
  { id: "all-units", label: "All Units", emoji: "🏆", desc: "Complete all units" },
  { id: "writer", label: "Writer", emoji: "✏️", desc: "Complete 10 writing exercises" },
];

export default function Dashboard() {
  const totalStars = useProgressStore((s) => s.totalStars);
  const unitProgressMap = useProgressStore((s) => s.unitProgress);
  const badges = useProgressStore((s) => s.badges);
  const currentStreak = useProgressStore((s) => s.currentStreak);

  const stats = useMemo(() => {
    let unitsCompleted = 0;
    const unitProgress: {
      id: string;
      title: string;
      color: string;
      percent: number;
      stars: number;
    }[] = [];

    for (const unit of units) {
      const p = unitProgressMap[unit.id];
      const stars = p?.starsEarned ?? 0;
      const percent = p
        ? Math.round(
            ((p.vocabularyMastered.length +
              p.listeningCompleted.length +
              p.readingCompleted.length +
              p.writingCompleted.length) /
              20) *
              100
          )
        : 0;
      if (percent >= 100) unitsCompleted++;
      unitProgress.push({
        id: unit.id,
        title: unit.title,
        color: unit.color || "#6366f1",
        percent,
        stars,
      });
    }

    return {
      totalStars,
      unitsCompleted,
      streak: currentStreak,
      unitProgress,
      badges,
    };
  }, [totalStars, unitProgressMap, badges, currentStreak]);

  // Performance data for bar chart
  const performanceData = useMemo(() => {
    return units.map((u) => {
      const p = unitProgressMap[u.id];
      const percent = p
        ? Math.round(
            ((p.vocabularyMastered.length +
              p.listeningCompleted.length +
              p.readingCompleted.length +
              p.writingCompleted.length) /
              20) *
              100
          )
        : 0;
      return {
        label: u.title.length > 8 ? u.title.slice(0, 8) + "…" : u.title,
        value: percent,
        color: u.color || "#6366f1",
      };
    });
  }, [unitProgressMap]);

  const maxVal = Math.max(...performanceData.map((d) => d.value), 1);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <span className="text-3xl">📊</span>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">
              Dashboard
            </h1>
            <p className="text-gray-500 text-sm">
              Track your learning journey!
            </p>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              label: "Total Stars",
              value: stats.totalStars,
              icon: Star,
              iconColor: "text-amber-400",
              bg: "bg-amber-50",
            },
            {
              label: "Day Streak",
              value: stats.streak,
              icon: Flame,
              iconColor: "text-orange-400",
              bg: "bg-orange-50",
            },
            {
              label: "Units Done",
              value: `${stats.unitsCompleted}/${units.length}`,
              icon: BookOpen,
              iconColor: "text-blue-400",
              bg: "bg-blue-50",
            },
            {
              label: "Badges",
              value: stats.badges.length,
              icon: Trophy,
              iconColor: "text-purple-400",
              bg: "bg-purple-50",
            },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className={cn("rounded-xl p-4 text-center", card.bg)}
            >
              <card.icon className={cn("w-6 h-6 mx-auto mb-1", card.iconColor)} />
              <p className="text-xl font-extrabold text-gray-800">
                {card.value}
              </p>
              <p className="text-xs text-gray-500">{card.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Per-Unit Progress */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3"
        >
          <h2 className="font-bold text-gray-800">Unit Progress</h2>
          {stats.unitProgress.map((u) => (
            <div key={u.id} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">{u.title}</span>
                <span className="text-gray-500">
                  {Math.round(u.percent)}% · {u.stars}⭐
                </span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: u.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${u.percent}%` }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                />
              </div>
            </div>
          ))}
        </motion.section>

        {/* Performance Chart */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3"
        >
          <h2 className="font-bold text-gray-800">Performance</h2>
          <div className="flex items-end gap-3 h-40">
            {performanceData.map((d, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <span className="text-xs font-semibold text-gray-600">
                  {Math.round(d.value)}%
                </span>
                <motion.div
                  className="w-full rounded-t-lg"
                  style={{ backgroundColor: d.color }}
                  initial={{ height: 0 }}
                  animate={{
                    height: `${(d.value / maxVal) * 100}%`,
                  }}
                  transition={{ duration: 0.6, delay: 0.05 * i }}
                />
                <span className="text-[10px] text-gray-500 text-center leading-tight mt-1">
                  {d.label}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Badges */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3"
        >
          <h2 className="font-bold text-gray-800">Badges</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BADGES.map((badge) => {
              const unlocked = badges.some(b => b.id === badge.id);
              return (
                <div
                  key={badge.id}
                  className={cn(
                    "rounded-xl p-3 text-center border-2 transition-colors",
                    unlocked
                      ? "border-amber-200 bg-amber-50"
                      : "border-gray-100 bg-gray-50 opacity-60"
                  )}
                >
                  <div className="text-2xl mb-1">
                    {unlocked ? badge.emoji : <Lock className="w-5 h-5 mx-auto text-gray-400" />}
                  </div>
                  <p className="text-xs font-bold text-gray-700">
                    {badge.label}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    {badge.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Motivational Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-5 text-center border border-blue-100"
        >
          <p className="text-lg font-bold text-purple-700">
            {stats.totalStars > 50
              ? "You're an English superstar! Keep shining! ⭐"
              : stats.totalStars > 20
              ? "Amazing progress! You're getting better every day! 🚀"
              : stats.totalStars > 5
              ? "Great start! Keep going and you'll be amazing! 💪"
              : "Every journey begins with a single step. Let's learn! 🌟"}
          </p>
        </motion.div>
      </div>
    </Layout>
  );
}
