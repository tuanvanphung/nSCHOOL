import { getRandomInt, simplify } from '../utils/mathUtils';

export const generatePercentagesEasy = () => {
  const percent = getRandomInt(1, 9) * 10;
  const whole = getRandomInt(2, 10) * 10;
  const part = (percent * whole) / 100;
  return {
    category: 'Arithmetic',
    subCategory: 'Percentages',
    difficulty: 'easy' as const,
    text: `What is ${percent}% of ${whole}?`,
    options: [`${part / 10}`, `${part - 10}`, `${part}`, `${part + 10}`, `${percent + whole}`],
    correctAnswer: 2,
    explanation: `${percent}% = ${percent / 100}. ${percent / 100} × ${whole} = ${part}.`
  };
};

export const generateRatiosMedium = () => {
  const r1 = getRandomInt(2, 5);
  const r2 = getRandomInt(3, 7);
  const mult = getRandomInt(2, 6);
  const total = (r1 + r2) * mult;
  return {
    category: 'Arithmetic',
    subCategory: 'Ratios',
    difficulty: 'medium' as const,
    text: `The ratio of boys to girls in a class is ${r1}:${r2}. If there are ${total} students in total, how many boys are there?`,
    options: [`${r1 * mult - 2}`, `${r1 * mult - 1}`, `${r1 * mult}`, `${r1 * mult + 1}`, `${r1 * mult + 2}`],
    correctAnswer: 2,
    explanation: `The total ratio parts are ${r1} + ${r2} = ${r1 + r2}. Each part is ${total} / ${r1 + r2} = ${mult}. The number of boys is ${r1} × ${mult} = ${r1 * mult}.`
  };
};

export const generateScientificNotationEasy = () => {
  const coeff = getRandomInt(2, 9);
  const exp = getRandomInt(3, 6);
  const val = coeff * Math.pow(10, exp);
  return {
    category: 'Arithmetic',
    subCategory: 'Scientific notation',
    difficulty: 'easy' as const,
    text: `How is the number ${val} written in scientific notation?`,
    options: [`${coeff} × 10^${exp - 1}`, `${coeff * 10} × 10^${exp - 1}`, `${coeff} × 10^${exp}`, `${coeff} × 10^${exp + 1}`, `${coeff / 10} × 10^${exp + 1}`],
    correctAnswer: 2,
    explanation: `Move the decimal point ${exp} places to the left to get ${coeff}. This gives ${coeff} × 10^${exp}.`
  };
};

export const generatePercentChangeMedium = () => {
  const oldVal = 80;
  const newVal = 92;
  const diff = newVal - oldVal;
  const pct = (diff / oldVal) * 100;
  return {
    category: 'Arithmetic',
    subCategory: 'Percent Change',
    difficulty: 'medium' as const,
    text: `A price increases from $${oldVal} to $${newVal}. What is the percent increase?`,
    options: [`18%`, `${pct - 5}%`, `${pct}%`, `${pct + 5}%`, `25%`],
    correctAnswer: 2,
    explanation: `Percent Increase = (Change / Original) × 100. Change = ${newVal} - ${oldVal} = ${diff}. Percent = (${diff} / ${oldVal}) × 100 = 0.15 × 100 = ${pct}%.`
  };
};

export const generateUnitRatesEasy = () => {
  const gal = 3.5;
  const cost = 14;
  const quarts = gal * 4;
  const perQuart = cost / quarts;
  return {
    category: 'Arithmetic',
    subCategory: 'Unit Rates',
    difficulty: 'easy' as const,
    text: `If ${gal} gallons of milk cost $${cost}, what is the cost per quart? (Note: 1 gallon = 4 quarts)`,
    options: [`$${perQuart - 0.25}`, `$${perQuart}`, `$${perQuart + 0.25}`, `$${cost / gal}`, `$${cost * 4 / gal}`],
    correctAnswer: 1,
    explanation: `First, convert gallons to quarts: ${gal} gallons × 4 = ${quarts} quarts. Then divide the total cost by the number of quarts: $${cost} / ${quarts} = $${perQuart}.`
  };
};

export const generateOrderOfOperations1 = () => {
  const a = getRandomInt(2, 5);
  const b = getRandomInt(3, 6);
  const c = getRandomInt(2, 4);
  const d = getRandomInt(1, 5);
  const ans = a + b * c - d;
  return {
    category: 'Arithmetic',
    subCategory: 'Order of Operations',
    difficulty: 'easy' as const,
    text: `What is the value of ${a} + ${b} × ${c} - ${d}?`,
    options: [`${(a + b) * c - d}`, `${a + b * (c - d)}`, `${ans}`, `${a + b * c + d}`, `${(a + b) * (c - d)}`],
    correctAnswer: 2,
    explanation: `Following PEMDAS, multiply first: ${b} × ${c} = ${b * c}. Then perform addition and subtraction from left to right: ${a} + ${b * c} - ${d} = ${a + b * c} - ${d} = ${ans}.`
  };
};

export const generateOrderOfOperations2 = () => {
  const a = getRandomInt(2, 4);
  const b = getRandomInt(2, 4);
  const c = getRandomInt(2, 5);
  const d = getRandomInt(2, 4);
  const ans = Math.pow(a + b, 2) - c * d;
  return {
    category: 'Arithmetic',
    subCategory: 'Order of Operations',
    difficulty: 'easy' as const,
    text: `What is the value of (${a} + ${b})² - ${c} × ${d}?`,
    options: [`${ans - 10}`, `${ans + 5}`, `${ans}`, `${Math.pow(a, 2) + Math.pow(b, 2) - c * d}`, `${(a + b) * (2 - c * d)}`],
    correctAnswer: 2,
    explanation: `Parentheses first: (${a} + ${b}) = ${a + b}. Exponent next: ${a + b}² = ${Math.pow(a + b, 2)}. Multiplication next: ${c} × ${d} = ${c * d}. Finally, subtract: ${Math.pow(a + b, 2)} - ${c * d} = ${ans}.`
  };
};

export const generateOrderOfOperations3 = () => {
  let a, b, c, d, ans;
  const e = 2;
  do {
    a = getRandomInt(2, 5);
    b = getRandomInt(2, 4);
    c = getRandomInt(6, 10);
    d = getRandomInt(1, 5);
    ans = a * (b + Math.pow(c - d, 2)) / e;
  } while (ans % 1 !== 0);
  return {
    category: 'Arithmetic',
    subCategory: 'Order of Operations',
    difficulty: 'easy' as const,
    text: `Evaluate: ${a} × [${b} + (${c} - ${d})²] ÷ ${e}`,
    options: [`${ans - 10}`, `${ans + 10}`, `${ans}`, `${ans * 2}`, `${ans / 2}`],
    correctAnswer: 2,
    explanation: `Work from the innermost parentheses: (${c} - ${d}) = ${c - d}. Then the exponent: ${c - d}² = ${(c - d) * (c - d)}. Then the brackets: ${b} + ${(c - d) * (c - d)} = ${b + (c - d) * (c - d)}. Finally, multiply and divide from left to right: ${a} × ${b + (c - d) * (c - d)} ÷ ${e} = ${a * (b + (c - d) * (c - d))} ÷ ${e} = ${ans}.`
  };
};

export const generateOrderOfOperations4 = () => {
  const a = getRandomInt(2, 6);
  const b = getRandomInt(2, 6);
  const c = getRandomInt(2, 4);
  const d = getRandomInt(5, 10);
  const e = getRandomInt(1, 4);
  const num = a + b * c;
  const den = d - e;
  const ans = simplify(num, den);
  return {
    category: 'Arithmetic',
    subCategory: 'Order of Operations',
    difficulty: 'easy' as const,
    text: `What is the value of (${a} + ${b} × ${c}) / (${d} - ${e})?`,
    options: [
      `${simplify(num + 2, den)}`,
      `${simplify(num, den + 1)}`,
      `${ans}`,
      `${simplify(num * 2, den)}`,
      `${num}`
    ],
    correctAnswer: 2,
    explanation: `Numerator first: ${a} + (${b} × ${c}) = ${a} + ${b * c} = ${num}. Denominator next: ${d} - ${e} = ${den}. Result is ${num}/${den} = ${ans}.`
  };
};
