import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { units } from "@/data";
import { useProgressStore } from "@/stores/useProgressStore";
import Layout from "@/components/layout/Layout";
import QuizContainer from "@/components/exercises/QuizContainer";

export default function Exercises() {
  const { unitId } = useParams<{ unitId: string }>();
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const recordExerciseScore = useProgressStore((s) => s.recordExerciseScore);
  const addStars = useProgressStore((s) => s.addStars);

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

  const exercises = unit.exercises ?? [];
  const pct = total > 0 ? (score / total) * 100 : 0;
  const starsEarned = pct >= 95 ? 3 : pct >= 80 ? 2 : pct >= 60 ? 1 : 0;

  const handleComplete = (results: { score: number; total: number; percentage?: number; stars?: number }) => {
    setScore(results.score);
    setTotal(results.total);
    setShowResults(true);
    const s = results.stars || (results.total > 0 ? ((results.score / results.total) >= 0.95 ? 3 : (results.score / results.total) >= 0.8 ? 2 : 1) : 0);
    recordExerciseScore(unit.id, "quiz", results.score);
    addStars(unit.id, s);
  };

  const handleRetry = () => {
    setShowResults(false);
    setScore(0);
    setTotal(0);
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
          <span className="text-3xl">🏆</span>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">Exercises</h1>
            <p className="text-gray-500 text-sm">{unit.title}</p>
          </div>
        </motion.div>

        {/* Quiz or Results */}
        {showResults ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl border border-gray-200 p-8 text-center space-y-5 shadow-sm"
          >
            <motion.span
              className="text-6xl inline-block"
              animate={{ rotate: [0, -10, 10, -5, 0] }}
              transition={{ duration: 0.5 }}
            >
              {starsEarned >= 2 ? "🎉" : starsEarned >= 1 ? "👍" : "💪"}
            </motion.span>
            <h2 className="text-2xl font-extrabold text-gray-800">
              {starsEarned >= 2
                ? "Excellent Work!"
                : starsEarned >= 1
                ? "Good Job!"
                : "Keep Trying!"}
            </h2>
            <p className="text-gray-500">
              You got{" "}
              <span className="font-bold text-gray-800">
                {score}/{total}
              </span>{" "}
              correct!
            </p>
            <div className="flex items-center justify-center gap-1">
              {[1, 2, 3].map((s) => (
                <motion.div
                  key={s}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 * s }}
                >
                  <Star
                    className={cn(
                      "w-10 h-10",
                      s <= starsEarned
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-200 fill-gray-200"
                    )}
                  />
                </motion.div>
              ))}
            </div>
            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={handleRetry}
                className="flex items-center gap-1.5 bg-purple-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-purple-600 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
              <button
                onClick={() => navigate(`/unit/${unitId}`)}
                className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition-colors"
              >
                Back to Unit
              </button>
            </div>
          </motion.div>
        ) : (
          <QuizContainer
            exercises={exercises}
            unitTitle={unit.title}
            onComplete={handleComplete}
            onBack={() => navigate(`/unit/${unitId}`)}
          />
        )}
      </div>
    </Layout>
  );
}
