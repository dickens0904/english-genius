import { useState } from 'react';
import { ChevronRight, Trophy, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Exercise } from '@/data/types';

interface ComprehensionQuizProps {
  questions: Exercise[];
  onComplete: (score: number) => void;
}

export default function ComprehensionQuiz({ questions, onComplete }: ComprehensionQuizProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const question = questions[current];
  const questionType = question.type;
  const options = question.options || [];

  const handleSelect = (option: string) => {
    if (isAnswered) return;
    setSelected(option);
    setIsAnswered(true);

    const correct =
      Array.isArray(question.correctAnswer)
        ? question.correctAnswer.includes(option)
        : option.toLowerCase() === String(question.correctAnswer).toLowerCase();

    if (correct) {
      setScore((s) => s + question.points);
    }
  };

  const handleSubmitBlank = () => {
    if (!inputValue.trim() || isAnswered) return;
    const answer = inputValue.trim();
    setSelected(answer);
    setIsAnswered(true);

    const correct =
      Array.isArray(question.correctAnswer)
        ? question.correctAnswer.some((a) => a.toLowerCase() === answer.toLowerCase())
        : answer.toLowerCase() === String(question.correctAnswer).toLowerCase();

    if (correct) {
      setScore((s) => s + question.points);
    }
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setIsFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setIsAnswered(false);
      setInputValue('');
    }
  };

  const handleFinish = () => {
    onComplete(score);
  };

  if (questions.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400 text-lg">
        No questions available.
      </div>
    );
  }

  if (isFinished) {
    const maxScore = questions.reduce((sum, q) => sum + q.points, 0);
    const percent = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md mx-auto text-center py-8 px-4"
      >
        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-8 shadow-xl">
          <Trophy size={64} className="mx-auto text-yellow-500 mb-4" />
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Quiz Complete!</h2>
          <p className="text-gray-600 mb-4">
            You scored <span className="font-bold text-green-600">{score}</span> out of{' '}
            <span className="font-bold">{maxScore}</span> points!
          </p>
          <div className="text-5xl font-extrabold text-orange-500 mb-6">{percent}%</div>
          <button
            onClick={handleFinish}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            Continue
          </button>
        </div>
      </motion.div>
    );
  }

  const correctAnswerStr = Array.isArray(question.correctAnswer)
    ? question.correctAnswer[0]
    : String(question.correctAnswer);

  const isCorrect =
    selected !== null &&
    (Array.isArray(question.correctAnswer)
      ? question.correctAnswer.some((a) => a.toLowerCase() === selected.toLowerCase())
      : selected.toLowerCase() === correctAnswerStr.toLowerCase());

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-gray-600">
            Question {current + 1} of {questions.length}
          </span>
          <span className="text-sm font-bold text-green-600">Score: {score}</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-300"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h3>

            {/* Options */}
            <div className="space-y-3">
              {questionType === 'true_false' ? (
                <div className="flex gap-4">
                  {['True', 'False'].map((val) => {
                    const isThisSelected = selected === val;
                    const optionCorrect = val.toLowerCase() === correctAnswerStr.toLowerCase();
                    const showAsCorrect = isAnswered && optionCorrect;
                    const showAsWrong = isAnswered && isThisSelected && !optionCorrect;
                    return (
                      <motion.button
                        key={val}
                        onClick={() => handleSelect(val)}
                        disabled={isAnswered}
                        className={cn(
                          'flex-1 py-4 rounded-2xl border-3 font-bold text-lg text-center transition-all',
                          val === 'True' ? 'bg-green-50 border-green-200 hover:border-green-400' : 'bg-red-50 border-red-200 hover:border-red-400',
                          showAsCorrect && '!border-green-400 !bg-green-100 text-green-700',
                          showAsWrong && '!border-red-400 !bg-red-100 text-red-700',
                          isAnswered && !showAsCorrect && !showAsWrong && 'opacity-50',
                        )}
                        whileTap={!isAnswered ? { scale: 0.98 } : undefined}
                      >
                        {val}
                      </motion.button>
                    );
                  })}
                </div>
              ) : questionType === 'fill_blank' ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmitBlank()}
                    disabled={isAnswered}
                    placeholder="Type your answer..."
                    className={cn(
                      'flex-1 rounded-2xl border-3 px-5 py-3 text-center text-lg font-semibold outline-none transition-all',
                      'border-blue-200 bg-blue-50 focus:border-blue-400 focus:ring-4 focus:ring-blue-100',
                      isAnswered && isCorrect && '!border-green-400 !bg-green-50',
                      isAnswered && !isCorrect && '!border-red-400 !bg-red-50',
                    )}
                  />
                  {!isAnswered && (
                    <motion.button
                      onClick={handleSubmitBlank}
                      disabled={!inputValue.trim()}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        'rounded-2xl px-6 py-3 font-bold text-white transition-all',
                        inputValue.trim()
                          ? 'bg-blue-500 hover:bg-blue-600'
                          : 'bg-gray-300 cursor-not-allowed',
                      )}
                    >
                      Submit
                    </motion.button>
                  )}
                </div>
              ) : (
                options.map((option, idx) => {
                  const optionCorrect =
                    Array.isArray(question.correctAnswer)
                      ? question.correctAnswer.some((a) => a.toLowerCase() === option.toLowerCase())
                      : option.toLowerCase() === correctAnswerStr.toLowerCase();

                  const isThisSelected = selected === option;
                  const showAsCorrect = isAnswered && optionCorrect;
                  const showAsWrong = isAnswered && isThisSelected && !optionCorrect;

                  return (
                    <motion.button
                      key={idx}
                      onClick={() => handleSelect(option)}
                      disabled={isAnswered}
                      className={cn(
                        'w-full text-left px-5 py-4 rounded-2xl border-3 font-medium text-base transition-all',
                        showAsCorrect && 'border-green-400 bg-green-50 text-green-700',
                        showAsWrong && 'border-red-400 bg-red-50 text-red-700',
                        !isAnswered && !isThisSelected && 'border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50',
                        !isAnswered && isThisSelected && 'border-blue-400 bg-blue-50'
                      )}
                      whileTap={!isAnswered ? { scale: 0.98 } : undefined}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={cn(
                            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0',
                            showAsCorrect
                              ? 'bg-green-500 text-white'
                              : showAsWrong
                              ? 'bg-red-500 text-white'
                              : 'bg-blue-100 text-blue-600'
                          )}
                        >
                          {showAsCorrect ? (
                            <Check size={16} />
                          ) : showAsWrong ? (
                            <X size={16} />
                          ) : (
                            String.fromCharCode(65 + idx)
                          )}
                        </span>
                        {option}
                      </span>
                    </motion.button>
                  );
                })
              )}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={cn(
                    'mt-6 rounded-2xl p-4 text-center font-bold text-lg',
                    isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  )}
                >
                  {isCorrect ? 'Excellent work!' : 'Not quite. Keep trying!'}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Next button */}
      {isAnswered && (
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <button
            onClick={handleNext}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-blue-500 text-white font-bold text-lg shadow-lg hover:bg-blue-600 transition-all"
          >
            {current + 1 >= questions.length ? 'See Results' : 'Next Question'}
            <ChevronRight size={22} />
          </button>
        </motion.div>
      )}
    </div>
  );
}
