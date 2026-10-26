import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Headphones, PenLine, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { units } from "@/data";
import { useProgressStore } from "@/stores/useProgressStore";
import { useTTS } from "@/hooks/useTTS";
import Layout from "@/components/layout/Layout";
import AudioControls from "@/components/listening/AudioControls";
import DictationExercise from "@/components/listening/DictationExercise";

type Mode = "choose" | "dictation";

export default function Listening() {
  const { unitId } = useParams<{ unitId: string }>();
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("choose");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const completeListening = useProgressStore((s) => s.completeListening);
  const { speak } = useTTS();

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
  const currentWord = vocabulary[currentIndex];

  // Add lesson sentences for dictation
  const lessonSentences = unit.lessons?.flatMap(l =>
    l.audioScript.split(/[.!?]+/).filter(s => s.trim().length > 5).map(s => s.trim())
  ) || [];

  const dictationTexts = lessonSentences.length > 0 ? lessonSentences : vocabulary.map(v => v.word);

  const handlePlayAudio = () => {
    if (currentWord) {
      speak(currentWord.word);
    }
  };

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    if (currentIndex < vocabulary.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      completeListening(unit.id, "listening-1");
      setCurrentIndex(0);
    }
  };

  // Generate wrong options for "Listen & Choose"
  const getOptions = () => {
    if (!currentWord) return [];
    const others = vocabulary
      .filter((_, i) => i !== currentIndex)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((w) => w.word);
    const opts = [currentWord.word, ...others].sort(
      () => Math.random() - 0.5
    );
    return opts;
  };

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
          <span className="text-3xl">🎧</span>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">Listening</h1>
            <p className="text-gray-500 text-sm">{unit.title}</p>
          </div>
        </motion.div>

        {/* Mode Toggle */}
        <div className="flex gap-2 bg-gray-100 p-1.5 rounded-xl">
          <button
            onClick={() => setMode("choose")}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all",
              mode === "choose"
                ? "bg-white text-green-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            <Headphones className="w-4 h-4" />
            Listen & Choose
          </button>
          <button
            onClick={() => setMode("dictation")}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all",
              mode === "dictation"
                ? "bg-white text-green-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            <PenLine className="w-4 h-4" />
            Dictation
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
            {mode === "choose" && currentWord && (
              <div className="space-y-5">
                {/* Progress */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>
                    Word {currentIndex + 1} of {vocabulary.length}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 font-semibold">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>
                      {vocabulary.length - currentIndex - 1} remaining
                    </span>
                  </div>
                </div>

                {/* Audio Controls */}
                <div className="flex justify-center">
                  <AudioControls
                    text={currentWord.word}
                    speed={0.8}
                    onSpeedChange={() => {}}
                  />
                </div>

                {/* Options */}
                <div className="grid grid-cols-2 gap-3">
                  {getOptions().map((opt) => {
                    const isCorrect = opt === currentWord.word;
                    const isSelected = selectedAnswer === opt;

                    let optionStyle =
                      "bg-white border-gray-200 hover:border-green-300 hover:bg-green-50";
                    if (showResult && isSelected && isCorrect) {
                      optionStyle = "bg-green-100 border-green-400 text-green-700";
                    } else if (showResult && isSelected && !isCorrect) {
                      optionStyle = "bg-red-100 border-red-400 text-red-700";
                    } else if (showResult && isCorrect) {
                      optionStyle = "bg-green-50 border-green-300";
                    }

                    return (
                      <motion.button
                        key={opt}
                        whileTap={{ scale: 0.95 }}
                        disabled={showResult}
                        onClick={() => handleSelectAnswer(opt)}
                        className={cn(
                          "p-4 rounded-xl border-2 font-semibold text-lg transition-colors",
                          optionStyle
                        )}
                      >
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Next Button */}
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center"
                  >
                    <button
                      onClick={handleNext}
                      className="bg-green-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-green-600 transition-colors"
                    >
                      {currentIndex < vocabulary.length - 1
                        ? "Next Word →"
                        : "Finish! 🎉"}
                    </button>
                  </motion.div>
                )}
              </div>
            )}

            {mode === "dictation" && (
              <DictationExercise
                text={dictationTexts[currentIndex % dictationTexts.length] || ""}
                onCorrect={() => completeListening(unit.id, "dictation-" + currentIndex)}
                onWrong={() => {}}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Layout>
  );
}
