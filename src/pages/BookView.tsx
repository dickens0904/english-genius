import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Bookmark, BookmarkCheck, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { books } from "@/data";
import { useProgressStore } from "@/stores/useProgressStore";
import Layout from "@/components/layout/Layout";
import TextDisplay from "@/components/reading/TextDisplay";
import ComprehensionQuiz from "@/components/reading/ComprehensionQuiz";

export default function BookView() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const addStars = useProgressStore((s) => s.addStars);

  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <span className="text-5xl">📖</span>
          <p className="text-lg text-gray-500">Book not found</p>
          <button
            onClick={() => navigate("/library")}
            className="text-blue-500 underline font-medium"
          >
            Back to Library
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
        {/* Top Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between"
        >
          <button
            onClick={() => navigate("/library")}
            className="flex items-center gap-1 text-gray-500 hover:text-gray-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Library
          </button>
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {bookmarked ? (
              <BookmarkCheck className="w-5 h-5 text-blue-500" />
            ) : (
              <Bookmark className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </motion.div>

        {/* Book Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          {book.imageUrl && (
            <img
              src={book.imageUrl}
              alt={book.title}
              className="w-32 h-40 object-cover rounded-xl mx-auto shadow-md"
            />
          )}
          <h1 className="text-2xl font-extrabold text-gray-800">
            {book.title}
          </h1>
          {book.level && (
            <span
              className={cn(
                "inline-block px-3 py-0.5 rounded-full text-xs font-semibold capitalize",
                book.level === "beginner"
                  ? "bg-green-100 text-green-700"
                  : book.level === "intermediate"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              )}
            >
              {book.level}
            </span>
          )}
        </motion.div>

        {/* Book Content */}
        {!showQuiz && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
          >
            <TextDisplay content={book.content} />
          </motion.div>
        )}

        {/* Actions */}
        {!showQuiz && !quizCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-3"
          >
            {book.questions && book.questions.length > 0 && (
              <button
                onClick={() => setShowQuiz(true)}
                className="bg-yellow-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-yellow-600 transition-colors"
              >
                Take Quiz 📝
              </button>
            )}
          </motion.div>
        )}

        {/* Quiz */}
        {showQuiz && book.questions && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ComprehensionQuiz
              questions={book.questions}
              onComplete={(score) => {
                setQuizCompleted(true);
                setShowQuiz(false);
                addStars(book.id, score >= 3 ? 2 : score >= 1 ? 1 : 0);
              }}
            />
          </motion.div>
        )}

        {/* Quiz Completed */}
        {quizCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 space-y-3"
          >
            <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto" />
            <h2 className="text-xl font-bold text-gray-800">
              Great reading! 🎉
            </h2>
            <button
              onClick={() => navigate("/library")}
              className="bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-600 transition-colors"
            >
              Back to Library
            </button>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
