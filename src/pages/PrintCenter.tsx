import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Printer, FileText, BookOpen, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { units } from "@/data";
import Layout from "@/components/layout/Layout";

type ContentType = "vocabulary" | "worksheet" | "reading";

const CONTENT_TYPES: { key: ContentType; label: string; icon: typeof FileText }[] = [
  { key: "vocabulary", label: "Vocabulary List", icon: List },
  { key: "worksheet", label: "Worksheet", icon: FileText },
  { key: "reading", label: "Reading Passage", icon: BookOpen },
];

export default function PrintCenter() {
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [contentType, setContentType] = useState<ContentType>("vocabulary");
  const printRef = useRef<HTMLDivElement>(null);

  const unit = units.find((u) => u.id === selectedUnit);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <span className="text-3xl">🖨️</span>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">
              Print Center
            </h1>
            <p className="text-gray-500 text-sm">
              Print worksheets and vocabulary lists for offline practice
            </p>
          </div>
        </motion.div>

        {/* Select Unit */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <h2 className="font-bold text-gray-700 text-sm">Select Unit</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {units.map((u) => (
              <button
                key={u.id}
                onClick={() => setSelectedUnit(u.id)}
                className={cn(
                  "p-3 rounded-xl border-2 text-sm font-semibold text-left transition-all",
                  selectedUnit === u.id
                    ? "border-blue-400 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                )}
              >
                <span className="mr-1.5">{u.icon || "📚"}</span>
                {u.title}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Select Content Type */}
        {selectedUnit && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <h2 className="font-bold text-gray-700 text-sm">
              Content Type
            </h2>
            <div className="flex gap-2">
              {CONTENT_TYPES.map((ct) => {
                const Icon = ct.icon;
                return (
                  <button
                    key={ct.key}
                    onClick={() => setContentType(ct.key)}
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all",
                      contentType === ct.key
                        ? "border-purple-400 bg-purple-50 text-purple-700"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {ct.label}
                  </button>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* Print Preview */}
        {selectedUnit && unit && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-gray-700 text-sm">Preview</h2>
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 bg-blue-500 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-blue-600 transition-colors print:hidden"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
            </div>
            <div
              ref={printRef}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm min-h-[400px]"
            >
              {/* Simple Print Preview */}
              <div className="space-y-4">
                <div className="text-center border-b border-gray-200 pb-4">
                  <h1 className="text-xl font-extrabold text-gray-800">
                    {unit.title} —{" "}
                    {CONTENT_TYPES.find((c) => c.key === contentType)?.label}
                  </h1>
                  <p className="text-sm text-gray-500">{unit.theme}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Name: ________________ Date: ____________
                  </p>
                </div>

                {contentType === "vocabulary" && (
                  <div className="space-y-2">
                    <h2 className="font-bold text-gray-700">Vocabulary List</h2>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-1.5 text-gray-500 font-medium">
                            #
                          </th>
                          <th className="text-left py-1.5 text-gray-500 font-medium">
                            English
                          </th>
                          <th className="text-left py-1.5 text-gray-500 font-medium">
                            Phonetic
                          </th>
                          <th className="text-left py-1.5 text-gray-500 font-medium">
                            Example Sentence
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(unit.vocabulary ?? []).map((word, i) => (
                          <tr
                            key={i}
                            className="border-b border-gray-100"
                          >
                            <td className="py-1.5 text-gray-400">
                              {i + 1}
                            </td>
                            <td className="py-1.5 font-medium">
                              {word.word}
                            </td>
                            <td className="py-1.5 text-gray-600">
                              {word.phonetic}
                            </td>
                            <td className="py-1.5 text-gray-500 italic text-xs">
                              {word.exampleSentence || "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {contentType === "worksheet" && (
                  <div className="space-y-4">
                    <h2 className="font-bold text-gray-700">
                      Fill in the Blanks
                    </h2>
                    {(unit.vocabulary ?? []).slice(0, 8).map((word, i) => (
                      <p key={i} className="text-sm text-gray-700">
                        {i + 1}. {word.exampleSentence ? word.exampleSentence.replace(new RegExp(word.word, "i"), "________") : `Fill in the blank: ________`}
                      </p>
                    ))}
                    <div className="border-t border-gray-200 pt-3">
                      <h3 className="font-bold text-gray-700 text-sm mb-2">
                        Word Bank
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {(unit.vocabulary ?? [])
                          .slice(0, 8)
                          .sort(() => Math.random() - 0.5)
                          .map((word, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-gray-100 rounded text-xs font-medium"
                            >
                              {word.word}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                )}

                {contentType === "reading" && (
                  <div className="space-y-3">
                    {(unit.readings ?? []).map((r, i) => (
                      <div key={i} className="space-y-1">
                        <h3 className="font-bold text-gray-700 text-sm">
                          {r.title || `Passage ${i + 1}`}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {r.content}
                        </p>
                      </div>
                    ))}
                    {(unit.readings ?? []).length === 0 && (
                      <p className="text-gray-400 text-sm text-center py-8">
                        No reading passages available for this unit.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        )}

        {/* Empty State */}
        {!selectedUnit && (
          <div className="text-center py-12 text-gray-400">
            <Printer className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Select a unit to get started</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
