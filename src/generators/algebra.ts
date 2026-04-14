import { getRandomInt, simplify } from '../utils/mathUtils';

export const generateLinearEquationEasy = () => {
  const x = getRandomInt(2, 12);
  const a_coeff = getRandomInt(2, 8);
  const b_const = getRandomInt(2, 20);
  const c_val = a_coeff * x + b_const;
  return {
    category: 'Algebra',
    subCategory: 'Linear equations',
    difficulty: 'easy' as const,
    text: `If ${a_coeff}x + ${b_const} = ${c_val}, what is the value of x?`,
    options: [`${x - 2}`, `${x - 1}`, `${x}`, `${x + 1}`, `${x + 2}`],
    correctAnswer: 2,
    explanation: `Subtract ${b_const} from both sides to get ${a_coeff}x = ${c_val - b_const}. Divide by ${a_coeff} to get x = ${x}.`
  };
};

export const generateMatricesEasy = () => {
  const m11 = getRandomInt(1, 10);
  const m12 = getRandomInt(1, 10);
  const m21 = getRandomInt(1, 10);
  const m22 = getRandomInt(1, 10);
  return {
    category: 'Algebra',
    subCategory: 'Matrices',
    difficulty: 'medium' as const,
    text: `If matrix A = [${m11} ${m12}] and matrix B = [${m21} ${m22}], what is the top-left element of A + B?`,
    options: [`${m11 + m21 - 2}`, `${m11 + m21 - 1}`, `${m11 + m21}`, `${m11 + m21 + 1}`, `${m11 + m21 + 2}`],
    correctAnswer: 2,
    explanation: `To add matrices, add the corresponding elements. The top-left element is ${m11} + ${m21} = ${m11 + m21}.`
  };
};

export const generateComplexNumbersSum = () => {
  const a1 = getRandomInt(2, 6);
  const b1 = getRandomInt(2, 6);
  const a2 = getRandomInt(2, 6);
  const b2 = getRandomInt(2, 6);
  return {
    category: 'Algebra',
    subCategory: 'Complex numbers',
    difficulty: 'medium' as const,
    text: `If i² = -1, what is the sum of (${a1} + ${b1}i) and (${a2} + ${b2}i)?`,
    options: [`${a1 + a2 - 1} + ${b1 + b2}i`, `${a1 + a2} + ${b1 + b2 - 1}i`, `${a1 + a2} + ${b1 + b2}i`, `${a1 + a2 + 1} + ${b1 + b2}i`, `${a1 + a2} + ${b1 + b2 + 1}i`],
    correctAnswer: 2,
    explanation: `Add the real parts and the imaginary parts: (${a1} + ${a2}) + (${b1} + ${b2})i = ${a1 + a2} + ${b1 + b2}i.`
  };
};

export const generateLogarithmsEasy = () => {
  const base = getRandomInt(2, 5);
  const exp = getRandomInt(2, 4);
  const val = Math.pow(base, exp);
  return {
    category: 'Algebra',
    subCategory: 'Logarithms',
    difficulty: 'medium' as const,
    text: `What is the value of log_${base}(${val})?`,
    options: [`${exp - 2}`, `${exp - 1}`, `${exp}`, `${exp + 1}`, `${exp + 2}`],
    correctAnswer: 2,
    explanation: `log_${base}(${val}) asks "what power of ${base} gives ${val}?". Since ${base}^${exp} = ${val}, the answer is ${exp}.`
  };
};

export const generateSystemsOfEquationsEasy = () => {
  const x = getRandomInt(1, 5);
  const y = getRandomInt(1, 5);
  const eq1 = x + y;
  const eq2 = x - y;
  return {
    category: 'Algebra',
    subCategory: 'Systems of equations',
    difficulty: 'medium' as const,
    text: `If x + y = ${eq1} and x - y = ${eq2}, what is the value of x?`,
    options: [`${x - 2}`, `${x - 1}`, `${x}`, `${x + 1}`, `${x + 2}`],
    correctAnswer: 2,
    explanation: `Adding the two equations gives 2x = ${eq1 + eq2}, so x = ${(eq1 + eq2) / 2} = ${x}.`
  };
};

export const generateFunctionsEasy = () => {
  const a = getRandomInt(2, 5);
  const b = getRandomInt(1, 5);
  const x = getRandomInt(2, 5);
  const ans = a * x * x + b;
  return {
    category: 'Algebra',
    subCategory: 'Functions',
    difficulty: 'medium' as const,
    text: `If f(x) = ${a}x² + ${b}, what is the value of f(${x})?`,
    options: [`${ans - 10}`, `${ans - 5}`, `${ans}`, `${ans + 5}`, `${ans + 10}`],
    correctAnswer: 2,
    explanation: `Substitute ${x} for x: f(${x}) = ${a}(${x})² + ${b} = ${a}(${x * x}) + ${b} = ${a * x * x} + ${b} = ${ans}.`
  };
};

export const generateExponentsEasy = () => {
  const base = getRandomInt(2, 5);
  const exp1 = getRandomInt(3, 8);
  const exp2 = getRandomInt(2, 5);
  return {
    category: 'Algebra',
    subCategory: 'Exponents',
    difficulty: 'medium' as const,
    text: `Which of the following is equivalent to (${base}^${exp1}) / (${base}^${exp2})?`,
    options: [`${base}^${exp1 + exp2}`, `${base}^${exp1 * exp2}`, `${base}^${exp1 - exp2}`, `${base}^${Math.abs(exp1 - exp2) + 1}`, `${base * 2}^${exp1 - exp2}`],
    correctAnswer: 2,
    explanation: `When dividing with the same base, subtract the exponents: ${exp1} - ${exp2} = ${exp1 - exp2}. So, ${base}^${exp1 - exp2}.`
  };
};

export const generateQuadraticsFactoring = () => {
  let r1, r2;
  do {
    r1 = getRandomInt(2, 5);
    r2 = getRandomInt(2, 5);
  } while (r1 === r2);
  const b = r1 + r2;
  const c = r1 * r2;
  return {
    category: 'Algebra',
    subCategory: 'Quadratics',
    difficulty: 'medium' as const,
    text: `Which of the following is the factored form of x² + ${b}x + ${c}?`,
    options: [`(x + ${r1 - 1})(x + ${r2 + 1})`, `(x - ${r1})(x - ${r2})`, `(x + ${r1})(x + ${r2})`, `(x + ${b})(x + ${c})`, `(x + ${c})(x + 1)`],
    correctAnswer: 2,
    explanation: `We need two numbers that multiply to ${c} and add to ${b}. Those numbers are ${r1} and ${r2}. So, (x + ${r1})(x + ${r2}).`
  };
};

export const generateAbsoluteValueEasy = () => {
  const ans = getRandomInt(3, 10);
  const val = getRandomInt(5, 15);
  return {
    category: 'Algebra',
    subCategory: 'Absolute value',
    difficulty: 'medium' as const,
    text: `If |x - ${ans}| = ${val}, what is the positive value of x?`,
    options: [`${ans + val - 2}`, `${ans + val - 1}`, `${ans + val}`, `${ans + val + 1}`, `${ans + val + 2}`],
    correctAnswer: 2,
    explanation: `x - ${ans} = ${val} or x - ${ans} = -${val}. The positive solution is x = ${val} + ${ans} = ${ans + val}.`
  };
};

export const generateLinearEquationMedium = () => {
  let x, den, a, b;
  do {
    x = getRandomInt(2, 8);
    den = getRandomInt(2, 5);
    a = getRandomInt(2, 6);
    b = getRandomInt(1, 10);
  } while ((a * x) % den !== 0);
  const c = (a * x) / den + b;
  return {
    category: 'Algebra',
    subCategory: 'Linear equations',
    difficulty: 'medium' as const,
    text: `If (${a}x / ${den}) + ${b} = ${c}, what is the value of x?`,
    options: [`${x - den}`, `${x - 1}`, `${x}`, `${x + 1}`, `${x + den}`],
    correctAnswer: 2,
    explanation: `Subtract ${b}: (${a}x / ${den}) = ${c - b}. Multiply by ${den}: ${a}x = ${(c - b) * den}. Divide by ${a}: x = ${x}.`
  };
};

export const generateInequalitiesMedium = () => {
  const a = -getRandomInt(2, 5);
  const b = getRandomInt(2, 10);
  const x = getRandomInt(2, 6);
  const c = a * x + b;
  return {
    category: 'Algebra',
    subCategory: 'Inequalities',
    difficulty: 'medium' as const,
    text: `Solve the inequality: ${a}x + ${b} < ${c}`,
    options: [`x < ${x}`, `x > ${x}`, `x < ${-x}`, `x > ${-x}`, `x < ${x + b}`],
    correctAnswer: 1,
    explanation: `Subtract ${b}: ${a}x < ${c - b}. Divide by ${a} and flip the inequality sign (since ${a} is negative): x > ${x}.`
  };
};

export const generateRationalExpressionsEasy = () => {
  const a = getRandomInt(2, 5);
  const b = getRandomInt(1, 5);
  return {
    category: 'Algebra',
    subCategory: 'Rational expressions',
    difficulty: 'medium' as const,
    text: `Simplify the expression: (${a}x² + ${a * b}x) / (${a}x)`,
    options: [`x + ${b}`, `x² + ${b}`, `${a}x + ${b}`, `x + ${a * b}`, `x`],
    correctAnswer: 0,
    explanation: `Factor the numerator: ${a}x(x + ${b}). Divide by ${a}x to get x + ${b}.`
  };
};

export const generateQuadraticsHard = () => {
  let r1, r2;
  do {
    r1 = getRandomInt(2, 6);
    r2 = -getRandomInt(2, 6);
  } while (r1 === Math.abs(r2));
  const bCoeff = -(r1 + r2);
  const cCoeff = r1 * r2;
  
  const bStr = bCoeff === 0 ? '' 
    : bCoeff === 1 ? '+ x' 
    : bCoeff === -1 ? '- x' 
    : bCoeff > 0 ? `+ ${bCoeff}x` 
    : `- ${Math.abs(bCoeff)}x`;
  const cStr = cCoeff === 0 ? '' 
    : cCoeff > 0 ? `+ ${cCoeff}` 
    : `- ${Math.abs(cCoeff)}`;
  
  return {
    category: 'Algebra',
    subCategory: 'Quadratics',
    difficulty: 'hard' as const,
    text: `What are the solutions to the equation x² ${bStr} ${cStr} = 0?`,
    options: [
      `x = ${-r1}, x = ${-r2}`,
      `x = ${r1}, x = ${-r2}`,
      `x = ${r1}, x = ${r2}`,
      `x = ${-r1}, x = ${r2}`,
      `x = ${r1 + 1}, x = ${r2 - 1}`
    ],
    correctAnswer: 2,
    explanation: `The equation factors to (x - ${r1})(x + ${Math.abs(r2)}) = 0. The solutions are x = ${r1} and x = ${r2}.`
  };
};

export const generateQuadraticsVertex = () => {
  let h, k, a;
  do {
    h = getRandomInt(1, 5);
    k = getRandomInt(1, 5);
    a = getRandomInt(2, 4);
  } while (h === a);
  return {
    category: 'Algebra',
    subCategory: 'Quadratics',
    difficulty: 'hard' as const,
    text: `What is the vertex of the parabola given by the equation y = ${a}(x - ${h})² + ${k}?`,
    options: [`(-${h}, ${k})`, `(${h}, -${k})`, `(${h}, ${k})`, `(-${h}, -${k})`, `(${a}, ${k})`],
    correctAnswer: 2,
    explanation: `The vertex form of a parabola is y = a(x - h)² + k, where (h, k) is the vertex. Here, the vertex is (${h}, ${k}).`
  };
};

export const generateFunctionsComposition = () => {
  let a, b, c, x;
  do {
    a = getRandomInt(2, 4);
    b = getRandomInt(1, 5);
    c = getRandomInt(2, 4);
    x = getRandomInt(1, 3);
  } while (a === c);
  const gx = c * x;
  const fgx = a * gx + b;
  return {
    category: 'Algebra',
    subCategory: 'Functions',
    difficulty: 'hard' as const,
    text: `If f(x) = ${a}x + ${b} and g(x) = ${c}x, what is the value of f(g(${x}))?`,
    options: [`${fgx - a}`, `${fgx - c}`, `${fgx}`, `${fgx + c}`, `${fgx + a}`],
    correctAnswer: 2,
    explanation: `First find g(${x}) = ${c}(${x}) = ${gx}. Then find f(${gx}) = ${a}(${gx}) + ${b} = ${fgx}.`
  };
};

export const generateFunctionsInverse = () => {
  const a = getRandomInt(2, 5);
  const b = getRandomInt(1, 8);
  return {
    category: 'Algebra',
    subCategory: 'Functions',
    difficulty: 'hard' as const,
    text: `If f(x) = ${a}x + ${b}, what is the inverse function, f⁻¹(x)?`,
    options: [`(x + ${b}) / ${a}`, `(x - ${b}) / ${a}`, `${a}x - ${b}`, `(x / ${a}) - ${b}`, `x / ${a} + ${b}`],
    correctAnswer: 1,
    explanation: `Let y = ${a}x + ${b}. Swap x and y: x = ${a}y + ${b}. Solve for y: y = (x - ${b}) / ${a}.`
  };
};

export const generateSystemsOfEquationsHard = () => {
  const x = getRandomInt(2, 5);
  const y = getRandomInt(2, 5);
  const a = getRandomInt(2, 4);
  const b = y - a * x;
  const c = getRandomInt(2, 4);
  const d = getRandomInt(2, 4);
  const e = c * x + d * y;
  return {
    category: 'Algebra',
    subCategory: 'Systems of equations',
    difficulty: 'hard' as const,
    text: `Given the system of equations:\ny = ${a}x ${b >= 0 ? '+' : ''}${b}\n${c}x + ${d}y = ${e}\nWhat is the value of y?`,
    options: [`${y - 2}`, `${y - 1}`, `${y}`, `${y + 1}`, `${y + 2}`],
    correctAnswer: 2,
    explanation: `Substitute y into the second equation: ${c}x + ${d}(${a}x ${b >= 0 ? '+' : ''}${b}) = ${e}. Solve for x to get x = ${x}. Then y = ${a}(${x}) ${b >= 0 ? '+' : ''}${b} = ${y}.`
  };
};

export const generateComplexNumbersProduct = () => {
  const a = getRandomInt(2, 5);
  const b = getRandomInt(2, 5);
  const c = getRandomInt(2, 5);
  const d = getRandomInt(2, 5);
  const real = a * c - b * d;
  const imag = a * d + b * c;
  const wrongReal = a * c + b * d;
  return {
    category: 'Algebra',
    subCategory: 'Complex numbers',
    difficulty: 'hard' as const,
    text: `If i² = -1, what is the product of (${a} + ${b}i) and (${c} + ${d}i)?`,
    options: [`${real} + ${imag}i`, `${wrongReal} + ${imag}i`, `${a*c} + ${b*d}i`, `${a*c} - ${b*d}i`, `${real} - ${imag}i`],
    correctAnswer: 0,
    explanation: `FOIL: (${a})(${c}) + (${a})(${d}i) + (${b}i)(${c}) + (${b}i)(${d}i) = ${a*c} + ${a*d}i + ${b*c}i + ${b*d}i². Since i² = -1, this is ${a*c} - ${b*d} + (${a*d + b*c})i = ${real} + ${imag}i.`
  };
};

export const generateLogarithmsHard = () => {
  const x_val = getRandomInt(2, 5);
  const y_val = getRandomInt(2, 5);
  return {
    category: 'Algebra',
    subCategory: 'Logarithms',
    difficulty: 'hard' as const,
    text: `Which of the following is equivalent to log(x^${x_val}) + log(y^${y_val})?`,
    options: [
      `log(x^${x_val} + y^${y_val})`, 
      `log(x^${x_val} * y^${y_val})`, 
      `log(x^${x_val} / y^${y_val})`, 
      `log(${x_val}x * ${y_val}y)`, 
      `log(x + y)^${x_val + y_val}`
    ],
    correctAnswer: 1,
    explanation: `By logarithm properties, log(a) + log(b) = log(a * b). Therefore, log(x^${x_val}) + log(y^${y_val}) = log(x^${x_val} * y^${y_val}).`
  };
};

export const generateRadicalsEasy = () => {
  const prime = [2, 3, 5, 6, 7, 10][getRandomInt(0, 5)];
  const square = [4, 9, 16, 25, 36][getRandomInt(0, 4)];
  const val = prime * square;
  const rootSquare = Math.sqrt(square);
  return {
    category: 'Algebra',
    subCategory: 'Radicals',
    difficulty: 'hard' as const,
    text: `Simplify the radical expression: √${val}`,
    options: [`${rootSquare}√${prime}`, `${prime}√${rootSquare}`, `√${val}`, `${square}√${prime}`, `${rootSquare * prime}`],
    correctAnswer: 0,
    explanation: `Factor out the largest perfect square: √${val} = √(${square} × ${prime}) = √${square} × √${prime} = ${rootSquare}√${prime}.`
  };
};

export const generateQuadraticFormula = () => {
  const a = getRandomInt(2, 3);
  const b = -getRandomInt(1, 5);
  const c = -getRandomInt(2, 8);
  const disc = b * b - 4 * a * c;
  const bStr = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
  const cStr = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
  const negB = -b;
  return {
    category: 'Algebra',
    subCategory: 'Quadratic Formula',
    difficulty: 'hard' as const,
    text: `What are the solutions for x in the equation ${a}x² ${bStr}x ${cStr} = 0?`,
    options: [
      `(${negB} ± √${disc}) / ${2 * a}`,
      `(${negB} ± √${disc - 18}) / ${2 * a}`,
      `(${-negB} ± √${disc}) / ${2 * a}`,
      `(${negB} ± √${disc + 10}) / ${2 * a}`,
      `(${-negB} ± √${disc - 18}) / ${2 * a}`
    ],
    correctAnswer: 0,
    explanation: `Use the quadratic formula x = [-b ± √(b² - 4ac)] / 2a. Here a=${a}, b=${b}, c=${c}. x = [${negB} ± √(${b*b} + ${-4*a*c})] / ${2*a} = (${negB} ± √${disc}) / ${2*a}.`
  };
};

export const generateDomainHard = () => {
  const b = [4, 9, 16, 25][getRandomInt(0, 3)];
  const root = Math.sqrt(b);
  return {
    category: 'Algebra',
    subCategory: 'Domain',
    difficulty: 'hard' as const,
    text: `What is the domain of the function f(x) = 1 / (x² - ${b})?`,
    options: [
      `All real numbers`,
      `x > ${root}`,
      `x ≠ ${root} and x ≠ -${root}`,
      `x ≥ 0`,
      `x ≠ ${b}`
    ],
    correctAnswer: 2,
    explanation: `The domain of a rational function excludes values that make the denominator zero. x² - ${b} = 0 when x = ${root} or x = -${root}. So the domain is all real numbers except x = ±${root}.`
  };
};

export const generatePiecewiseFunctions = () => {
  const val1 = getRandomInt(-6, -2);
  const val2 = getRandomInt(2, 6);
  const ans1 = val1 * val1;
  const ans2 = 2 * val2 + 1;
  const total = ans1 + ans2;
  return {
    category: 'Algebra',
    subCategory: 'Piecewise Functions',
    difficulty: 'hard' as const,
    text: `If f(x) = { x² for x < 0; 2x + 1 for x ≥ 0 }, what is the value of f(${val1}) + f(${val2})?`,
    options: [`${total - 5}`, `${total - 2}`, `${total}`, `${total + 2}`, `${total + 5}`],
    correctAnswer: 2,
    explanation: `For f(${val1}), since ${val1} < 0, use x²: (${val1})² = ${ans1}. For f(${val2}), since ${val2} ≥ 0, use 2x + 1: 2(${val2}) + 1 = ${ans2}. Total = ${ans1} + ${ans2} = ${total}.`
  };
};

export const generateSequencesMedium = () => {
  const a1 = 7;
  const d = 4;
  const n = 20;
  const an = a1 + (n - 1) * d;
  return {
    category: 'Algebra',
    subCategory: 'Sequences',
    difficulty: 'medium' as const,
    text: `In an arithmetic sequence, the first term is ${a1} and the common difference is ${d}. What is the ${n}th term of the sequence?`,
    options: [`${an - 8}`, `${an - 4}`, `${an}`, `${an + 4}`, `${an + 8}`],
    correctAnswer: 2,
    explanation: `Use the formula a_n = a_1 + (n - 1)d. Here, a_20 = ${a1} + (20 - 1)(${d}) = ${a1} + 19(${d}) = ${a1} + 76 = ${an}.`
  };
};
