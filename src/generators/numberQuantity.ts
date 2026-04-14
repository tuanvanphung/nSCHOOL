import { getRandomInt, gcd } from '../utils/mathUtils';

export const generateRemaindersHard = () => {
  const base = 7;
  const exp = getRandomInt(50, 60);
  const mod = 5;
  const cycle = [1, 2, 4, 3];
  const ans = cycle[exp % 4];
  return {
    category: 'Number & Quantity',
    subCategory: 'Remainders',
    difficulty: 'hard' as const,
    text: `What is the remainder when ${base}^{${exp}} is divided by ${mod}?`,
    options: [`0`, `1`, `2`, `3`, `4`],
    correctAnswer: [0, 1, 2, 3, 4].indexOf(ans),
    explanation: `Look for a pattern in the remainders of ${base}^n divided by ${mod}: 7^1=7 (rem 2), 7^2=49 (rem 4), 7^3=343 (rem 3), 7^4=2401 (rem 1). The pattern 2, 4, 3, 1 repeats every 4 powers. Since ${exp} divided by 4 has a remainder of ${exp % 4}, the remainder is ${ans}.`
  };
};

export const generateVectorsMedium = () => {
  const triples = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]];
  const t = triples[getRandomInt(0, triples.length - 1)];
  return {
    category: 'Number & Quantity',
    subCategory: 'Vectors',
    difficulty: 'medium' as const,
    text: `Vector u = ⟨${t[0]}, ${t[1]}⟩. What is the magnitude of vector u?`,
    options: [`${t[0]}`, `${t[1]}`, `${t[2]}`, `${t[0] + t[1]}`, `${t[0] * t[1]}`],
    correctAnswer: 2,
    explanation: `|u| = √(${t[0]}² + ${t[1]}²) = √(${t[0] * t[0]} + ${t[1] * t[1]}) = √${t[2] * t[2]} = ${t[2]}.`
  };
};

export const generateMatricesMultiplicationMedium = () => {
  return {
    category: 'Number & Quantity',
    subCategory: 'Matrices',
    difficulty: 'medium' as const,
    text: `If A = [[2, 1], [0, 4]] and B = [[3], [5]], what is the result of the matrix multiplication A × B?`,
    options: [
      `[[11], [20]]`,
      `[[6], [0]]`,
      `[[8], [20]]`,
      `[[11], [4]]`,
      `[[7], [20]]`
    ],
    correctAnswer: 0,
    explanation: `Multiply rows by columns: Row 1: (2×3) + (1×5) = 6 + 5 = 11. Row 2: (0×3) + (4×5) = 0 + 20 = 20. Result is [[11], [20]].`
  };
};

export const generateRationalExponentsMedium = () => {
  return {
    category: 'Number & Quantity',
    subCategory: 'Rational Exponents',
    difficulty: 'medium' as const,
    text: `Which of the following is equivalent to x^(2/3)?`,
    options: [
      `x² · x³`,
      `√(x³)`,
      `∛(x²)`,
      `x² / 3`,
      `2 / (3x)`
    ],
    correctAnswer: 2,
    explanation: `In a rational exponent m/n, the denominator n is the index of the radical and the numerator m is the power. So x^(2/3) = ∛(x²).`
  };
};

export const generateNegativeExponentsEasy = () => {
  const a = getRandomInt(2, 5);
  return {
    category: 'Number & Quantity',
    subCategory: 'Negative Exponents',
    difficulty: 'easy' as const,
    text: `Which of the following is equivalent to ${a}x⁻²?`,
    options: [
      `-${a}x²`,
      `${a} / x²`,
      `1 / (${a}x²)`,
      `-${a} / x²`,
      `${a}x²`
    ],
    correctAnswer: 1,
    explanation: `A negative exponent indicates a reciprocal: x⁻ⁿ = 1/xⁿ. Thus, ${a}x⁻² = ${a} · (1/x²) = ${a}/x².`
  };
};

export const generateLCMGCFEasy = () => {
  const pairs = [[12, 18, 36], [8, 12, 24], [15, 20, 60], [6, 14, 42], [9, 12, 36]];
  const p = pairs[getRandomInt(0, pairs.length - 1)];
  return {
    category: 'Number & Quantity',
    subCategory: 'LCM / GCF',
    difficulty: 'easy' as const,
    text: `What is the least common multiple (LCM) of ${p[0]} and ${p[1]}?`,
    options: [`${gcd(p[0], p[1])}`, `${p[1]}`, `${p[2] - 12}`, `${p[2]}`, `${p[0] * p[1]}`],
    correctAnswer: 3,
    explanation: `The LCM of ${p[0]} and ${p[1]} is ${p[2]}.`
  };
};
