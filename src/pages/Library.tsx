import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { books } from "@/data";
import Layout from "@/components/layout/Layout";
import BookCard from "@/components/reading/BookCard";

const LEVELS = ["all", "beginner", "intermediate", "advanced"] as const;

export default function Library() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState<string>("all");

  const filtered = useMemo(() => {
    let result = books ?? [];
    if (level !== "all") {
      result = result.filter((b) => b.level === level);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.content.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, level]);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <span className="text-3xl">📚</span>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">
              Reading Library
            </h1>
            <p className="text-gray-500 text-sm">
              Explore fun stories and practice reading!
            </p>
          </div>
        </motion.div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            {LEVELS.map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors",
                  level === l
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Book Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <BookOpen className="w-14 h-14 mx-auto mb-3 opacity-50" />
            <p className="text-lg font-medium">No books found</p>
            <p className="text-sm">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((book, i) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.3 }}
              >
                <BookCard
                  book={book}
                  onClick={() => navigate(`/library/${book.id}`)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
