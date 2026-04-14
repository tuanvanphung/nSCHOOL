import { describe, it, expect, test } from 'vitest';
import { generateACTQuestions } from '../src/actQuestions';

describe('ACT Question Generator', () => {
  const questions = generateACTQuestions();

  test('should generate 120 questions', () => {
    expect(questions.length).toBe(120);
  });

  test('all questions should have required fields', () => {
    questions.forEach((q, index) => {
      expect(q.text).toBeDefined();
      expect(q.text.length).toBeGreaterThan(0);
      expect(q.options).toBeDefined();
      expect(q.options.length).toBe(5);
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThan(5);
      expect(q.explanation).toBeDefined();
      expect(q.category).toBeDefined();
      expect(q.subCategory).toBeDefined();
      expect(q.difficulty).toBeDefined();
    });
  });

  test('all options should be unique and valid', () => {
    // Run 100 times to catch edge cases in randomization
    for (let i = 0; i < 100; i++) {
      const qs = generateACTQuestions();
      qs.forEach((q, qIdx) => {
        const trimmedOptions = q.options.map(opt => opt.trim());
        const uniqueOptions = new Set(trimmedOptions);
        
        if (uniqueOptions.size !== 5) {
          console.error(`Duplicate options in question ${q.id} (Case ${qIdx}):`, q.options);
        }
        expect(uniqueOptions.size).toBe(5);

        q.options.forEach(opt => {
          expect(opt).not.toContain('NaN');
          expect(opt).not.toContain('undefined');
          expect(opt).not.toContain('Infinity');
        });
      });
    }
  });
});
