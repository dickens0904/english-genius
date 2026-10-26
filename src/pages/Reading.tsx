import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { units } from "@/data";
import { useProgressStore } from "@/stores/useProgressStore";
import Layout from "@/components/layout/Layout";
import TextDisplay from "@/components/reading/TextDisplay";
import ComprehensionQuiz from "@/components/reading/ComprehensionQuiz";

export default function Reading() {
  const { unitId } = useParams<{ unitId: string }>();
  const navigate = useNavigate();
  const [activeReading, setActiveReading] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const completeReading = useProgressStore((s) => s.completeReading);
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

  const readings = unit.readings ?? [];
  const currentReading =
    activeReading !== null ? readings[activeReading] : null;

  const handleComplete = () => {
    if (unit && currentReading) {
      completeReading(unit.id, currentReading.id);
    }
  };

  const handleBack = () => {
    if (showQuiz) {
      setShowQuiz(false);
    } else if (activeReading !== null) {
      setActiveReading(null);
    } else {
      navigate(`/unit/${unitId}`);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleBack}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-700 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {activeReading !== null ? "Back to Readings" : "Back to Unit"}
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <span className="text-3xl">📰</span>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">Reading</h1>
            <p className="text-gray-500 text-sm">{unit.title}</p>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Reading List */}
          {activeReading === null && (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              {readings.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No readings available for this unit yet.</p>
                </div>
              ) : (
                readings.map((reading, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setActiveReading(idx)}
                    className="cursor-pointer bg-white rounded-xl border-2 border-yellow-100 p-4 hover:border-yellow-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          📄
                        </span>
                        <div>
                          <h3 className="font-bold text-gray-800">
                            {reading.title || `Reading ${idx + 1}`}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {reading.content.slice(0, 100) + "..."}
                          </p>
                        </div>
                      </div>
                      <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

          {/* Active Reading */}
          {activeReading !== null && currentReading && !showQuiz && (
            <motion.div
              key="reading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <TextDisplay content={currentReading.content} />
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleComplete}
                  className="flex items-center gap-1.5 bg-green-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-green-600 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Mark Complete
                </button>
                {currentReading.questions &&
                  currentReading.questions.length > 0 && (
                    <button
                      onClick={() => setShowQuiz(true)}
                      className="flex items-center gap-1.5 bg-yellow-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-yellow-600 transition-colors"
                    >
                      Take Quiz 📝
                    </button>
                  )}
              </div>
            </motion.div>
          )}

          {/* Quiz */}
          {activeReading !== null && currentReading && showQuiz && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <ComprehensionQuiz
                questions={currentReading.questions}
                onComplete={(score) => {
                  handleComplete();
                  addStars(unit.id, score >= 3 ? 2 : score >= 1 ? 1 : 0);
                  setShowQuiz(false);
                  setActiveReading(null);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
