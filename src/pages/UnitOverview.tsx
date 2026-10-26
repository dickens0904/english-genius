import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Headphones,
  BookText,
  PenTool,
  Trophy,
  ArrowLeft,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { units } from "@/data";
import { useProgressStore } from "@/stores/useProgressStore";
import Layout from "@/components/layout/Layout";

const MODULES = [
  {
    key: "vocabulary",
    label: "Vocabulary",
    icon: BookOpen,
    color: "#3b82f6",
    bg: "bg-blue-50",
    border: "border-blue-200",
    emoji: "📖",
  },
  {
    key: "listening",
    label: "Listening",
    icon: Headphones,
    color: "#22c55e",
    bg: "bg-green-50",
    border: "border-green-200",
    emoji: "🎧",
  },
  {
    key: "reading",
    label: "Reading",
    icon: BookText,
    color: "#eab308",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    emoji: "📰",
  },
  {
    key: "writing",
    label: "Writing",
    icon: PenTool,
    color: "#f97316",
    bg: "bg-orange-50",
    border: "border-orange-200",
    emoji: "✏️",
  },
  {
    key: "exercises",
    label: "Exercises",
    icon: Trophy,
    color: "#a855f7",
    bg: "bg-purple-50",
    border: "border-purple-200",
    emoji: "🏆",
  },
];

export default function UnitOverview() {
  const { unitId } = useParams<{ unitId: string }>();
  const navigate = useNavigate();
  const unitProgressMap = useProgressStore((s) => s.unitProgress);

  const unit = units.find((u) => u.id === unitId);

  if (!unit) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <span className="text-5xl">😕</span>
          <p className="text-lg text-gray-500">Unit not found</p>
          <button
            onClick={() => navigate("/")}
            className="text-blue-500 underline font-medium"
          >
            Go back home
          </button>
        </div>
      </Layout>
    );
  }

  const unitProg = unitProgressMap[unit.id];
  const unitStars = unitProg?.starsEarned ?? 0;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-700 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </motion.button>

        {/* Unit Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 text-center space-y-2"
          style={{ background: `linear-gradient(135deg, ${unit.color}22, ${unit.color}11)` }}
        >
          <motion.span
            className="text-5xl inline-block"
            animate={{ rotate: [0, -10, 10, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            {unit.icon || "📚"}
          </motion.span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800">
            {unit.title}
          </h1>
          <p className="text-gray-500">{unit.theme}</p>
          <div className="flex items-center justify-center gap-1 text-amber-500 font-bold">
            <Star className="w-5 h-5 fill-amber-400" />
            <span>{unitStars} stars earned</span>
          </div>
        </motion.div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULES.map((mod, i) => {
            const Icon = mod.icon;
            let completed = 0;
            if (unitProg) {
              switch (mod.key) {
                case "vocabulary":
                  completed = unitProg.vocabularyMastered.length;
                  break;
                case "listening":
                  completed = unitProg.listeningCompleted.length;
                  break;
                case "reading":
                  completed = unitProg.readingCompleted.length;
                  break;
                case "writing":
                  completed = unitProg.writingCompleted.length;
                  break;
                case "exercises":
                  completed = Object.keys(unitProg.exerciseScores).length;
                  break;
              }
            }

            return (
              <motion.div
                key={mod.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/unit/${unitId}/${mod.key}`)}
                className={cn(
                  "cursor-pointer rounded-2xl p-5 border-2 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-2 text-center",
                  mod.bg,
                  mod.border
                )}
              >
                <span className="text-3xl">{mod.emoji}</span>
                <Icon
                  className="w-6 h-6"
                  style={{ color: mod.color }}
                />
                <h3 className="font-bold text-gray-800">{mod.label}</h3>
                <div className="flex items-center gap-1 text-amber-500 text-sm">
                  <span>{completed} completed</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
