import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BookOpen, Layers, Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { units } from "@/data";
import { useProgressStore } from "@/stores/useProgressStore";
import Layout from "@/components/layout/Layout";
import WordGrid from "@/components/vocabulary/WordGrid";
import FlashCardGame from "@/components/vocabulary/FlashCardGame";
import WordMatchGame from "@/components/vocabulary/WordMatchGame";

const TABS = [
  { key: "learn", label: "Learn", icon: BookOpen },
  { key: "flashcards", label: "Flashcards", icon: Layers },
  { key: "match", label: "Match Game", icon: Gamepad2 },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function Vocabulary() {
  const { unitId } = useParams<{ unitId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>("learn");
  const completeVocabulary = useProgressStore((s) => s.completeVocabulary);
  const addStars = useProgressStore((s) => s.addStars);
  const unitProgressMap = useProgressStore((s) => s.unitProgress);

  const unit = units.find((u) => u.id === unitId);
  const masteredIds = unitProgressMap[unitId || '']?.vocabularyMastered || [];

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

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(`/unit/${unitId}`)}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-700 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Unit
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <span className="text-3xl">📖</span>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">
              Vocabulary
            </h1>
            <p className="text-gray-500 text-sm">{unit.title}</p>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-2 bg-gray-100 p-1.5 rounded-xl">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all",
                  isActive
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "learn" && (
              <WordGrid words={unit.vocabulary} onWordSelect={(word) => completeVocabulary(unit.id, word.id)} masteredIds={masteredIds} />
            )}
            {activeTab === "flashcards" && (
              <FlashCardGame words={unit.vocabulary} onComplete={(score) => {
                if (score > 0) addStars(unit.id, Math.min(3, Math.ceil(score / unit.vocabulary.length * 3)));
              }} />
            )}
            {activeTab === "match" && (
              <WordMatchGame words={unit.vocabulary} onComplete={(score) => {
                if (score > 0) addStars(unit.id, Math.min(3, Math.ceil(score / unit.vocabulary.length * 3)));
              }} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Layout>
  );
}
