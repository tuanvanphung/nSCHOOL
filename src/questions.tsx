import React from 'react';

export interface Question {
  id: number;
  text: string;
  type?: 'multiple-choice' | 'multi-select' | 'free-response';
  options?: string[];
  correctAnswer?: number;
  correctAnswers?: number[];
  correctValue?: string;
  explanation: string;
  diagram?: React.ReactNode;
  category?: string;
  subCategory?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const gcd = (a: number, b: number): number => {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
};

const simplifyFraction = (num: number, den: number): string => {
  const common = gcd(num, den);
  const n = num / common;
  const d = den / common;
  return d === 1 ? `${n}` : `${n}/${d}`;
};

const formatPercent = (value: number, decimals = 1): string => {
  return `${parseFloat(value.toFixed(decimals))}%`;
};

const ensureUniqueOptions = (options: string[], correctIndex: number): string[] => {
  const seen = new Set<string>();
  const result: string[] = [];
  
  options.forEach((opt, i) => {
    let currentOpt = opt;
    let attempt = 1;
    while (seen.has(currentOpt)) {
      if (i === correctIndex) {
        // Should not happen if logic is correct, but for safety:
        // If correct answer is a duplicate, we must change the OTHER one.
        // But here we just append a space or something to distractors.
        currentOpt = opt + " "; 
      } else {
        // Distractor is duplicate, modify it
        if (opt.includes('$')) {
          const val = parseFloat(opt.replace('$', ''));
          currentOpt = `$${(val + attempt).toFixed(opt.includes('.') ? 2 : 0)}`;
        } else if (opt.includes('%')) {
          const val = parseFloat(opt.replace('%', ''));
          currentOpt = `${(val + attempt).toFixed(1)}%`;
        } else if (opt.includes('/')) {
          const parts = opt.split('/');
          currentOpt = `${parseInt(parts[0]) + attempt}/${parts[1]}`;
        } else if (!isNaN(parseFloat(opt))) {
          currentOpt = `${parseFloat(opt) + attempt}`;
        } else {
          currentOpt = opt + ` (${attempt})`;
        }
      }
      attempt++;
    }
    result.push(currentOpt);
    seen.add(currentOpt);
  });
  
  return result;
};

/** Ensure term1 and term2 are coprime for clean factoring questions */
const getCoprimeInts = (min1: number, max1: number, min2: number, max2: number): [number, number] => {
  let a: number, b: number;
  do {
    a = getRandomInt(min1, max1);
    b = getRandomInt(min2, max2);
  } while (gcd(a, b) !== 1);
  return [a, b];
};

/** Ensure dividend is divisible by divisor for clean money problems */
const getDivisibleInt = (min: number, max: number, divisor: number): number => {
  const candidates = [];
  for (let i = min; i <= max; i++) {
    if (i % divisor === 0) candidates.push(i);
  }
  return candidates[Math.floor(Math.random() * candidates.length)];
};

/** Generate a unique SVG marker ID */
let markerCounter = 0;
const getMarkerId = (prefix = 'arrow') => `${prefix}-${++markerCounter}`;

/** Constrain a value to fit within an SVG viewBox range */
const constrainToViewBox = (min: number, max: number, padding = 2): [number, number] => {
  return [min + padding, max - padding];
};

export const generateQuestions = (): Question[] => {
  const qs: Question[] = [];

  // 1. Ratios
  const r1 = getRandomInt(2, 8);
  const r2 = getRandomInt(3, 12);
  const mult = getRandomInt(3, 15);
  const flour = r1 * mult;
  const sugar = r2 * mult;
  qs.push({
    id: 1,
    text: `A recipe calls for ${r1} cups of flour for every ${r2} cups of sugar. If you use ${flour} cups of flour, how many cups of sugar do you need?`,
    diagram: (
      <svg width="100%" height="120" viewBox="0 0 200 60" className="mx-auto max-w-sm">
        <text x="100" y="15" fontSize="10" textAnchor="middle" fill="#64748b" fontWeight="bold">Recipe Ratio</text>
        
        {/* Flour */}
        <text x="50" y="35" fontSize="10" textAnchor="middle" fill="#eab308" fontWeight="bold">Flour</text>
        <rect x="20" y="40" width="60" height="15" fill="#fef08a" stroke="#eab308" rx="2" />
        <text x="50" y="51" fontSize="10" textAnchor="middle" fill="#ca8a04">{r1} cups</text>
        
        <text x="100" y="48" fontSize="12" textAnchor="middle" fill="#64748b" fontWeight="bold">:</text>
        
        {/* Sugar */}
        <text x="150" y="35" fontSize="10" textAnchor="middle" fill="#3b82f6" fontWeight="bold">Sugar</text>
        <rect x="120" y="40" width="60" height="15" fill="#eff6ff" stroke="#3b82f6" rx="2" />
        <text x="150" y="51" fontSize="10" textAnchor="middle" fill="#2563eb">{r2} cups</text>
      </svg>
    ),
    options: [`${sugar - 2} cups`, `${sugar} cups`, `${sugar + 3} cups`, `${sugar * 2} cups`],
    correctAnswer: 1,
    explanation: `The ratio is ${r1}:${r2}. Since flour is ${flour} (${r1} * ${mult}), then sugar must be ${r2} * ${mult} = ${sugar}.`
  });

  // 2. Expressions (Multi-Select)
  const a = getRandomInt(2, 12);
  const b = getRandomInt(2, 15);
  const c = getRandomInt(1, 10);
  qs.push({
    id: 2,
    type: 'multi-select',
    text: `Which expressions are equivalent to ${a}(x + ${b}) - ${c}? Select ALL that apply.`,
    options: [
      `${a}x + ${a * b - c}`, 
      `${a}x + ${a * b} - ${c}`, 
      `${a}x + ${b - c}`, 
      `${a}(x) + ${a}(${b}) - ${c}`
    ],
    correctAnswers: [0, 1, 3],
    explanation: `Distribute the ${a}: ${a}x + ${a * b} - ${c}. Then combine constants: ${a}x + ${a * b - c}. The expression ${a}(x) + ${a}(${b}) - ${c} shows the unsimplified distribution.`
  });

  // 3. Integers
  const i1 = getRandomInt(-20, -2);
  const i2 = getRandomInt(-20, -2);
  const i3 = getRandomInt(-20, -2);
  const ans3 = i1 + i2 - i3;
  qs.push({
    id: 3,
    text: `What is the value of ${i1} + (${i2}) - (${i3})?`,
    options: [`${ans3 - 5}`, `${ans3}`, `${ans3 + 5}`, `${ans3 * 2}`],
    correctAnswer: 1,
    explanation: `${i1} + (${i2}) - (${i3}) = ${i1} ${i2} + ${Math.abs(i3)} = ${ans3}.`
  });

  // 4. Circle Area
  const radius = getRandomInt(3, 20);
  const area = (3.14 * radius * radius).toFixed(2);
  qs.push({
    id: 4,
    text: `A circle has a radius of ${radius} cm. What is its approximate area? (Use π ≈ 3.14)`,
    diagram: (
      <svg width="120" height="120" viewBox="0 0 100 100" className="mx-auto">
        <circle cx="50" cy="50" r="40" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
        <line x1="50" y1="50" x2="90" y2="50" stroke="#64748b" strokeWidth="2" strokeDasharray="4" />
        <circle cx="50" cy="50" r="2" fill="#0f172a" />
        <text x="60" y="45" fontSize="12" fill="#0f172a" fontWeight="bold">r = {radius} cm</text>
      </svg>
    ),
    options: [`${(2 * 3.14 * radius).toFixed(2)} cm²`, `${(3.14 * radius).toFixed(2)} cm²`, `${area} cm²`, `${(area as any * 2).toFixed(2)} cm²`],
    correctAnswer: 2,
    explanation: `Area = πr² = 3.14 * ${radius}² = 3.14 * ${radius * radius} = ${area}.`
  });

  // 5. Proportionality
  const k = parseFloat((getRandomInt(15, 85) / 10).toFixed(1));
  qs.push({
    id: 5,
    text: `The table below shows a proportional relationship between x and y. What is the constant of proportionality?`,
    diagram: (
      <table className="mx-auto border-collapse border border-slate-300 text-center text-sm w-48">
        <thead>
          <tr className="bg-slate-100">
            <th className="border border-slate-300 px-4 py-2 font-bold">x</th>
            <th className="border border-slate-300 px-4 py-2 font-bold">y</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-slate-300 px-4 py-2">2</td><td className="border border-slate-300 px-4 py-2">{(2 * k).toFixed(1)}</td></tr>
          <tr><td className="border border-slate-300 px-4 py-2">4</td><td className="border border-slate-300 px-4 py-2">{(4 * k).toFixed(1)}</td></tr>
          <tr><td className="border border-slate-300 px-4 py-2">6</td><td className="border border-slate-300 px-4 py-2">{(6 * k).toFixed(1)}</td></tr>
        </tbody>
      </table>
    ),
    options: [`${(k * 2).toFixed(1)}`, `${(k / 2).toFixed(1)}`, `${k}`, "0"],
    correctAnswer: 2,
    explanation: `The constant of proportionality is y/x. For any row, y/x = ${(2*k).toFixed(1)}/2 = ${k}.`
  });

  // 6. Percent Discount
  const orig = getRandomInt(4, 30) * 10;
  const disc = getRandomInt(1, 8) * 10;
  const saved = (orig * disc) / 100;
  const finalPrice = orig - saved;
  qs.push({
    id: 6,
    text: `A pair of shoes is on sale for ${disc}% off the original price of $${orig}. What is the sale price?`,
    options: [`$${saved}`, `$${orig - 5}`, `$${finalPrice}`, `$${orig - 10}`],
    correctAnswer: 2,
    explanation: `${disc}% of ${orig} is ${saved}. ${orig} - ${saved} = ${finalPrice}.`
  });

  // 7. Equations
  const sol7 = getRandomInt(2, 15);
  const coeff7 = getRandomInt(2, 10);
  const const7 = getRandomInt(2, 25);
  const res7 = coeff7 * sol7 + const7;
  qs.push({
    id: 7,
    text: `Solve for x: ${coeff7}x + ${const7} = ${res7}`,
    options: [`x = ${sol7}`, `x = ${sol7 + 2}`, `x = ${sol7 - 1}`, `x = ${res7 - const7}`],
    correctAnswer: 0,
    explanation: `${coeff7}x = ${res7} - ${const7} => ${coeff7}x = ${res7 - const7} => x = ${sol7}.`
  });

  // 8. Probability
  qs.push({
    id: 8,
    text: "What is the probability of rolling a 4 on a standard six-sided die?",
    options: ["1/2", "1/4", "1/6", "1/3"],
    correctAnswer: 2,
    explanation: "There is one '4' out of six possible outcomes."
  });

  // 9. Coordinate Plane
  const x9 = getRandomInt(-4, 4);
  const y9 = getRandomInt(-4, 4);
  qs.push({
    id: 9,
    text: `Which point represents the coordinate (${x9}, ${y9}) on a plane?`,
    diagram: (
      <svg width="200" height="200" viewBox="-5 -5 10 10" className="mx-auto border bg-white">
        <line x1="-5" y1="0" x2="5" y2="0" stroke="black" strokeWidth="0.1" />
        <line x1="0" y1="-5" x2="0" y2="5" stroke="black" strokeWidth="0.1" />
        <circle cx={x9} cy={-y9} r="0.3" fill="blue" />
        <text x={x9 + 0.2} y={-y9 + 0.5} fontSize="0.8">B</text>
        <circle cx={x9} cy={y9} r="0.3" fill="red" />
        <text x={x9 + 0.2} y={y9 + 0.5} fontSize="0.8">A</text>
      </svg>
    ),
    options: ["Point A", "Point B", "Point C", "Point D"],
    correctAnswer: 0, // Adjusted to match diagram logic
    explanation: `The point (${x9}, ${y9}) is ${x9} units ${x9 >= 0 ? 'right' : 'left'} and ${Math.abs(y9)} units ${y9 >= 0 ? 'up' : 'down'}.`
  });

  // 10. Surface Area Cube
  const side10 = getRandomInt(2, 12);
  const sa10 = 6 * side10 * side10;
  qs.push({
    id: 10,
    text: `Find the surface area of a cube with a side length of ${side10} inches.`,
    options: [`${side10 * side10} in²`, `${side10 ** 3} in²`, `${sa10} in²`, `${sa10 + 10} in²`],
    correctAnswer: 2,
    explanation: `Surface Area = 6 * s² = 6 * ${side10}² = 6 * ${side10 * side10} = ${sa10}.`
  });

  // 11. Probability NOT
  const red = getRandomInt(2, 10);
  const blue = getRandomInt(3, 12);
  const green = getRandomInt(1, 8);
  const total = red + blue + green;
  qs.push({
    id: 11,
    text: `A bag contains ${red} red marbles, ${blue} blue marbles, and ${green} green marbles. If you pick one marble at random, what is the probability it is NOT blue?`,
    options: [`${red}/${total}`, `${(red + green)}/${total}`, `${blue}/${total}`, `${green}/${total}`],
    correctAnswer: 1,
    explanation: `Total marbles = ${red} + ${blue} + ${green} = ${total}. Blue = ${blue}. Not blue = ${total} - ${blue} = ${red + green}. Probability = ${(red + green)}/${total}.`
  });

  // 12. Inequalities
  const n12 = getRandomInt(10, 100);
  qs.push({
    id: 12,
    text: `Which inequality represents 'a number n is at most ${n12}'?`,
    options: [`n > ${n12}`, `n < ${n12}`, `n ≥ ${n12}`, `n ≤ ${n12}`],
    correctAnswer: 3,
    explanation: "'At most' means less than or equal to (≤)."
  });

  // 13. Volume
  const l13 = getRandomInt(3, 15);
  const w13 = getRandomInt(2, 10);
  const h13 = getRandomInt(5, 25);
  qs.push({
    id: 13,
    text: `What is the volume of a rectangular prism with length ${l13}, width ${w13}, and height ${h13}?`,
    options: [`${l13 + w13 + h13}`, `${l13 * w13}`, `${l13 * w13 * h13}`, `${(l13 * w13 * h13) / 2}`],
    correctAnswer: 2,
    explanation: `Volume = length * width * height = ${l13} * ${w13} * ${h13} = ${l13 * w13 * h13}.`
  });

  // 14. Decimals
  qs.push({
    id: 14,
    text: "What is 3/4 as a decimal?",
    options: ["0.34", "0.75", "0.25", "0.80"],
    correctAnswer: 1,
    explanation: "3 divided by 4 is 0.75."
  });

  // 15. Map Scale
  const scale = getRandomInt(2, 12) * 10;
  const dist = (getRandomInt(2, 15) + 0.5);
  qs.push({
    id: 15,
    text: `A map has a scale of 1 inch = ${scale} miles. If two cities are ${dist} inches apart on the map, how far apart are they in reality?`,
    diagram: (
      <svg width="100%" height="100" viewBox="0 0 200 60" className="mx-auto max-w-sm">
        {/* Map outline */}
        <rect x="10" y="5" width="180" height="50" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" rx="4" strokeDasharray="4 4" />
        
        {/* Cities */}
        <circle cx="40" cy="30" r="4" fill="#ef4444" />
        <text x="40" y="20" fontSize="10" textAnchor="middle" fill="#64748b" fontWeight="bold">City A</text>
        
        <circle cx="160" cy="30" r="4" fill="#ef4444" />
        <text x="160" y="20" fontSize="10" textAnchor="middle" fill="#64748b" fontWeight="bold">City B</text>
        
        {/* Distance line */}
        <line x1="40" y1="30" x2="160" y2="30" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x="100" y="25" fontSize="10" textAnchor="middle" fill="#3b82f6" fontWeight="bold">{dist} inches</text>
        
        {/* Legend */}
        <rect x="15" y="40" width="60" height="12" fill="#ffffff" stroke="#e2e8f0" rx="2" />
        <text x="45" y="49" fontSize="8" textAnchor="middle" fill="#64748b">1 in = {scale} mi</text>
      </svg>
    ),
    options: [`${scale * dist - 10} miles`, `${scale * dist} miles`, `${scale * dist + 10} miles`, `${scale * 10} miles`],
    correctAnswer: 1,
    explanation: `${dist} inches * ${scale} miles/inch = ${scale * dist} miles.`
  });

  // 16. Triangle Angles
  qs.push({
    id: 16,
    text: "What is the sum of the angles in a triangle?",
    options: ["90°", "180°", "270°", "360°"],
    correctAnswer: 1,
    explanation: "The interior angles of any triangle always add up to 180 degrees."
  });

  // 17. Substitution
  const x17 = getRandomInt(-10, 10);
  const a17 = getRandomInt(2, 12);
  const b17 = getRandomInt(1, 25);
  qs.push({
    id: 17,
    text: `If x = ${x17}, what is the value of ${a17}x - ${b17}?`,
    options: [`${a17 * x17 - b17}`, `${a17 * x17 + b17}`, `${a17 + x17 - b17}`, `${a17 * (x17 - b17)}`],
    correctAnswer: 0,
    explanation: `${a17}(${x17}) - ${b17} = ${a17 * x17} - ${b17} = ${a17 * x17 - b17}.`
  });

  // 18. Rational Numbers
  qs.push({
    id: 18,
    text: "Which of the following is a rational number?",
    options: ["π", "√2", "0.333...", "√5"],
    correctAnswer: 2,
    explanation: "0.333... is 1/3, which is a ratio of two integers."
  });

  // 19. Median
  const list19 = [getRandomInt(1, 10), getRandomInt(11, 20), getRandomInt(21, 30), getRandomInt(31, 40), getRandomInt(41, 50)].sort((a, b) => a - b);
  qs.push({
    id: 19,
    text: `Find the median of the data set: ${[...list19].sort(() => Math.random() - 0.5).join(', ')}`,
    options: [`${list19[0]}`, `${list19[1]}`, `${list19[2]}`, `${list19[3]}`],
    correctAnswer: 2,
    explanation: `Ordered set: ${list19.join(', ')}. The middle number is ${list19[2]}.`
  });

  // 20. Triangle Area
  const b20 = getRandomInt(4, 25);
  const h20 = getRandomInt(4, 25);
  qs.push({
    id: 20,
    text: `A triangle has a base of ${b20} cm and a height of ${h20} cm. What is its area?`,
    options: [`${b20 + h20} cm²`, `${b20 * h20} cm²`, `${(b20 * h20) / 2} cm²`, `${b20 * h20 * 2} cm²`],
    correctAnswer: 2,
    explanation: `Area = (1/2) * base * height = (1/2) * ${b20} * ${h20} = ${(b20 * h20) / 2}.`
  });

  // 21. Simple Interest (Free Response)
  const principal = getRandomInt(1, 15) * 100;
  const rate = getRandomInt(2, 12);
  const time = getRandomInt(2, 10);
  const interest = (principal * rate * time) / 100;
  qs.push({
    id: 21,
    type: 'free-response',
    text: `You deposit $${principal} in an account earning ${rate}% simple interest annually. How much interest will you earn in ${time} years? (Enter just the number)`,
    correctValue: `${interest}`,
    explanation: `Simple Interest = Principal × Rate × Time = ${principal} × ${rate / 100} × ${time} = ${interest}.`
  });

  // 22. Percent Increase/Decrease
  const oldVal = getRandomInt(4, 25) * 10;
  const newVal = oldVal + getRandomInt(1, 10) * 10;
  const pctInc = ((newVal - oldVal) / oldVal) * 100;
  qs.push({
    id: 22,
    text: `A store buys a jacket for $${oldVal} and sells it for $${newVal}. What is the percent markup?`,
    options: ensureUniqueOptions([`${formatPercent(pctInc)}`, `${formatPercent(pctInc + 10)}`, `${formatPercent(pctInc / 2)}`, `${oldVal}%`], 0),
    correctAnswer: 0,
    explanation: `Markup = ${newVal} - ${oldVal} = ${newVal - oldVal}. Percent = (${newVal - oldVal} / ${oldVal}) × 100 = ${formatPercent(pctInc)}.`
  });

  // 23. Tax and Total Cost
  const meal = getRandomInt(20, 150);
  const tax = getRandomInt(5, 15);
  const totalCost = (meal * (1 + tax / 100)).toFixed(2);
  qs.push({
    id: 23,
    text: `Your meal costs $${meal}. If the sales tax is ${tax}%, what is the total cost of the meal?`,
    options: ensureUniqueOptions([`$${totalCost}`, `$${(meal + tax).toFixed(2)}`, `$${(meal * (tax / 100)).toFixed(2)}`, `$${(meal * 1.1).toFixed(2)}`], 0),
    correctAnswer: 0,
    explanation: `Tax = ${meal} × ${tax / 100} = ${(meal * (tax / 100)).toFixed(2)}. Total = ${meal} + ${(meal * (tax / 100)).toFixed(2)} = ${totalCost}.`
  });

  // 24. Circumference
  const diam = getRandomInt(4, 30);
  const circ = (3.14 * diam).toFixed(2);
  qs.push({
    id: 24,
    text: `What is the approximate circumference of a circle with a diameter of ${diam} inches? (Use π ≈ 3.14)`,
    options: [`${(3.14 * diam * diam / 4).toFixed(2)} in`, `${circ} in`, `${(3.14 * diam * 2).toFixed(2)} in`, `${(3.14 * diam / 2).toFixed(2)} in`],
    correctAnswer: 1,
    explanation: `Circumference = π × d = 3.14 × ${diam} = ${circ}.`
  });

  // 25. Cross-sections
  qs.push({
    id: 25,
    text: `What 2D shape is formed by a horizontal slice (parallel to the base) of a vertical cylinder?`,
    options: ["Rectangle", "Circle", "Triangle", "Oval"],
    correctAnswer: 1,
    explanation: `A slice parallel to the circular base of a cylinder forms a circle.`
  });

  // 26. Complementary Angles
  const compAng = getRandomInt(10, 80);
  qs.push({
    id: 26,
    text: `Angles A and B are complementary. If Angle A is ${compAng}°, what is the measure of Angle B?`,
    options: [`${180 - compAng}°`, `${90 - compAng}°`, `${compAng}°`, `${90 + compAng}°`],
    correctAnswer: 1,
    explanation: `Complementary angles add up to 90°. 90 - ${compAng} = ${90 - compAng}.`
  });

  // 27. Compound Probability
  qs.push({
    id: 27,
    text: `You flip a fair coin and roll a standard 6-sided die. What is the probability of getting Heads and rolling a 5?`,
    options: ["1/12", "1/8", "1/2", "1/6"],
    correctAnswer: 0,
    explanation: `P(Heads) = 1/2. P(5) = 1/6. P(Both) = (1/2) × (1/6) = 1/12.`
  });

  // 28. Experimental Probability
  const flips = getRandomInt(40, 200);
  const heads = getRandomInt(15, flips - 5);
  qs.push({
    id: 28,
    text: `A coin is flipped ${flips} times and lands on heads ${heads} times. What is the experimental probability of landing on heads?`,
    options: [`${heads}/${flips}`, `${flips - heads}/${flips}`, `1/2`, `${heads}/100`],
    correctAnswer: 0,
    explanation: `Experimental probability = (number of times event occurred) / (total trials) = ${heads}/${flips}.`
  });

  // 29. Mean (Dot Plot - Free Response)
  const dot1 = getRandomInt(1, 5);
  const dot2 = getRandomInt(6, 10);
  const dot3 = getRandomInt(11, 14);
  const dot4 = getRandomInt(11, 14);
  const mean = (dot1 + dot2 + dot3 + dot4) / 4;
  qs.push({
    id: 29,
    type: 'free-response',
    text: `Find the mean of the data set shown in the dot plot below.`,
    diagram: (
      <svg width="100%" height="160" viewBox="-2 0 18 15" className="mx-auto max-w-md">
        <line x1="-1" y1="10" x2="15" y2="10" stroke="#64748b" strokeWidth="0.1" />
        {[0, 2, 4, 6, 8, 10, 12, 14].map(x => (
          <g key={x}>
            <line x1={x} y1="9.5" x2={x} y2="10.5" stroke="#64748b" strokeWidth="0.1" />
            <text x={x} y="13" fontSize="1.5" textAnchor="middle" fill="#64748b">{x}</text>
          </g>
        ))}
        <circle cx={dot1} cy="8.5" r="0.4" fill="#3b82f6" />
        <circle cx={dot2} cy="8.5" r="0.4" fill="#3b82f6" />
        <circle cx={dot3} cy="8.5" r="0.4" fill="#3b82f6" />
        <circle cx={dot4} cy="7.5" r="0.4" fill="#3b82f6" />
      </svg>
    ),
    correctValue: `${mean}`,
    explanation: `The data points are ${dot1}, ${dot2}, ${dot3}, and ${dot4}. Mean = (${dot1} + ${dot2} + ${dot3} + ${dot4}) / 4 = ${(dot1 + dot2 + dot3 + dot4)} / 4 = ${mean}.`
  });

  // 30. Factoring Expressions
  const f1_base = getRandomInt(2, 6);
  const f2 = getRandomInt(2, 12);
  const f3 = getRandomInt(2, 12);
  const term1 = f1_base * f2;
  const term2 = f1_base * f3;
  const actualGCF = gcd(term1, term2);
  const finalF2 = term1 / actualGCF;
  const finalF3 = term2 / actualGCF;
  qs.push({
    id: 30,
    text: `Factor the expression completely: ${term1}x + ${term2}`,
    options: ensureUniqueOptions([`${actualGCF}(${finalF2}x + ${finalF3})`, `${f1_base}(${f2}x + ${f3})`, `${term1}(x + ${term2})`, `${actualGCF}x(${finalF2} + ${finalF3})`], 0),
    correctAnswer: 0,
    explanation: `The greatest common factor of ${term1}x and ${term2} is ${actualGCF}. Factoring it out gives ${actualGCF}(${finalF2}x + ${finalF3}).`
  });

  // 31. Two-step inequality word problem
  const costPer = getRandomInt(3, 15);
  const flatFee = getRandomInt(10, 40);
  const maxSpend = getRandomInt(50, 200);
  const maxItems = Math.floor((maxSpend - flatFee) / costPer);
  qs.push({
    id: 31,
    text: `An amusement park charges $${flatFee} for admission and $${costPer} per ride. If you have $${maxSpend} to spend, what is the maximum number of rides you can go on?`,
    options: [`${maxItems}`, `${maxItems + 1}`, `${maxItems - 1}`, `${Math.floor(maxSpend/costPer)}`],
    correctAnswer: 0,
    explanation: `Let r = rides. ${costPer}r + ${flatFee} ≤ ${maxSpend}. ${costPer}r ≤ ${maxSpend - flatFee}. r ≤ ${(maxSpend - flatFee) / costPer}. Max rides = ${maxItems}.`
  });

  // 32. Complex fraction unit rate
  const denDist = getRandomInt(2, 10);
  const denTime = getRandomInt(3, 15);
  qs.push({
    id: 32,
    text: `A snail crawls 1/${denDist} of a meter in 1/${denTime} of an hour. What is its speed in meters per hour?`,
    diagram: (
      <svg width="100%" height="80" viewBox="0 0 200 40" className="mx-auto max-w-sm">
        <line x1="20" y1="20" x2="180" y2="20" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
        <text x="100" y="12" fontSize="10" textAnchor="middle" fill="#64748b">Distance: 1/{denDist} m</text>
        <text x="100" y="35" fontSize="10" textAnchor="middle" fill="#64748b">Time: 1/{denTime} h</text>
        <circle cx="40" cy="20" r="4" fill="#10b981" />
        <path d="M 40 20 Q 110 0 160 20" fill="none" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
          </marker>
        </defs>
      </svg>
    ),
    options: [`${denTime}/${denDist} m/hr`, `${denDist}/${denTime} m/hr`, `${denTime * denDist} m/hr`, `1/${denTime * denDist} m/hr`],
    correctAnswer: 0,
    explanation: `Speed = Distance / Time = (1/${denDist}) ÷ (1/${denTime}) = (1/${denDist}) × (${denTime}/1) = ${denTime}/${denDist}.`
  });

  // 33. Proportional Graph
  const unitY = getRandomInt(3, 25);
  qs.push({
    id: 33,
    text: `A graph shows a proportional relationship between hours worked (x) and total pay (y). The line passes through the point (1, ${unitY}). What does this point represent?`,
    options: [`The hourly pay rate is $${unitY}.`, `The total pay for ${unitY} hours is $1.`, `The worker earns $1 per hour.`, `The y-intercept is ${unitY}.`],
    correctAnswer: 0,
    explanation: `In a proportional graph, the point (1, r) represents the unit rate. Here, earning $${unitY} in 1 hour.`
  });

  // 34. Multiplying negative fractions
  const n1 = getRandomInt(1, 8);
  const d1 = getRandomInt(9, 15);
  const n2 = getRandomInt(1, 8);
  const d2 = getRandomInt(9, 15);
  qs.push({
    id: 34,
    text: `Multiply: (-${n1}/${d1}) × (${n2}/${d2})`,
    options: [`-${n1 * n2}/${d1 * d2}`, `${n1 * n2}/${d1 * d2}`, `-${n1 * d2}/${d1 * n2}`, `${n1 + n2}/${d1 + d2}`],
    correctAnswer: 0,
    explanation: `Negative × Positive = Negative. Multiply numerators: ${n1} × ${n2} = ${n1 * n2}. Multiply denominators: ${d1} × ${d2} = ${d1 * d2}. Result: -${n1 * n2}/${d1 * d2}.`
  });

  // 35. Distance on coordinate plane
  const px = getRandomInt(-15, -2);
  const py = getRandomInt(1, 15);
  const qx = getRandomInt(2, 15);
  qs.push({
    id: 35,
    text: `What is the distance between the points (${px}, ${py}) and (${qx}, ${py}) on a coordinate plane?`,
    options: [`${qx - px} units`, `${Math.abs(px)} units`, `${qx} units`, `${qx + px} units`],
    correctAnswer: 0,
    explanation: `Since the y-coordinates are the same, the distance is the absolute difference of the x-coordinates: |${qx} - (${px})| = ${qx - px}.`
  });

  // 36. Area of composite figure
  const rectL = getRandomInt(5, 20);
  const rectW = getRandomInt(4, 15);
  const triH = getRandomInt(3, 12);
  const compArea = (rectL * rectW) + (0.5 * rectL * triH);
  qs.push({
    id: 36,
    text: `A composite figure consists of a rectangle with length ${rectL} and width ${rectW}, and a triangle on top with base ${rectL} and height ${triH}. What is the total area?`,
    options: [`${compArea}`, `${rectL * rectW + rectL * triH}`, `${rectL * rectW}`, `${0.5 * rectL * triH}`],
    correctAnswer: 0,
    explanation: `Rectangle Area = ${rectL} × ${rectW} = ${rectL * rectW}. Triangle Area = 1/2 × ${rectL} × ${triH} = ${0.5 * rectL * triH}. Total = ${rectL * rectW} + ${0.5 * rectL * triH} = ${compArea}.`
  });

  // 37. Scale factor effect on area
  const sf = getRandomInt(2, 8);
  qs.push({
    id: 37,
    text: `If the dimensions of a rectangle are multiplied by a scale factor of ${sf}, how many times larger will the new area be?`,
    diagram: (
      <svg width="100%" height="120" viewBox="0 0 200 80" className="mx-auto max-w-sm">
        {/* Original Rectangle */}
        <rect x="30" y="40" width="20" height="15" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
        <text x="40" y="35" fontSize="10" textAnchor="middle" fill="#64748b">Area = A</text>
        <text x="40" y="68" fontSize="10" textAnchor="middle" fill="#3b82f6">w</text>
        <text x="20" y="50" fontSize="10" textAnchor="middle" fill="#3b82f6">h</text>
        
        {/* Arrow */}
        <path d="M 70 47 L 90 47" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
        <text x="80" y="42" fontSize="10" textAnchor="middle" fill="#64748b">Scale ×{sf}</text>
        
        {/* Scaled Rectangle */}
        <rect x="110" y="20" width={20 * sf} height={15 * sf} fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 4" />
        <text x={110 + (10 * sf)} y="15" fontSize="10" textAnchor="middle" fill="#64748b">Area = ?</text>
        <text x={110 + (10 * sf)} y={20 + (15 * sf) + 12} fontSize="10" textAnchor="middle" fill="#22c55e">{sf}w</text>
        <text x="95" y={20 + (7.5 * sf)} fontSize="10" textAnchor="middle" fill="#22c55e">{sf}h</text>
      </svg>
    ),
    options: [`${sf * sf} times`, `${sf} times`, `${sf * 2} times`, `${sf * sf * sf} times`],
    correctAnswer: 0,
    explanation: `When dimensions are scaled by factor k, the area is scaled by k². Here, ${sf}² = ${sf * sf}.`
  });

  // 38. Random sampling
  qs.push({
    id: 38,
    text: `A principal wants to know the favorite subject of 7th graders. Which of the following is the most representative random sample?`,
    options: ["Surveying 50 random 7th graders in the cafeteria.", "Surveying all students in the math club.", "Surveying 50 8th graders.", "Surveying the first 10 students who arrive at school."],
    correctAnswer: 0,
    explanation: `A random sample from the cafeteria gives all 7th graders an equal chance of being selected, avoiding the bias of specific clubs or arrival times.`
  });

  // 39. Elevation difference
  const top = getRandomInt(100, 300);
  const bottom = getRandomInt(20, 80);
  qs.push({
    id: 39,
    text: `A mountain peak is ${top} feet above sea level. A nearby valley is ${bottom} feet below sea level. What is the difference in elevation between the peak and the valley?`,
    options: [`${top + bottom} feet`, `${top - bottom} feet`, `${bottom} feet`, `${top} feet`],
    correctAnswer: 0,
    explanation: `Difference = Top - Bottom = ${top} - (-${bottom}) = ${top} + ${bottom} = ${top + bottom}.`
  });

  // 40. Dividing fractions word problem
  const totalPizzas = getRandomInt(3, 12);
  const sliceFrac = getRandomInt(4, 16);
  qs.push({
    id: 40,
    text: `You have ${totalPizzas} pizzas. If each serving is 1/${sliceFrac} of a pizza, how many servings do you have?`,
    options: [`${totalPizzas * sliceFrac}`, `${totalPizzas / sliceFrac}`, `${sliceFrac / totalPizzas}`, `${totalPizzas + sliceFrac}`],
    correctAnswer: 0,
    explanation: `${totalPizzas} ÷ (1/${sliceFrac}) = ${totalPizzas} × ${sliceFrac} = ${totalPizzas * sliceFrac}.`
  });

  {
  // 41. Simple Interest
  const principal = getRandomInt(5, 50) * 100;
  const rate = getRandomInt(2, 12);
  const time = getRandomInt(2, 10);
  const interest = (principal * rate * time) / 100;
  qs.push({
    id: 41,
    text: `If you invest $${principal} at a simple interest rate of ${rate}% per year, how much interest will you earn after ${time} years?`,
    options: [`$${interest}`, `$${interest + principal}`, `$${(principal * rate) / 100}`, `$${interest * 2}`],
    correctAnswer: 0,
    explanation: `Simple Interest = P × r × t = ${principal} × (${rate}/100) × ${time} = ${interest}.`
  });

  // 42. Percent Error
  const actual = getRandomInt(40, 200);
  const estimate = actual + getRandomInt(2, 25) * (Math.random() > 0.5 ? 1 : -1);
  const error = Math.abs(actual - estimate);
  const percentError = ((error / actual) * 100).toFixed(1);
  qs.push({
    id: 42,
    text: `You estimated there were ${estimate} jellybeans in a jar. The actual number was ${actual}. What is the percent error of your estimate? (Round to the nearest tenth if necessary)`,
    options: ensureUniqueOptions([`${percentError}%`, `${((error / estimate) * 100).toFixed(1)}%`, `${error}%`, `${(parseFloat(percentError) * 2).toFixed(1)}%`], 0),
    correctAnswer: 0,
    explanation: `Percent Error = (|Actual - Estimate| / Actual) × 100 = (${error} / ${actual}) × 100 ≈ ${percentError}%.`
  });

  // 43. Unit Rate with Fractions
  const distFracNum = getRandomInt(1, 8);
  const distFracDen = getRandomInt(9, 15);
  const timeFracNum = getRandomInt(1, 5);
  const timeFracDen = getRandomInt(6, 12);
  const speed = ((distFracNum / distFracDen) / (timeFracNum / timeFracDen)).toFixed(2);
  qs.push({
    id: 43,
    text: `A snail crawls ${distFracNum}/${distFracDen} of a meter in ${timeFracNum}/${timeFracDen} of an hour. What is the snail's speed in meters per hour? (Decimal approximation)`,
    diagram: (
      <svg width="100%" height="80" viewBox="0 0 200 40" className="mx-auto max-w-sm">
        <line x1="20" y1="20" x2="180" y2="20" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
        <text x="100" y="12" fontSize="10" textAnchor="middle" fill="#64748b">Distance: {distFracNum}/{distFracDen} m</text>
        <text x="100" y="35" fontSize="10" textAnchor="middle" fill="#64748b">Time: {timeFracNum}/{timeFracDen} h</text>
        <circle cx="40" cy="20" r="4" fill="#10b981" />
        <path d="M 40 20 Q 110 0 160 20" fill="none" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
          </marker>
        </defs>
      </svg>
    ),
    options: ensureUniqueOptions([`${speed} m/h`, `${((distFracNum/distFracDen)*(timeFracNum/timeFracDen)).toFixed(2)} m/h`, `${((timeFracNum/timeFracDen)/(distFracNum/distFracDen)).toFixed(2)} m/h`, `1.00 m/h`], 0),
    correctAnswer: 0,
    explanation: `Speed = Distance ÷ Time = (${distFracNum}/${distFracDen}) ÷ (${timeFracNum}/${timeFracDen}) = (${distFracNum}/${distFracDen}) × (${timeFracDen}/${timeFracNum}) ≈ ${speed}.`
  });

  // 44. Solving Two-Step Inequalities
  const ineqCoeff = getRandomInt(2, 12);
  const ineqConst = getRandomInt(3, 30);
  const ineqTarget = ineqCoeff * getRandomInt(2, 15) + ineqConst;
  const ineqAns = (ineqTarget - ineqConst) / ineqCoeff;
  qs.push({
    id: 44,
    text: `Solve the inequality: ${ineqCoeff}x + ${ineqConst} ≥ ${ineqTarget}`,
    options: [`x ≥ ${ineqAns}`, `x ≤ ${ineqAns}`, `x ≥ ${ineqAns + 2}`, `x > ${ineqAns}`],
    correctAnswer: 0,
    explanation: `Subtract ${ineqConst} from both sides: ${ineqCoeff}x ≥ ${ineqTarget - ineqConst}. Divide by ${ineqCoeff}: x ≥ ${ineqAns}.`
  });

  // 45. Negative Coefficient Inequality
  const negCoeff = -getRandomInt(2, 12);
  const negConst = getRandomInt(1, 30);
  const negTarget = negCoeff * getRandomInt(-10, 10) + negConst;
  const negAns = (negTarget - negConst) / negCoeff;
  qs.push({
    id: 45,
    text: `Solve the inequality: ${negCoeff}x + ${negConst} < ${negTarget}`,
    options: [`x > ${negAns}`, `x < ${negAns}`, `x ≥ ${negAns}`, `x ≤ ${negAns}`],
    correctAnswer: 0,
    explanation: `Subtract ${negConst}: ${negCoeff}x < ${negTarget - negConst}. Divide by ${negCoeff} and FLIP the inequality sign: x > ${negAns}.`
  });

  // 46. Factoring Expressions
  const gcf = getRandomInt(2, 15);
  const term1 = getRandomInt(2, 12);
  const term2 = getRandomInt(3, 15);
  qs.push({
    id: 46,
    text: `Factor the expression completely: ${gcf * term1}x + ${gcf * term2}`,
    options: [`${gcf}(${term1}x + ${term2})`, `${term1}(${gcf}x + ${term2})`, `${gcf * term1}(x + ${term2})`, `${term2}(${term1}x + ${gcf})`],
    correctAnswer: 0,
    explanation: `The greatest common factor of ${gcf * term1} and ${gcf * term2} is ${gcf}. Factoring it out gives ${gcf}(${term1}x + ${term2}).`
  });

  // 47. Expanding Expressions
  const out = getRandomInt(2, 12);
  const in1 = getRandomInt(2, 15);
  const in2 = getRandomInt(1, 20);
  qs.push({
    id: 47,
    text: `Expand the expression: -${out}(${in1}y - ${in2})`,
    options: [`-${out * in1}y + ${out * in2}`, `-${out * in1}y - ${out * in2}`, `${out * in1}y - ${out * in2}`, `-${out * in1}y + ${in2}`],
    correctAnswer: 0,
    explanation: `Distribute -${out}: (-${out})(${in1}y) + (-${out})(-${in2}) = -${out * in1}y + ${out * in2}.`
  });

  // 48. Distance on a Number Line
  const ptA = getRandomInt(-50, -5);
  const ptB = getRandomInt(5, 50);
  qs.push({
    id: 48,
    text: `What is the distance between ${ptA} and ${ptB} on a number line?`,
    diagram: (
      <svg width="300" height="60" viewBox="-20 0 40 20" className="mx-auto">
        <line x1="-18" y1="10" x2="18" y2="10" stroke="#64748b" strokeWidth="0.5" />
        <line x1="0" y1="8" x2="0" y2="12" stroke="#64748b" strokeWidth="0.5" />
        <text x="0" y="18" fontSize="4" textAnchor="middle" fill="#64748b">0</text>
        
        <circle cx={ptA} cy="10" r="1.5" fill="#ef4444" />
        <text x={ptA} y="6" fontSize="4" textAnchor="middle" fill="#ef4444" fontWeight="bold">{ptA}</text>
        
        <circle cx={ptB} cy="10" r="1.5" fill="#3b82f6" />
        <text x={ptB} y="6" fontSize="4" textAnchor="middle" fill="#3b82f6" fontWeight="bold">{ptB}</text>
      </svg>
    ),
    options: [`${Math.abs(ptA - ptB)}`, `${ptA + ptB}`, `${Math.abs(ptA + ptB)}`, `${ptB - Math.abs(ptA)}`],
    correctAnswer: 0,
    explanation: `Distance = |a - b| = |${ptA} - ${ptB}| = |-${Math.abs(ptA - ptB)}| = ${Math.abs(ptA - ptB)}.`
  });

  // 49. Multiplying Rational Numbers (Word Problem)
  const rateDrop = (getRandomInt(2, 49) / 10).toFixed(1);
  const timeMins = (getRandomInt(2, 49) / 10).toFixed(1);
  const totalChange = (-(parseFloat(rateDrop) * parseFloat(timeMins))).toFixed(2);
  qs.push({
    id: 49,
    text: `A substance's temperature decreases by ${rateDrop}°C every minute. What is the total change in temperature after ${timeMins} minutes?`,
    diagram: (
      <svg width="100%" height="100" viewBox="0 0 200 60" className="mx-auto max-w-sm">
        <rect x="20" y="10" width="160" height="40" fill="#f8fafc" stroke="#cbd5e1" rx="4" />
        <path d="M 40 30 L 160 30" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
        
        {/* Thermometer icon simplified */}
        <rect x="30" y="15" width="10" height="30" rx="5" fill="#e2e8f0" stroke="#94a3b8" />
        <circle cx="35" cy="40" r="8" fill="#ef4444" />
        <rect x="33" y="20" width="4" height="20" fill="#ef4444" />
        
        <text x="100" y="25" fontSize="10" textAnchor="middle" fill="#ef4444" fontWeight="bold">-{rateDrop}°C / min</text>
        <text x="100" y="45" fontSize="10" textAnchor="middle" fill="#64748b">Time: {timeMins} min</text>
        
        <path d="M 150 20 L 170 40" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red)" />
        <defs>
          <marker id="arrow-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
          </marker>
        </defs>
      </svg>
    ),
    options: [`${totalChange}°C`, `${Math.abs(parseFloat(totalChange)).toFixed(2)}°C`, `${(parseFloat(totalChange) * 10).toFixed(1)}°C`, `${(parseFloat(totalChange) - 1).toFixed(2)}°C`],
    correctAnswer: 0,
    explanation: `The temperature is decreasing, so the rate is -${rateDrop}°C/min. Total change = Rate × Time = -${rateDrop} × ${timeMins} = ${totalChange}°C.`
  });

  // 50. Dividing Rational Numbers (Word Problem)
  const totalDebt = getRandomInt(50, 200);
  const numPeople = getRandomInt(4, 10);
  const share = (totalDebt / numPeople).toFixed(2);
  qs.push({
    id: 50,
    text: `A group of ${numPeople} friends owes a total debt of $${totalDebt}. If they split the debt equally, how much does each person owe?`,
    diagram: (
      <svg width="100%" height="100" viewBox="0 0 200 60" className="mx-auto max-w-sm">
        <rect x="10" y="10" width="180" height="40" fill="#fff1f2" stroke="#fb7185" rx="4" />
        <text x="100" y="25" fontSize="10" textAnchor="middle" fill="#e11d48" fontWeight="bold">Total Debt: -$${totalDebt}</text>
        
        {/* People icons */}
        <g transform="translate(45, 35)">
          <circle cx="0" cy="0" r="3" fill="#64748b" />
          <path d="M -4 8 Q 0 4 4 8" stroke="#64748b" fill="none" />
        </g>
        <g transform="translate(65, 35)">
          <circle cx="0" cy="0" r="3" fill="#64748b" />
          <path d="M -4 8 Q 0 4 4 8" stroke="#64748b" fill="none" />
        </g>
        <text x="85" y="42" fontSize="10" fill="#64748b">...</text>
        <g transform="translate(105, 35)">
          <circle cx="0" cy="0" r="3" fill="#64748b" />
          <path d="M -4 8 Q 0 4 4 8" stroke="#64748b" fill="none" />
        </g>
        
        <text x="145" y="42" fontSize="10" textAnchor="middle" fill="#64748b" fontWeight="bold">÷ {numPeople} people</text>
      </svg>
    ),
    options: [`$${share}`, `$${(totalDebt / (numPeople - 1)).toFixed(2)}`, `$${(totalDebt - numPeople).toFixed(2)}`, `$${(totalDebt * numPeople).toFixed(2)}`],
    correctAnswer: 0,
    explanation: `Debt is represented as a negative number: -$${totalDebt}. Dividing by ${numPeople} people: -${totalDebt} ÷ ${numPeople} = -$${share} per person.`
  });

  // 51. Scale Drawing Area
  const scaleFactor = getRandomInt(2, 10);
  const origArea = getRandomInt(10, 100);
  const newArea = origArea * scaleFactor * scaleFactor;
  qs.push({
    id: 51,
    text: `A rectangle has an area of ${origArea} cm². If the dimensions are scaled by a factor of ${scaleFactor}, what is the area of the new rectangle?`,
    diagram: (
      <svg width="100%" height="100" viewBox="0 0 200 60" className="mx-auto max-w-sm">
        <rect x="20" y="20" width="30" height="20" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
        <text x="35" y="33" fontSize="10" textAnchor="middle" fill="#1e40af" fontWeight="bold">{origArea} cm²</text>
        
        <path d="M 65 30 L 95 30" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
        <text x="80" y="25" fontSize="10" textAnchor="middle" fill="#64748b">Scale ×{scaleFactor}</text>
        
        <rect x="110" y="10" width="60" height="40" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 4" />
        <text x="140" y="33" fontSize="12" textAnchor="middle" fill="#166534" fontWeight="bold">? cm²</text>
      </svg>
    ),
    options: [`${newArea} cm²`, `${origArea * scaleFactor} cm²`, `${origArea * scaleFactor * 2} cm²`, `${origArea + scaleFactor} cm²`],
    correctAnswer: 0,
    explanation: `When dimensions are scaled by k, the area is scaled by k². New Area = ${origArea} × ${scaleFactor}² = ${origArea} × ${scaleFactor * scaleFactor} = ${newArea}.`
  });

  // 52. Triangle Inequality Theorem
  const side1 = getRandomInt(4, 25);
  const side2 = getRandomInt(5, 30);
  const validSide = getRandomInt(Math.abs(side1 - side2) + 1, side1 + side2 - 1);
  const invalidSide = side1 + side2 + getRandomInt(1, 4);
  qs.push({
    id: 52,
    text: `Which of the following could be the length of the third side of a triangle with sides ${side1} and ${side2}?`,
    options: [`${validSide}`, `${invalidSide}`, `${side1 + side2}`, `${Math.abs(side1 - side2)}`],
    correctAnswer: 0,
    explanation: `The third side must be greater than |${side1} - ${side2}| = ${Math.abs(side1 - side2)} and less than ${side1} + ${side2} = ${side1 + side2}. Only ${validSide} fits.`
  });

  // 53. Cross Sections of a Rectangular Prism
  qs.push({
    id: 53,
    text: `Which 2D shape is formed by a horizontal cross-section of a vertical rectangular prism?`,
    options: ["Rectangle", "Circle", "Triangle", "Trapezoid"],
    correctAnswer: 0,
    explanation: `A horizontal slice parallel to the base of a rectangular prism will always form a rectangle.`
  });

  // 54. Volume of a Triangular Prism
  const baseTri = getRandomInt(4, 25);
  const heightTri = getRandomInt(3, 20);
  const lengthPrism = getRandomInt(5, 30);
  const volTriPrism = (0.5 * baseTri * heightTri) * lengthPrism;
  qs.push({
    id: 54,
    text: `Find the volume of a triangular prism. The triangular base has a base of ${baseTri} cm and a height of ${heightTri} cm. The length of the prism is ${lengthPrism} cm.`,
    diagram: (
      <svg width="150" height="120" viewBox="0 0 150 120" className="mx-auto">
        <polygon points="30,80 80,80 55,30" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
        <polygon points="80,80 130,60 105,10 55,30" fill="none" stroke="#3b82f6" strokeWidth="2" />
        <line x1="30" y1="80" x2="80" y2="60" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
        <line x1="80" y1="60" x2="130" y2="60" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
        <line x1="80" y1="60" x2="105" y2="10" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
        <line x1="55" y1="30" x2="55" y2="80" stroke="#ef4444" strokeWidth="1" strokeDasharray="2" />
        <text x="55" y="95" fontSize="12" fill="#0f172a" textAnchor="middle">b={baseTri}</text>
        <text x="40" y="60" fontSize="12" fill="#ef4444">h={heightTri}</text>
        <text x="110" y="85" fontSize="12" fill="#0f172a">L={lengthPrism}</text>
      </svg>
    ),
    options: [`${volTriPrism} cm³`, `${volTriPrism * 2} cm³`, `${baseTri * heightTri * lengthPrism} cm³`, `${volTriPrism / 2} cm³`],
    correctAnswer: 0,
    explanation: `Volume = Area of Base × Length. Area of triangle = ½ × ${baseTri} × ${heightTri} = ${0.5 * baseTri * heightTri}. Volume = ${0.5 * baseTri * heightTri} × ${lengthPrism} = ${volTriPrism}.`
  });

  // 55. Surface Area of a Cube
  const edge = getRandomInt(3, 25);
  const saCube = 6 * edge * edge;
  qs.push({
    id: 55,
    text: `What is the surface area of a cube with an edge length of ${edge} inches?`,
    options: [`${saCube} in²`, `${edge * edge * edge} in²`, `${4 * edge * edge} in²`, `${12 * edge} in²`],
    correctAnswer: 0,
    explanation: `A cube has 6 identical square faces. Surface Area = 6 × s² = 6 × ${edge}² = 6 × ${edge * edge} = ${saCube}.`
  });

  // 56. Experimental Probability
  const trials = getRandomInt(40, 250);
  const successes = getRandomInt(5, Math.floor(trials / 2));
  const expProb = ((successes / trials) * 100).toFixed(1);
  qs.push({
    id: 56,
    text: `A spinner is spun ${trials} times and lands on red ${successes} times. What is the experimental probability of landing on red as a percentage?`,
    diagram: (
      <svg width="120" height="120" viewBox="0 0 100 100" className="mx-auto">
        <circle cx="50" cy="50" r="40" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
        <path d="M50 50 L50 10 A40 40 0 0 1 90 50 Z" fill="#ef4444" />
        <path d="M50 50 L90 50 A40 40 0 0 1 50 90 Z" fill="#3b82f6" />
        <path d="M50 50 L50 90 A40 40 0 0 1 10 50 Z" fill="#22c55e" />
        <path d="M50 50 L10 50 A40 40 0 0 1 50 10 Z" fill="#eab308" />
        <circle cx="50" cy="50" r="4" fill="#0f172a" />
        <polygon points="50,50 55,45 65,25 45,45" fill="#0f172a" transform="rotate(45 50 50)" />
      </svg>
    ),
    options: [`${expProb}%`, `${((successes / (trials + successes)) * 100).toFixed(1)}%`, `${(100 - parseFloat(expProb)).toFixed(1)}%`, `${((trials / successes) * 10).toFixed(1)}%`],
    correctAnswer: 0,
    explanation: `Experimental Probability = (Number of successes / Total trials) × 100 = (${successes} / ${trials}) × 100 = ${expProb}%.`
  });

  // 57. Theoretical Probability of Compound Events (Coins)
  qs.push({
    id: 57,
    text: `If you flip a fair coin 3 times, what is the theoretical probability of getting exactly 3 heads?`,
    options: ["1/8", "1/3", "3/8", "1/4"],
    correctAnswer: 0,
    explanation: `The probability of heads on one flip is 1/2. For 3 independent flips: (1/2) × (1/2) × (1/2) = 1/8.`
  });

  // 58. Independent Events
  const marblesRed = getRandomInt(3, 15);
  const marblesBlue = getRandomInt(4, 20);
  const totalMarbles = marblesRed + marblesBlue;
  qs.push({
    id: 58,
    text: `A bag contains ${marblesRed} red marbles and ${marblesBlue} blue marbles. You draw one, REPLACE IT, and draw another. What is the probability of drawing two red marbles?`,
    options: [`${marblesRed * marblesRed}/${totalMarbles * totalMarbles}`, `${marblesRed}/${totalMarbles}`, `${marblesRed * (marblesRed - 1)}/${totalMarbles * (totalMarbles - 1)}`, `${marblesRed * 2}/${totalMarbles * 2}`],
    correctAnswer: 0,
    explanation: `P(Red) = ${marblesRed}/${totalMarbles}. Since you replace it, the events are independent. P(Red and Red) = (${marblesRed}/${totalMarbles}) × (${marblesRed}/${totalMarbles}) = ${marblesRed * marblesRed}/${totalMarbles * totalMarbles}.`
  });

  // 59. Dependent Events
  const marblesRed59 = getRandomInt(3, 15);
  const marblesBlue59 = getRandomInt(4, 20);
  const totalMarbles59 = marblesRed59 + marblesBlue59;
  qs.push({
    id: 59,
    text: `A bag contains ${marblesRed59} red marbles and ${marblesBlue59} blue marbles. You draw one, DO NOT replace it, and draw another. What is the probability of drawing two red marbles?`,
    options: [`${marblesRed59 * (marblesRed59 - 1)}/${totalMarbles59 * (totalMarbles59 - 1)}`, `${marblesRed59 * marblesRed59}/${totalMarbles59 * totalMarbles59}`, `${marblesRed59}/${totalMarbles59}`, `${(marblesRed59 - 1)}/${(totalMarbles59 - 1)}`],
    correctAnswer: 0,
    explanation: `P(1st Red) = ${marblesRed59}/${totalMarbles59}. P(2nd Red | 1st was Red) = ${marblesRed59 - 1}/${totalMarbles59 - 1}. Multiply them: ${marblesRed59 * (marblesRed59 - 1)}/${totalMarbles59 * (totalMarbles59 - 1)}.`
  });

  // 60. Box Plot (Multiple Choice)
  const min = getRandomInt(10, 40);
  const q1 = min + getRandomInt(5, 15);
  const median = q1 + getRandomInt(5, 15);
  const q3 = median + getRandomInt(5, 15);
  const max = q3 + getRandomInt(5, 15);
  qs.push({
    id: 60,
    text: `The box plot below shows the test scores of a math class. What is the median score?`,
    diagram: (
      <svg width="100%" height="160" viewBox="-10 0 120 45" className="mx-auto max-w-lg">
        <line x1="0" y1="30" x2="100" y2="30" stroke="#64748b" strokeWidth="0.5" />
        {[0, 20, 40, 60, 80, 100].map(x => (
          <g key={x}>
            <line x1={x} y1="28" x2={x} y2="32" stroke="#64748b" strokeWidth="0.5" />
            <text x={x} y="38" fontSize="4" textAnchor="middle" fill="#64748b">{x}</text>
          </g>
        ))}
        <line x1={min} y1="15" x2={q1} y2="15" stroke="#3b82f6" strokeWidth="1" />
        <line x1={q3} y1="15" x2={max} y2="15" stroke="#3b82f6" strokeWidth="1" />
        <rect x={q1} y="10" width={q3 - q1} height="10" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1" />
        <line x1={median} y1="10" x2={median} y2="20" stroke="#3b82f6" strokeWidth="1" />
        <line x1={min} y1="12" x2={min} y2="18" stroke="#3b82f6" strokeWidth="1" />
        <line x1={max} y1="12" x2={max} y2="18" stroke="#3b82f6" strokeWidth="1" />
      </svg>
    ),
    options: [`${median}`, `${q1}`, `${q3}`, `${max}`],
    correctAnswer: 0,
    explanation: `In a box plot, the vertical line inside the box represents the median. The median is ${median}.`
  });

  // 61. Comparing Populations (Means)
  qs.push({
    id: 61,
    text: `Class A has a mean test score of 85 with a MAD of 2. Class B has a mean of 85 with a MAD of 10. What can you conclude?`,
    options: ["Class A's scores are more consistent (less spread out).", "Class B's scores are more consistent.", "Both classes have the exact same scores.", "Class B performed better overall."],
    correctAnswer: 0,
    explanation: `A lower Mean Absolute Deviation (MAD) means the data points are closer to the mean, indicating more consistency.`
  });

  // 62. Tax and Tip
  const mealCost = getRandomInt(20, 150);
  const taxRate = getRandomInt(5, 12);
  const tipRate = getRandomInt(15, 25);
  const taxAmt = mealCost * (taxRate / 100);
  const tipAmt = mealCost * (tipRate / 100);
  const totalMeal = (mealCost + taxAmt + tipAmt).toFixed(2);
  qs.push({
    id: 62,
    text: `Your meal costs $${mealCost}. You pay ${taxRate}% tax and leave a ${tipRate}% tip (both calculated on the original meal cost). What is the total amount paid?`,
    options: [`$${totalMeal}`, `$${(mealCost + taxAmt).toFixed(2)}`, `$${(mealCost + tipAmt).toFixed(2)}`, `$${(mealCost * 1.5).toFixed(2)}`],
    correctAnswer: 0,
    explanation: `Tax = ${taxRate}% of ${mealCost} = $${taxAmt.toFixed(2)}. Tip = ${tipRate}% of ${mealCost} = $${tipAmt.toFixed(2)}. Total = ${mealCost} + ${taxAmt.toFixed(2)} + ${tipAmt.toFixed(2)} = $${totalMeal}.`
  });

  // 63. Commission
  const sales = getRandomInt(10, 100) * 100;
  const commRate = getRandomInt(3, 15);
  const commission = (sales * commRate) / 100;
  qs.push({
    id: 63,
    text: `A salesperson earns a ${commRate}% commission on all sales. If they sell $${sales} worth of goods, how much commission do they earn?`,
    options: [`$${commission}`, `$${commission + 100}`, `$${sales - commission}`, `$${commission * 2}`],
    correctAnswer: 0,
    explanation: `Commission = ${commRate}% of ${sales} = (${commRate}/100) × ${sales} = $${commission}.`
  });

  // 64. Percent Increase
  const oldVal64 = getRandomInt(40, 150);
  const newVal64 = oldVal64 + getRandomInt(10, 50);
  const pctInc64 = (((newVal64 - oldVal64) / oldVal64) * 100).toFixed(1);
  qs.push({
    id: 64,
    text: `A store bought a jacket for $${oldVal64} and marked it up to $${newVal64}. What was the percent increase (markup)?`,
    options: ensureUniqueOptions([`${pctInc64}%`, `${(((newVal64 - oldVal64) / newVal64) * 100).toFixed(1)}%`, `${(newVal64 - oldVal64)}%`, `${(parseFloat(pctInc64) * 2).toFixed(1)}%`], 0),
    correctAnswer: 0,
    explanation: `Percent Increase = (Amount of Increase / Original) × 100 = (${newVal64 - oldVal64} / ${oldVal64}) × 100 ≈ ${pctInc64}%.`
  });

  // 65. Percent Decrease
  const startPop = getRandomInt(500, 2000);
  const endPop = startPop - getRandomInt(50, 400);
  const pctDec = (((startPop - endPop) / startPop) * 100).toFixed(1);
  qs.push({
    id: 65,
    text: `A town's population decreased from ${startPop} to ${endPop}. What was the percent decrease?`,
    options: ensureUniqueOptions([`${pctDec}%`, `${(((startPop - endPop) / endPop) * 100).toFixed(1)}%`, `${startPop - endPop}%`, `${(parseFloat(pctDec) / 2).toFixed(1)}%`], 0),
    correctAnswer: 0,
    explanation: `Percent Decrease = (Amount of Decrease / Original) × 100 = (${startPop - endPop} / ${startPop}) × 100 ≈ ${pctDec}%.`
  });

  // 66. Complex Fractions
  const cfNum = getRandomInt(1, 8);
  const cfDen = getRandomInt(9, 15);
  const cfWhole = getRandomInt(2, 10);
  const finalDen = cfDen * cfWhole;
  const simplified = simplifyFraction(cfNum, finalDen);
  qs.push({
    id: 66,
    text: `Simplify the complex fraction: (${cfNum}/${cfDen}) / ${cfWhole}`,
    options: ensureUniqueOptions([`${simplified}`, `${cfNum * cfWhole}/${cfDen}`, `${cfDen}/${cfNum * cfWhole}`, `${cfWhole}/${cfDen}`], 0),
    correctAnswer: 0,
    explanation: `(${cfNum}/${cfDen}) ÷ ${cfWhole} = (${cfNum}/${cfDen}) × (1/${cfWhole}) = ${cfNum}/(${cfDen} × ${cfWhole}) = ${cfNum}/${finalDen} = ${simplified}.`
  });

  // 67. Adding Linear Expressions
  const le1a = getRandomInt(2, 12);
  const le1b = getRandomInt(1, 15);
  const le2a = getRandomInt(3, 15);
  const le2b = getRandomInt(2, 20);
  qs.push({
    id: 67,
    text: `Add the expressions: (${le1a}x + ${le1b}) + (${le2a}x - ${le2b})`,
    options: [`${le1a + le2a}x ${le1b - le2b < 0 ? '-' : '+'} ${Math.abs(le1b - le2b)}`, `${le1a + le2a}x + ${le1b + le2b}`, `${le1a - le2a}x ${le1b - le2b < 0 ? '-' : '+'} ${Math.abs(le1b - le2b)}`, `${le1a * le2a}x - ${le1b * le2b}`],
    correctAnswer: 0,
    explanation: `Combine like terms: (${le1a}x + ${le2a}x) + (${le1b} - ${le2b}) = ${le1a + le2a}x ${le1b - le2b < 0 ? '-' : '+'} ${Math.abs(le1b - le2b)}.`
  });

  // 68. Subtracting Linear Expressions
  qs.push({
    id: 68,
    text: `Subtract the expressions: (${le2a}x + ${le2b}) - (${le1a}x - ${le1b})`,
    options: [`${le2a - le1a}x + ${le2b + le1b}`, `${le2a - le1a}x + ${le2b - le1b}`, `${le2a + le1a}x + ${le2b + le1b}`, `${le2a - le1a}x - ${le2b + le1b}`],
    correctAnswer: 0,
    explanation: `Distribute the negative: ${le2a}x + ${le2b} - ${le1a}x + ${le1b}. Combine like terms: (${le2a}x - ${le1a}x) + (${le2b} + ${le1b}) = ${le2a - le1a}x + ${le2b + le1b}.`
  });

  // 69. Angle Relationships (Complementary)
  const compAngle69 = getRandomInt(10, 80);
  qs.push({
    id: 69,
    text: `Two angles are complementary. If one angle measures ${compAngle69}°, what is the measure of the other angle?`,
    options: [`${90 - compAngle69}°`, `${180 - compAngle69}°`, `${compAngle69}°`, `${90 + compAngle69}°`],
    correctAnswer: 0,
    explanation: `Complementary angles add up to 90°. 90° - ${compAngle69}° = ${90 - compAngle69}°.`
  });

  // 70. Angle Relationships (Supplementary)
  const suppAngle = getRandomInt(20, 160);
  qs.push({
    id: 70,
    text: `Two angles are supplementary. If one angle measures ${suppAngle}°, what is the measure of the other angle?`,
    options: [`${180 - suppAngle}°`, `${90 - suppAngle > 0 ? 90 - suppAngle : 360 - suppAngle}°`, `${suppAngle}°`, `${180 + suppAngle}°`],
    correctAnswer: 0,
    explanation: `Supplementary angles add up to 180°. 180° - ${suppAngle}° = ${180 - suppAngle}°.`
  });

  // 71. Vertical Angles
  const vertAngle = getRandomInt(10, 170);
  qs.push({
    id: 71,
    text: `Angles A and B are vertical angles. If Angle A measures ${vertAngle}°, what is the measure of Angle B?`,
    options: [`${vertAngle}°`, `${180 - vertAngle}°`, `${90 - vertAngle > 0 ? 90 - vertAngle : 360 - vertAngle}°`, `${vertAngle / 2}°`],
    correctAnswer: 0,
    explanation: `Vertical angles are always equal. Therefore, Angle B is also ${vertAngle}°.`
  });

  // 72. Circumference of a Circle
  const circRadius = getRandomInt(4, 30);
  const circumference = (2 * 3.14 * circRadius).toFixed(2);
  qs.push({
    id: 72,
    text: `What is the approximate circumference of a circle with a radius of ${circRadius} cm? (Use π ≈ 3.14)`,
    options: [`${circumference} cm`, `${(3.14 * circRadius * circRadius).toFixed(2)} cm`, `${(3.14 * circRadius).toFixed(2)} cm`, `${(parseFloat(circumference) * 2).toFixed(2)} cm`],
    correctAnswer: 0,
    explanation: `Circumference = 2πr = 2 × 3.14 × ${circRadius} = ${circumference}.`
  });

  // 73. Area of a Semicircle
  const semiRadius = getRandomInt(4, 25);
  const semiArea = (0.5 * 3.14 * semiRadius * semiRadius).toFixed(2);
  qs.push({
    id: 73,
    text: `What is the approximate area of a semicircle with a radius of ${semiRadius} m? (Use π ≈ 3.14)`,
    options: [`${semiArea} m²`, `${(3.14 * semiRadius * semiRadius).toFixed(2)} m²`, `${(3.14 * semiRadius).toFixed(2)} m²`, `${(0.5 * 3.14 * semiRadius).toFixed(2)} m²`],
    correctAnswer: 0,
    explanation: `Area of a full circle = πr². Area of a semicircle = ½πr² = 0.5 × 3.14 × ${semiRadius}² = ${semiArea}.`
  });

  // 74. Volume of a Rectangular Prism
  const lPrism = getRandomInt(3, 15);
  const wPrism = getRandomInt(2, 12);
  const hPrism = getRandomInt(4, 20);
  qs.push({
    id: 74,
    text: `Find the volume of a rectangular prism with length ${lPrism} cm, width ${wPrism} cm, and height ${hPrism} cm.`,
    diagram: (
      <svg width="150" height="120" viewBox="0 0 150 120" className="mx-auto">
        <rect x="40" y="20" width="80" height="60" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
        <line x1="20" y1="40" x2="40" y2="20" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
        <line x1="100" y1="40" x2="120" y2="20" stroke="#3b82f6" strokeWidth="2" />
        <line x1="20" y1="100" x2="40" y2="80" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
        <line x1="100" y1="100" x2="120" y2="80" stroke="#3b82f6" strokeWidth="2" />
        <rect x="20" y="40" width="80" height="60" fill="#eff6ff" fillOpacity="0.5" stroke="#3b82f6" strokeWidth="2" />
        <text x="60" y="115" fontSize="12" fill="#0f172a" textAnchor="middle">{lPrism} cm</text>
        <text x="125" y="60" fontSize="12" fill="#0f172a">{wPrism} cm</text>
        <text x="5" y="75" fontSize="12" fill="#0f172a">{hPrism} cm</text>
      </svg>
    ),
    options: ensureUniqueOptions([`${lPrism * wPrism * hPrism} cm³`, `${2 * (lPrism*wPrism + wPrism*hPrism + lPrism*hPrism)} cm³`, `${lPrism + wPrism + hPrism} cm³`, `${(lPrism * wPrism * hPrism) / 2} cm³`], 0),
    correctAnswer: 0,
    explanation: `Volume = length × width × height = ${lPrism} × ${wPrism} × ${hPrism} = ${lPrism * wPrism * hPrism}.`
  });

  // 75. Surface Area of a Rectangular Prism
  const lPrism75 = getRandomInt(3, 15);
  const wPrism75 = getRandomInt(2, 12);
  const hPrism75 = getRandomInt(4, 20);
  const saRectPrism = 2 * (lPrism75 * wPrism75 + wPrism75 * hPrism75 + lPrism75 * hPrism75);
  qs.push({
    id: 75,
    text: `Find the surface area of a rectangular prism with length ${lPrism75} cm, width ${wPrism75} cm, and height ${hPrism75} cm.`,
    options: [`${saRectPrism} cm²`, `${lPrism75 * wPrism75 * hPrism75} cm²`, `${saRectPrism / 2} cm²`, `${lPrism75 + wPrism75 + hPrism75} cm²`],
    correctAnswer: 0,
    explanation: `Surface Area = 2(lw + wh + lh) = 2(${lPrism75}×${wPrism75} + ${wPrism75}×${hPrism75} + ${lPrism75}×${hPrism75}) = 2(${lPrism75 * wPrism75} + ${wPrism75 * hPrism75} + ${lPrism75 * hPrism75}) = ${saRectPrism}.`
  });

  // 76. Probability of Not an Event
  const probA = getRandomInt(1, 8);
  const probB = getRandomInt(9, 20);
  qs.push({
    id: 76,
    text: `If the probability of an event happening is ${probA}/${probB}, what is the probability of the event NOT happening?`,
    options: ensureUniqueOptions([`${probB - probA}/${probB}`, `${probA}/${probB}`, `${probB}/${probA}`, `1/${probB}`], 0),
    correctAnswer: 0,
    explanation: `P(Not Event) = 1 - P(Event) = ${probB}/${probB} - ${probA}/${probB} = ${probB - probA}/${probB}.`
  });

  // 77. Tree Diagram / Sample Space
  const shirts = getRandomInt(3, 10);
  const pants = getRandomInt(2, 8);
  const shoes = getRandomInt(2, 6);
  qs.push({
    id: 77,
    text: `You are choosing an outfit. You have ${shirts} shirts, ${pants} pairs of pants, and ${shoes} pairs of shoes. How many different outfit combinations are possible?`,
    options: [`${shirts * pants * shoes}`, `${shirts + pants + shoes}`, `${shirts * pants}`, `${(shirts * pants * shoes) / 2}`],
    correctAnswer: 0,
    explanation: `Use the Fundamental Counting Principle: multiply the number of options for each category. ${shirts} × ${pants} × ${shoes} = ${shirts * pants * shoes}.`
  });

  // 78. Multi-Step Word Problem (Money)
  const allowance = getRandomInt(20, 100);
  const spentFrac = getRandomInt(2, 5);
  const earnedExtra = getRandomInt(5, 30);
  const finalMoney = (allowance - (allowance / spentFrac) + earnedExtra).toFixed(2);
  qs.push({
    id: 78,
    text: `You receive $${allowance} for allowance. You spend 1/${spentFrac} of it on a movie, then earn $${earnedExtra} washing the car. How much money do you have now?`,
    options: ensureUniqueOptions([`$${finalMoney}`, `$${(allowance / spentFrac + earnedExtra).toFixed(2)}`, `$${(allowance - earnedExtra).toFixed(2)}`, `$${(allowance + earnedExtra).toFixed(2)}`], 0),
    correctAnswer: 0,
    explanation: `Spent = $${allowance} × (1/${spentFrac}) = $${allowance / spentFrac}. Remaining = ${allowance} - ${allowance / spentFrac} = $${allowance - (allowance / spentFrac)}. Add earnings: ${allowance - (allowance / spentFrac)} + ${earnedExtra} = $${finalMoney}.`
  });

  // 79. Similar Figures
  const simSide1 = getRandomInt(3, 12);
  const simSide2 = getRandomInt(7, 25);
  const simScale = getRandomInt(2, 6);
  qs.push({
    id: 79,
    text: `Two triangles are similar. A side on the smaller triangle is ${simSide1} cm, and the corresponding side on the larger triangle is ${simSide1 * simScale} cm. If another side on the smaller triangle is ${simSide2} cm, what is the corresponding side on the larger triangle?`,
    diagram: (
      <svg width="100%" height="120" viewBox="0 0 200 80" className="mx-auto max-w-sm">
        {/* Smaller Triangle */}
        <polygon points="20,60 60,60 40,20" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
        <text x="40" y="72" fontSize="10" textAnchor="middle" fill="#3b82f6">{simSide1} cm</text>
        <text x="20" y="35" fontSize="10" textAnchor="middle" fill="#3b82f6">{simSide2} cm</text>
        
        {/* Larger Triangle */}
        <polygon points="90,60 170,60 130,10" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
        <text x="130" y="72" fontSize="10" textAnchor="middle" fill="#22c55e">{simSide1 * simScale} cm</text>
        <text x="95" y="30" fontSize="10" textAnchor="middle" fill="#22c55e">? cm</text>
      </svg>
    ),
    options: [`${simSide2 * simScale} cm`, `${simSide2 + simScale} cm`, `${(simSide2 / simScale).toFixed(1)} cm`, `${simSide2 * 2} cm`],
    correctAnswer: 0,
    explanation: `The scale factor is ${simSide1 * simScale} / ${simSide1} = ${simScale}. Multiply the other side by the scale factor: ${simSide2} × ${simScale} = ${simSide2 * simScale}.`
  });

  // 80. Constant Speed Word Problem
  const speedDist = getRandomInt(120, 600);
  const speedTime = getRandomInt(2, 10);
  const newTime = getRandomInt(11, 20);
  const speedRate = speedDist / speedTime;
  qs.push({
    id: 80,
    text: `A car travels ${speedDist} miles in ${speedTime} hours at a constant speed. How far will it travel in ${newTime} hours at the same speed?`,
    diagram: (
      <svg width="100%" height="100" viewBox="0 0 200 50" className="mx-auto max-w-sm">
        <line x1="20" y1="25" x2="180" y2="25" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="20" cy="25" r="4" fill="#3b82f6" />
        <circle cx="100" cy="25" r="4" fill="#3b82f6" />
        <circle cx="180" cy="25" r="4" fill="#3b82f6" />
        
        <text x="60" y="15" fontSize="10" textAnchor="middle" fill="#64748b">{speedDist} miles</text>
        <text x="60" y="40" fontSize="10" textAnchor="middle" fill="#64748b">{speedTime} hours</text>
        
        <text x="140" y="15" fontSize="10" textAnchor="middle" fill="#64748b">? miles</text>
        <text x="140" y="40" fontSize="10" textAnchor="middle" fill="#64748b">{newTime} hours</text>
      </svg>
    ),
    options: [`${speedRate * newTime} miles`, `${speedDist + newTime * 10} miles`, `${speedRate * 2} miles`, `${(speedDist / newTime).toFixed(1)} miles`],
    correctAnswer: 0,
    explanation: `Find the unit rate (speed): ${speedDist} ÷ ${speedTime} = ${speedRate} mph. Multiply by new time: ${speedRate} × ${newTime} = ${speedRate * newTime} miles.`
  });
  }

  // Shuffle the array
  for (let i = qs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [qs[i], qs[j]] = [qs[j], qs[i]];
  }

  // Return all 80 questions
  return qs;
};
