import { useState } from "react";
import { motion } from "framer-motion";
import {
  Volume2,
  VolumeX,
  Mic,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { useProgressStore } from "@/stores/useProgressStore";
import { useTTS } from "@/hooks/useTTS";
import Layout from "@/components/layout/Layout";
import Modal from "@/components/common/Modal";

export default function Settings() {
  const voiceSpeed = useSettingsStore((s) => s.voiceSpeed);
  const volume = useSettingsStore((s) => s.volume);
  const difficulty = useSettingsStore((s) => s.difficulty);
  const showPhonetics = useSettingsStore((s) => s.showPhonetics);
  const autoPlayAudio = useSettingsStore((s) => s.autoPlayAudio);
  const playerName = useSettingsStore((s) => s.playerName);
  const updateSettings = useSettingsStore((s) => s.updateSettings);
  const resetProgress = useProgressStore((s) => s.resetProgress);
  const { speak } = useTTS();
  const [showResetModal, setShowResetModal] = useState(false);

  const handleTestVoice = () => {
    speak("Hello! I am your English learning buddy. Let's have fun learning together!");
  };

  const handleReset = () => {
    resetProgress();
    setShowResetModal(false);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <span className="text-3xl">⚙️</span>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">Settings</h1>
            <p className="text-gray-500 text-sm">Customize your learning experience</p>
          </div>
        </motion.div>

        {/* Player Name */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4"
        >
          <h2 className="font-bold text-gray-800">Player Name</h2>
          <input
            type="text"
            value={playerName ?? ""}
            onChange={(e) => updateSettings({ playerName: e.target.value })}
            placeholder="Enter your name"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
          />
        </motion.section>

        {/* Voice Settings */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-5"
        >
          <h2 className="font-bold text-gray-800">Voice Settings</h2>

          {/* Speed */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Voice Speed
              </label>
              <span className="text-sm text-gray-500 font-mono">
                {(voiceSpeed ?? 1).toFixed(1)}x
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.1"
              value={voiceSpeed ?? 1}
              onChange={(e) =>
                updateSettings({ voiceSpeed: parseFloat(e.target.value) })
              }
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>0.5x Slow</span>
              <span>1.5x Fast</span>
            </div>
          </div>

          {/* Volume */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                Volume
                {(volume ?? 1) === 0 ? (
                  <VolumeX className="w-4 h-4 text-gray-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-blue-400" />
                )}
              </label>
              <span className="text-sm text-gray-500 font-mono">
                {Math.round((volume ?? 1) * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume ?? 1}
              onChange={(e) =>
                updateSettings({ volume: parseFloat(e.target.value) })
              }
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Test Voice */}
          <button
            onClick={handleTestVoice}
            className="flex items-center gap-1.5 bg-green-500 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-green-600 transition-colors"
          >
            <Mic className="w-4 h-4" />
            Test Voice
          </button>
        </motion.section>

        {/* Learning Settings */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-5"
        >
          <h2 className="font-bold text-gray-800">Learning Settings</h2>

          {/* Difficulty */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Difficulty
            </label>
            <div className="flex gap-2">
              {(["easy", "normal", "hard"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => updateSettings({ difficulty: d })}
                  className={cn(
                    "flex-1 py-2 rounded-xl text-sm font-semibold capitalize transition-all border-2",
                    (difficulty ?? "normal") === d
                      ? d === "easy"
                        ? "border-green-400 bg-green-50 text-green-700"
                        : d === "normal"
                        ? "border-blue-400 bg-blue-50 text-blue-700"
                        : "border-red-400 bg-red-50 text-red-700"
                      : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Show Phonetics Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Show Phonetics
            </span>
            <button
              onClick={() =>
                updateSettings({ showPhonetics: !showPhonetics })
              }
              className={cn(
                "relative w-12 h-6 rounded-full transition-colors",
                showPhonetics ? "bg-blue-500" : "bg-gray-300"
              )}
            >
              <motion.div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow"
                animate={{
                  left: showPhonetics ? "1.625rem" : "0.125rem",
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
          </div>

          {/* Auto-play Audio Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Auto-play Audio
            </span>
            <button
              onClick={() =>
                updateSettings({ autoPlayAudio: !autoPlayAudio })
              }
              className={cn(
                "relative w-12 h-6 rounded-full transition-colors",
                autoPlayAudio ? "bg-blue-500" : "bg-gray-300"
              )}
            >
              <motion.div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow"
                animate={{
                  left: autoPlayAudio ? "1.625rem" : "0.125rem",
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        </motion.section>

        {/* Danger Zone */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-red-200 p-5 shadow-sm space-y-3"
        >
          <h2 className="font-bold text-red-600 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            Danger Zone
          </h2>
          <p className="text-sm text-gray-500">
            This will permanently delete all your progress, stars, and badges.
          </p>
          <button
            onClick={() => setShowResetModal(true)}
            className="flex items-center gap-1.5 bg-red-500 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Reset All Progress
          </button>
        </motion.section>

        {/* Reset Confirmation Modal */}
        {showResetModal && (
          <Modal isOpen={showResetModal} onClose={() => setShowResetModal(false)}>
            <div className="p-6 text-center space-y-4">
              <span className="text-5xl">⚠️</span>
              <h2 className="text-xl font-bold text-gray-800">
                Reset All Progress?
              </h2>
              <p className="text-gray-500 text-sm">
                This action cannot be undone. All your stars, badges, and
                learning progress will be permanently deleted.
              </p>
              <div className="flex gap-3 justify-center pt-2">
                <button
                  onClick={() => setShowResetModal(false)}
                  className="px-5 py-2.5 rounded-xl font-bold text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl font-bold text-sm bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  Yes, Reset Everything
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </Layout>
  );
}
