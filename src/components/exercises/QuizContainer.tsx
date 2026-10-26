import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Trophy, Star, RotateCcw,
  ArrowLeft, Clock, CheckCircle2, XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Exercise, QuizResult } from '@/data/types';
import MultipleChoice from './MultipleChoice';
import FillBlank from './FillBlank';
import TrueFalse from './TrueFalse';
import Matching from './Matching';
import DragDrop from './DragDrop';
import WordScramble from './WordScramble';

interface Props {
  exercises: Exercise[];
  onComplete: (results: QuizResult) => void;
  unitTitle?: string;
  onBack?: () => void;
}

function getExerciseComponent(exercise: Exercise) {
  switch (exercise.type) {
    case 'multiple_choice': return MultipleChoice;
    case 'fill_blank': return FillBlank;
    case 'true_false': return TrueFalse;
    case 'matching': return Matching;
    case 'drag_drop': return DragDrop;
    case 'word_scramble': return WordScramble;
    case 'sentence_building': return DragDrop;
    case 'image_select': return MultipleChoice;
    default: return null;
  }
}

export default function QuizContainer({ exercises, onComplete, unitTitle, onBack }: Props) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<
    Record<string, { correct: boolean; answer: string }>
  >({});
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);
  const [direction, setDirection] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const totalPoints = exercises.reduce((s, e) => s + e.points, 0);
  const earnedPoints = Object.entries(answers).reduce(
    (s, [id, a]) => {
      const ex = exercises.find((e) => e.id === id);
      return s + (a.correct ? (ex?.points ?? 0) : 0);
    },
    0,
  );

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleAnswer = useCallback(
    (exerciseId: string, correct: boolean, answer: string) => {
      setAnswers((prev) => ({ ...prev, [exerciseId]: { correct, answer } }));
      setShowResult(true);
    },
    [],
  );

  const handleMatchingDragAnswer = useCallback(
    (exerciseId: string, correct: boolean) => {
      setAnswers((prev) => ({ ...prev, [exerciseId]: { correct, answer: correct ? 'matched' : 'incorrect' } }));
      setShowResult(true);
    },
    [],
  );

  const goNext = () => {
    if (current < exercises.length - 1) {
      setDirection(1);
      setShowResult(false);
      setCurrent(current + 1);
    }
  };

  const goPrev = () => {
    if (current > 0) {
      setDirection(-1);
      setShowResult(false);
      setCurrent(current - 1);
    }
  };

  const handleFinish = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const answerList = exercises.map((e) => ({
      exerciseId: e.id,
      correct: answers[e.id]?.correct ?? false,
      answer: answers[e.id]?.answer ?? '',
    }));
    const score = answerList.filter((a) => a.correct).length;
    const pct = totalPoints > 0
      ? Math.round((earnedPoints / totalPoints) * 100)
      : Math.round((score / exercises.length) * 100);
    const stars: 1 | 2 | 3 = pct >= 95 ? 3 : pct >= 80 ? 2 : 1;
    setFinished(true);
    onComplete({ score: earnedPoints, total: totalPoints, percentage: pct, stars, answers: answerList });
  };

  const exercise = exercises[current];
  const Component = getExerciseComponent(exercise);
  const isAnswered = !!answers[exercise.id];
  const progress = ((current + 1) / exercises.length) * 100;

  if (finished) {
    const answerList = exercises.map((e) => ({
      exerciseId: e.id,
      correct: answers[e.id]?.correct ?? false,
      answer: answers[e.id]?.answer ?? '',
    }));
    const score = answerList.filter((a) => a.correct).length;
    const pct = totalPoints > 0
      ? Math.round((earnedPoints / totalPoints) * 100)
      : Math.round((score / exercises.length) * 100);
    const stars: 1 | 2 | 3 = pct >= 95 ? 3 : pct >= 80 ? 2 : 1;

    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-6 p-6">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-xl"
        >
          <Trophy className="h-14 w-14 text-white" />
        </motion.div>

        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800">Quiz Complete!</h2>
          {unitTitle && <p className="mt-1 text-lg text-gray-500">{unitTitle}</p>}
        </div>

        <div className="flex gap-1">
          {[1, 2, 3].map((s) => (
            <motion.div
              key={s}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3 + s * 0.15, type: 'spring', stiffness: 300 }}
            >
              <Star
                className={cn(
                  'h-12 w-12',
                  s <= stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200',
                )}
              />
            </motion.div>
          ))}
        </div>

        <div className="grid w-full grid-cols-3 gap-3 text-center">
          <div className="rounded-2xl bg-blue-50 p-3">
            <p className="text-2xl font-extrabold text-blue-600">{earnedPoints}/{totalPoints}</p>
            <p className="text-xs font-semibold text-blue-400">Score</p>
          </div>
          <div className="rounded-2xl bg-green-50 p-3">
            <p className="text-2xl font-extrabold text-green-600">{pct}%</p>
            <p className="text-xs font-semibold text-green-400">Accuracy</p>
          </div>
          <div className="rounded-2xl bg-purple-50 p-3">
            <p className="text-2xl font-extrabold text-purple-600">{formatTime(elapsed)}</p>
            <p className="text-xs font-semibold text-purple-400">Time</p>
          </div>
        </div>

        <div className="w-full rounded-2xl bg-gray-50 p-4">
          <p className="mb-2 text-sm font-bold text-gray-500">Question Review</p>
          <div className="flex flex-col gap-2">
            {exercises.map((ex, i) => {
              const a = answers[ex.id];
              return (
                <div key={ex.id} className="flex items-center gap-2 text-sm">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-600">
                    {i + 1}
                  </span>
                  <span className="flex-1 truncate text-gray-700">{ex.question}</span>
                  {a?.correct ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 shrink-0 text-red-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setAnswers({});
              setShowResult(false);
              setCurrent(0);
              setFinished(false);
              setElapsed(0);
              timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
            }}
            className="flex items-center gap-2 rounded-full bg-orange-100 px-6 py-3 font-bold text-orange-700 shadow-sm hover:bg-orange-200"
          >
            <RotateCcw className="h-5 w-5" />
            Try Again
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center gap-2 rounded-full bg-blue-500 px-6 py-3 font-bold text-white shadow-md hover:bg-blue-600"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Unit
          </motion.button>
        </div>
      </div>
    );
  }

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4">
      <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2">
          {unitTitle && <span className="font-bold text-gray-700">{unitTitle}</span>}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Clock className="h-4 w-4" />
          <span className="font-mono">{formatTime(elapsed)}</span>
        </div>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 100 }}
        />
      </div>

      <div className="flex items-center justify-between text-sm font-semibold text-gray-500">
        <span>Question {current + 1} / {exercises.length}</span>
        <span>
          Score: <span className="text-blue-600">{earnedPoints}</span> / {totalPoints}
        </span>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={exercise.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {Component && (
              <Component
                exercise={exercise}
                onAnswer={(correct: boolean, answer?: string) => {
                  if (exercise.type === 'matching' || exercise.type === 'drag_drop' || exercise.type === 'sentence_building') {
                    handleMatchingDragAnswer(exercise.id, correct);
                  } else {
                    handleAnswer(exercise.id, correct, answer || '');
                  }
                }}
                showResult={showResult}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={goPrev}
          disabled={current === 0}
          className={cn(
            'flex items-center gap-1 rounded-full px-5 py-2.5 font-bold transition-all',
            current === 0
              ? 'cursor-not-allowed text-gray-300'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          )}
        >
          <ChevronLeft className="h-5 w-5" />
          Previous
        </motion.button>

        {current === exercises.length - 1 ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFinish}
            disabled={!isAnswered}
            className={cn(
              'flex items-center gap-2 rounded-full px-8 py-3 font-bold text-white shadow-lg transition-all',
              isAnswered
                ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:shadow-xl'
                : 'cursor-not-allowed bg-gray-300',
            )}
          >
            <Trophy className="h-5 w-5" />
            Finish Quiz
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={goNext}
            className="flex items-center gap-1 rounded-full bg-blue-500 px-5 py-2.5 font-bold text-white shadow-md hover:bg-blue-600 transition-all"
          >
            Next
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
