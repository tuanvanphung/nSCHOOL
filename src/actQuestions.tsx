import { Question } from './questions';
import { generators } from './generators';
import { ensureUniqueOptions, shuffleOptions } from './utils/questionUtils';

export const generateACTQuestions = (): Question[] => {
  const qs: Question[] = generators.map((gen, i) => {
    const q = gen();
    const uniqueOptions = ensureUniqueOptions(q.options, q.correctAnswer);
    const { shuffled, newCorrectIdx } = shuffleOptions(uniqueOptions, q.correctAnswer);

    return {
      id: i + 1,
      text: q.text,
      options: shuffled,
      correctAnswer: newCorrectIdx,
      explanation: q.explanation,
      diagram: (q as any).diagram,
      category: q.category,
      subCategory: q.subCategory,
      difficulty: q.difficulty
    };
  });
  
  const difficultyOrder = { easy: 0, medium: 1, hard: 2 };
  return qs.sort((a, b) => 
    difficultyOrder[a.difficulty || 'medium'] - difficultyOrder[b.difficulty || 'medium']
  );
};
