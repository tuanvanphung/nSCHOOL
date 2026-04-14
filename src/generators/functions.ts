import { getRandomInt } from '../utils/mathUtils';

export const generateIdentifyingGraphsMedium = () => {
  const k = getRandomInt(2, 6);
  return {
    category: 'Functions',
    subCategory: 'Identifying Graphs',
    difficulty: 'medium' as const,
    text: `Which of the following equations best represents a parabola that opens downward with a vertex at (0, ${k})?`,
    options: [
      `y = x² + ${k}`,
      `y = -x² + ${k}`,
      `y = x² - ${k}`,
      `y = -x² - ${k}`,
      `y = ${k}x²`
    ],
    correctAnswer: 1,
    explanation: `A negative leading coefficient (-x²) means the parabola opens downward. The constant term +${k} shifts the vertex up to (0, ${k}).`
  };
};

export const generateTransformationsMedium = () => {
  const h = getRandomInt(2, 5);
  const k = getRandomInt(2, 5);
  return {
    category: 'Functions',
    subCategory: 'Transformations',
    difficulty: 'medium' as const,
    text: `The graph of f(x) = x² is shifted ${h} units to the right and ${k} units down. What is the equation of the new graph?`,
    options: [
      `y = (x + ${h})² - ${k}`,
      `y = (x - ${h})² + ${k}`,
      `y = (x - ${h})² - ${k}`,
      `y = (x + ${h})² + ${k}`,
      `y = x² - ${h + k}`
    ],
    correctAnswer: 2,
    explanation: `To shift a graph right by ${h}, replace x with (x - ${h}). To shift down by ${k}, subtract ${k} from the entire function. Result: y = (x - ${h})² - ${k}.`
  };
};

export const generateRangeMedium = () => {
  const k = getRandomInt(2, 8);
  return {
    category: 'Functions',
    subCategory: 'Range',
    difficulty: 'medium' as const,
    text: `What is the range of the function f(x) = x² - ${k} for all real numbers x?`,
    options: [
      `All real numbers`,
      `y ≥ 0`,
      `y ≥ -${k}`,
      `y ≤ -${k}`,
      `-${k} ≤ y ≤ ${k}`
    ],
    correctAnswer: 2,
    explanation: `Since x² is always greater than or equal to 0, the minimum value of x² - ${k} occurs when x = 0, giving f(0) = -${k}. Thus, the range is y ≥ -${k}.`
  };
};

export const generateExponentialGrowthMedium = () => {
  const start = getRandomInt(2, 8) * 100;
  return {
    category: 'Functions',
    subCategory: 'Exponential Growth',
    difficulty: 'medium' as const,
    text: `A population of bacteria starts at ${start} and doubles every hour. Which function models the population P after t hours?`,
    options: [
      `P = ${start} + 2t`,
      `P = ${start}t²`,
      `P = 2(${start})^t`,
      `P = ${start} · 2^t`,
      `P = ${start} · t²`
    ],
    correctAnswer: 3,
    explanation: `"Doubles every hour" indicates an exponential relationship where the base is 2. With an initial value of ${start}, the model is P = ${start} · 2^t.`
  };
};

export const generatePolynomialZerosMedium = () => {
  const z1 = getRandomInt(1, 3);
  const z2 = getRandomInt(4, 6);
  const z3 = getRandomInt(7, 9);
  return {
    category: 'Functions',
    subCategory: 'Polynomial Zeros',
    difficulty: 'medium' as const,
    text: `How many x-intercepts does the graph of the function f(x) = (x - ${z1})(x + ${z2})(x - ${z3}) have?`,
    options: [`1`, `2`, `3`, `4`, `0`],
    correctAnswer: 2,
    explanation: `The x-intercepts occur where f(x) = 0. Setting each factor to zero gives x = ${z1}, x = -${z2}, and x = ${z3}. There are 3 distinct real zeros, so there are 3 x-intercepts.`
  };
};

export const generateGeometricSequencesMedium = () => {
  const a1 = getRandomInt(2, 5);
  const r = getRandomInt(2, 3);
  const n = 5;
  const an = a1 * Math.pow(r, n - 1);
  return {
    category: 'Functions',
    subCategory: 'Geometric Sequences',
    difficulty: 'medium' as const,
    text: `In a geometric sequence, the first term is ${a1} and the common ratio is ${r}. What is the ${n}th term?`,
    options: [`${an / r}`, `${an - r}`, `${an + r}`, `${an}`, `${an * r}`],
    correctAnswer: 3,
    explanation: `Use the formula a_n = a_1 · r^(n-1). Here, a_5 = ${a1} · ${r}^(5-1) = ${a1} · ${r}^4 = ${a1} · ${Math.pow(r, 4)} = ${an}.`
  };
};

export const generateFunctionNotationMedium = () => {
  const a = getRandomInt(2, 5);
  const b = getRandomInt(2, 10);
  const x = getRandomInt(1, 5);
  const formatExpr = (coeff: number, constant: number) => {
    if (constant === 0) return `${coeff}x`;
    const sign = constant > 0 ? '+' : '−';
    return `${coeff}x ${sign} ${Math.abs(constant)}`;
  };
  return {
    category: 'Functions',
    subCategory: 'Notation',
    difficulty: 'medium' as const,
    text: `If f(x) = ${a}x - ${b}, what is the value of f(x + ${x})?`,
    options: [
      formatExpr(a, -b),
      formatExpr(a, a * x - b),
      formatExpr(a, -(b + x)),
      formatExpr(a, x - b),
      formatExpr(a, -(a * b))
    ],
    correctAnswer: 1,
    explanation: `Substitute (x + ${x}) for x in the function: f(x + ${x}) = ${a}(x + ${x}) - ${b} = ${a}x + ${a * x} - ${b} = ${formatExpr(a, a * x - b)}.`
  };
};

export const generateVerticalLineTestMedium = () => {
  return {
    category: 'Functions',
    subCategory: 'Vertical Line Test',
    difficulty: 'medium' as const,
    text: `Which of the following sets of ordered pairs represents a function?`,
    options: [
      `{(1, 2), (1, 3), (2, 4)}`,
      `{(0, 0), (1, 1), (1, -1)}`,
      `{(2, 5), (3, 5), (4, 10)}`,
      `{(5, 2), (5, 4), (5, 6)}`,
      `{(3, 1), (3, 2), (3, 3)}`
    ],
    correctAnswer: 2,
    explanation: `A set of ordered pairs is a function if every x-value is paired with exactly one y-value. In the correct set, the x-values 2, 3, and 4 are all unique. In other options, at least one x-value repeats with different y-values.`
  };
};
