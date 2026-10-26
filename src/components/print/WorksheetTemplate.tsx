import { BookOpen, PenLine } from 'lucide-react';
import type { VocabularyItem, Exercise } from '@/data/types';
import PrintPreview from './PrintPreview';

interface WorksheetTemplateProps {
  unitTitle: string;
  vocabulary: VocabularyItem[];
  exercises: Exercise[];
  type: 'vocabulary' | 'exercises' | 'mixed';
}

function VocabularySection({ vocabulary }: { vocabulary: VocabularyItem[] }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen size={18} className="text-blue-600" />
        <h2 className="text-lg font-extrabold text-gray-800">Vocabulary List</h2>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th className="text-left py-2 px-3 text-sm font-bold text-gray-600 w-8">#</th>
            <th className="text-left py-2 px-3 text-sm font-bold text-gray-600">Word</th>
            <th className="text-left py-2 px-3 text-sm font-bold text-gray-600">Phonetic</th>
            <th className="text-left py-2 px-3 text-sm font-bold text-gray-600">Meaning / Sentence</th>
            <th className="text-left py-2 px-3 text-sm font-bold text-gray-600 w-40">
              Write 3 times
            </th>
          </tr>
        </thead>
        <tbody>
          {vocabulary.map((word, idx) => (
            <tr key={word.id} className="border-b border-gray-200">
              <td className="py-3 px-3 text-sm text-gray-500">{idx + 1}</td>
              <td className="py-3 px-3 font-bold text-gray-800">{word.word}</td>
              <td className="py-3 px-3 text-sm text-blue-600">{word.phonetic}</td>
              <td className="py-3 px-3 text-sm text-gray-600 italic">
                {word.exampleSentence}
              </td>
              <td className="py-3 px-3">
                <div className="flex flex-col gap-1">
                  <div className="h-6 border-b border-dashed border-gray-300" />
                  <div className="h-6 border-b border-dashed border-gray-300" />
                  <div className="h-6 border-b border-dashed border-gray-300" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ExercisesSection({ exercises }: { exercises: Exercise[] }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <PenLine size={18} className="text-purple-600" />
        <h2 className="text-lg font-extrabold text-gray-800">Exercises</h2>
      </div>
      <div className="space-y-6">
        {exercises.map((exercise, idx) => (
          <div key={exercise.id} className="pb-4">
            <p className="font-bold text-gray-800 mb-2">
              {idx + 1}. {exercise.question}
            </p>

            {exercise.type === 'multiple_choice' && exercise.options && (
              <div className="ml-6 space-y-1">
                {exercise.options.map((opt, oIdx) => (
                  <p key={oIdx} className="text-sm text-gray-600">
                    {String.fromCharCode(65 + oIdx)}. {opt}
                  </p>
                ))}
              </div>
            )}

            {exercise.type === 'fill_blank' && (
              <div className="ml-6 mt-2">
                <div className="h-6 border-b border-dashed border-gray-400 w-full" />
              </div>
            )}

            {exercise.type === 'true_false' && (
              <div className="ml-6 flex gap-8 mt-2">
                <span className="text-sm text-gray-600">True ( )</span>
                <span className="text-sm text-gray-600">False ( )</span>
              </div>
            )}

            {(exercise.type === 'matching' ||
              exercise.type === 'sentence_building' ||
              exercise.type === 'word_scramble' ||
              exercise.type === 'drag_drop') && (
              <div className="ml-6 mt-2 space-y-1">
                <div className="h-6 border-b border-dashed border-gray-400 w-full" />
                <div className="h-6 border-b border-dashed border-gray-400 w-full" />
              </div>
            )}

            {(exercise.type === 'dictation' ||
              exercise.type === 'image_select' ||
              exercise.type === 'reading_comprehension') && (
              <div className="ml-6 mt-2">
                <div className="h-6 border-b border-dashed border-gray-400 w-full" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WorksheetTemplate({
  unitTitle,
  vocabulary,
  exercises,
  type,
}: WorksheetTemplateProps) {
  const showVocab = type === 'vocabulary' || type === 'mixed';
  const showExercises = type === 'exercises' || type === 'mixed';

  return (
    <PrintPreview title={`${unitTitle} - Worksheet`}>
      {/* Name & Class line */}
      <div className="flex gap-8 mb-6 text-sm text-gray-600">
        <span>
          Name: <span className="inline-block border-b border-gray-400 w-40">&nbsp;</span>
        </span>
        <span>
          Class: <span className="inline-block border-b border-gray-400 w-32">&nbsp;</span>
        </span>
        <span>
          Date: <span className="inline-block border-b border-gray-400 w-32">&nbsp;</span>
        </span>
      </div>

      {showVocab && vocabulary.length > 0 && (
        <VocabularySection vocabulary={vocabulary} />
      )}

      {showExercises && exercises.length > 0 && (
        <ExercisesSection exercises={exercises} />
      )}
    </PrintPreview>
  );
}
