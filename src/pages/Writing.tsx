import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Keyboard, Puzzle } from "lucide-react";
import { cn } from "@/lib/utils";
import { units } from "@/data";
import { useProgressStore } from "@/stores/useProgressStore";
import Layout from "@/components/layout/Layout";
import TypingArea from "@/components/writing/TypingArea";
import SentenceBuilder from "@/components/writing/SentenceBuilder";

type Mode = "typing" | "sentence";

export default function Writing() {
  const { unitId } = useParams<{ unitId: string }>();
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("typing");
  const completeWriting = useProgressStore((s) => s.completeWriting);

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

  const vocabulary = unit.vocabulary ?? [];

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
        {/* Back */}
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
          <span className="text-3xl">✏️</span>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">Writing</h1>
            <p className="text-gray-500 text-sm">{unit.title}</p>
          </div>
        </motion.div>

        {/* Mode Toggle */}
        <div className="flex gap-2 bg-gray-100 p-1.5 rounded-xl">
          <button
            onClick={() => setMode("typing")}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all",
              mode === "typing"
                ? "bg-white text-orange-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            <Keyboard className="w-4 h-4" />
            Typing Practice
          </button>
          <button
            onClick={() => setMode("sentence")}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all",
              mode === "sentence"
                ? "bg-white text-orange-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            <Puzzle className="w-4 h-4" />
            Sentence Building
          </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {mode === "typing" && (
              <TypingArea
                targetText={vocabulary.map(v => v.word).join(" ")}
                onComplete={(acc, spd) => completeWriting(unit.id, "writing-1")}
              />
            )}
            {mode === "sentence" && (
              <SentenceBuilder
                words={vocabulary.map(v => v.word)}
                correctSentence={vocabulary.map(v => v.word).join(" ")}
                onComplete={(correct) => completeWriting(unit.id, "writing-2")}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Layout>
  );
}
