import React from 'react';
import { Question } from '../questions';

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

/** Generate unique options with the correct answer guaranteed, shuffled randomly */
const generateUniqueOptions = (
  correct: string,
  candidates: string[],
  fallbackFn?: () => string
): { options: string[]; correctIndex: number } => {
  const unique = [correct];
  for (const c of candidates) {
    if (!unique.includes(c) && unique.length < 4) unique.push(c);
  }
  // Pad with fallback if not enough unique distractors
  let pad = 1;
  while (unique.length < 4) {
    if (fallbackFn) {
      const f = fallbackFn();
      if (!unique.includes(f)) unique.push(f);
      else pad++;
    } else {
      const f = `${parseFloat(correct) + pad}`;
      if (!unique.includes(f)) unique.push(f);
      pad++;
    }
  }
  // Shuffle
  const shuffled = unique.sort(() => Math.random() - 0.5);
  return {
    options: shuffled,
    correctIndex: shuffled.indexOf(correct),
  };
};

// Fix #1: Non-function case now has repeated x mapping to DIFFERENT y values
export const generateIdentifyFunction = (): Question => {
  const isFunction = Math.random() > 0.5;

  let displayX: number[];
  let yValues: number[];

  if (isFunction) {
    displayX = [1, 2, 3, 4];
    yValues = [5, 6, 7, 8];
  } else {
    // x=1 appears twice with DIFFERENT y-values → not a function
    displayX = [1, 2, 1, 4];
    const y1 = getRandomInt(3, 6);
    let y2: number;
    do {
      y2 = getRandomInt(3, 9);
    } while (y2 === y1);
    yValues = [y1, getRandomInt(5, 9), y2, getRandomInt(5, 9)];
  }

  return {
    id: 0,
    text: `Does the following set of ordered pairs represent a function? {${displayX.map((x, i) => `(${x}, ${yValues[i]})`).join(', ')}}`,
    options: ["Yes, it is a function", "No, it is not a function"],
    correctAnswer: isFunction ? 0 : 1,
    explanation: isFunction
      ? `Yes, because every input (x) has exactly one output (y).`
      : `No, because the input ${displayX[0]} is paired with two different outputs (${yValues[0]} and ${yValues[2]}).`
  };
};

// Fix #6: Avoid num = 1 to prevent equivalent distractors
export const generateScientificNotation = (): Question => {
  const num = getRandomInt(2, 9);
  const exp = getRandomInt(3, 7);
  const standard = num * Math.pow(10, exp);

  const answer = `${num} × 10^${exp}`;
  const { options, correctIndex } = generateUniqueOptions(answer, [
    `${num} × 10^${exp - 1}`,
    `${num} × 10^${exp + 1}`,
    `${num * 10} × 10^${exp - 1}`,
    `${num + 1} × 10^${exp}`,
  ]);

  return {
    id: 0,
    text: `Express ${standard.toLocaleString()} in scientific notation.`,
    options,
    correctAnswer: correctIndex,
    explanation: `To write ${standard.toLocaleString()} in scientific notation, move the decimal point ${exp} places to the left to get ${num}. The power of 10 is the number of places moved: ${num} × 10^${exp}.`
  };
};

// Fix #8: Ensure a ≠ b to avoid "0" distractor from Math.abs(a - b)
export const generatePythagoreanTheorem = (): Question => {
  let a: number, b: number;
  do {
    a = getRandomInt(3, 12);
    b = getRandomInt(4, 16);
  } while (a === b);

  const cSquared = a * a + b * b;
  const c = Math.sqrt(cSquared);
  const isPerfect = Number.isInteger(c);
  const cDisplay = isPerfect ? `${c}` : `${c.toFixed(2)}`;

  const answer = cDisplay;
  const { options, correctIndex } = generateUniqueOptions(answer, [
    `${a + b}`,
    `${Math.abs(a - b)}`,
    `${(a * b) / 2}`,
    `${cSquared}`,
  ]);

  return {
    id: 0,
    text: `A right triangle has legs of length ${a} and ${b}. What is the length of the hypotenuse?`,
    options,
    correctAnswer: correctIndex,
    explanation: `Use the Pythagorean Theorem: a² + b² = c². ${a}² + ${b}² = ${a * a} + ${b * b} = ${cSquared}. The square root of ${cSquared} is ${cDisplay}.`
  };
};

// Fix #3: Rule-specific distractors to avoid duplicates (e.g., m*n = m+n+1)
export const generateExponentRules = (): Question => {
  const base = getRandomInt(2, 5);
  const m = getRandomInt(2, 6);
  const n = getRandomInt(2, 6);
  const type = getRandomInt(1, 3); // 1: Product, 2: Quotient, 3: Power of Power

  let text = '';
  let ans = '';
  let expl = '';
  let distractors: string[];

  if (type === 1) {
    text = `Simplify: ${base}^${m} × ${base}^${n}`;
    ans = `${base}^${m + n}`;
    expl = `Product Rule: a^m × a^n = a^(m+n). So, ${base}^${m} × ${base}^${n} = ${base}^(${m}+${n}) = ${base}^${m + n}.`;
    distractors = [
      `${base}^${m * n}`,
      `${base}^${Math.abs(m - n) || 1}`,
      `${base * 2}^${m + n}`,
      `${base}^${m + n + 1}`,
    ];
  } else if (type === 2) {
    const topExp = m + n;
    text = `Simplify: ${base}^${topExp} / ${base}^${n}`;
    ans = `${base}^${m}`;
    expl = `Quotient Rule: a^m / a^n = a^(m-n). So, ${base}^${topExp} / ${base}^${n} = ${base}^(${topExp}-${n}) = ${base}^${m}.`;
    distractors = [
      `${base}^${topExp + n}`,
      `${base}^${m * n}`,
      `${base}^${m + 1}`,
      `1^${m}`,
    ];
  } else {
    text = `Simplify: (${base}^${m})^${n}`;
    ans = `${base}^${m * n}`;
    expl = `Power of a Power Rule: (a^m)^n = a^(m×n). So, (${base}^${m})^${n} = ${base}^(${m}×${n}) = ${base}^${m * n}.`;
    distractors = [
      `${base}^${m + n}`,
      `${base}^${m * n + 1}`,
      `${base * n}^${m}`,
      `${base}^${m * n - 1}`,
    ];
  }

  const { options, correctIndex } = generateUniqueOptions(ans, distractors);

  return {
    id: 0,
    text,
    options,
    correctAnswer: correctIndex,
    explanation: expl
  };
};

// Fix #9: Removed dead `vol` variable computed with Math.PI
export const generateVolumeCylinder = (): Question => {
  const r = getRandomInt(2, 10);
  const h = getRandomInt(5, 15);
  const vol = (3.14 * r * r * h).toFixed(2);

  return {
    id: 0,
    text: `Find the volume of a cylinder with a radius of ${r} cm and a height of ${h} cm. (Use π ≈ 3.14)`,
    options: [
      `${vol} cm³`,
      `${(3.14 * r * 2 * h).toFixed(2)} cm³`,
      `${(3.14 * r * r).toFixed(2)} cm³`,
      `${(r * r * h).toFixed(2)} cm³`,
    ],
    correctAnswer: 0,
    explanation: `Volume of a Cylinder = πr²h = 3.14 × ${r}² × ${h} = 3.14 × ${r * r} × ${h} = ${vol} cm³.`
  };
};

// Fix #2: Deduplicated options for slope, handles slope = ±1 and edge cases
export const generateSlopeFromPoints = (): Question => {
  const x1 = getRandomInt(-5, 5);
  const y1 = getRandomInt(-5, 5);
  const slope = getRandomInt(-3, 3) || 1;
  const run = getRandomInt(1, 4);
  const x2 = x1 + run;
  const y2 = y1 + slope * run;
  const rise = y2 - y1;

  const answer = `${slope}`;
  const candidateDistractors = [
    `${-slope}`,
    rise !== 0 ? `${run}/${rise}` : `${run}`,
    `${rise}`,
    `${slope + 1}`,
    `${slope - 1}`,
    `${run}`,
  ];

  const { options, correctIndex } = generateUniqueOptions(answer, candidateDistractors);

  return {
    id: 0,
    text: `Find the slope of the line passing through the points (${x1}, ${y1}) and (${x2}, ${y2}).`,
    options,
    correctAnswer: correctIndex,
    explanation: `Slope (m) = (y2 - y1) / (x2 - x1) = (${y2} - ${y1}) / (${x2} - ${x1}) = ${rise} / ${run} = ${slope}.`
  };
};

export const generateRationalIrrational = (): Question => {
  const isRational = Math.random() > 0.5;
  const perfectSquares = [4, 9, 16, 25, 36, 49, 64, 81, 100];
  const nonPerfect = [2, 3, 5, 7, 8, 10, 11, 12];

  const val = isRational
    ? perfectSquares[getRandomInt(0, perfectSquares.length - 1)]
    : nonPerfect[getRandomInt(0, nonPerfect.length - 1)];

  return {
    id: 0,
    text: `Is the square root of ${val} (√${val}) a rational or irrational number?`,
    options: ["Rational", "Irrational"],
    correctAnswer: isRational ? 0 : 1,
    explanation: isRational
      ? `Rational, because ${val} is a perfect square (${Math.sqrt(val)}² = ${val}).`
      : `Irrational, because ${val} is not a perfect square, so its square root is a non-terminating, non-repeating decimal.`
  };
};

export const generateVolumeCone = (): Question => {
  const r = getRandomInt(3, 9);
  const h = getRandomInt(4, 12);
  const vol = ((1 / 3) * 3.14 * r * r * h).toFixed(2);

  return {
    id: 0,
    text: `Find the volume of a cone with a radius of ${r} cm and a height of ${h} cm. (Use π ≈ 3.14)`,
    options: [
      `${vol} cm³`,
      `${(3.14 * r * r * h).toFixed(2)} cm³`,
      `${(3.14 * r * h).toFixed(2)} cm³`,
      `${(parseFloat(vol) * 3).toFixed(2)} cm³`,
    ],
    correctAnswer: 0,
    explanation: `Volume of a Cone = (1/3)πr²h = (1/3) × 3.14 × ${r}² × ${h} = (1/3) × 3.14 × ${r * r} × ${h} = ${vol} cm³.`
  };
};

export const generateVolumeSphere = (): Question => {
  const r = getRandomInt(3, 6);
  const vol = ((4 / 3) * 3.14 * r * r * r).toFixed(2);

  return {
    id: 0,
    text: `Find the volume of a sphere with a radius of ${r} cm. (Use π ≈ 3.14)`,
    options: [
      `${vol} cm³`,
      `${(3.14 * r * r * r).toFixed(2)} cm³`,
      `${(4 * 3.14 * r * r).toFixed(2)} cm³`,
      `${(parseFloat(vol) / 2).toFixed(2)} cm³`,
    ],
    correctAnswer: 0,
    explanation: `Volume of a Sphere = (4/3)πr³ = (4/3) × 3.14 × ${r}³ = (4/3) × 3.14 × ${r * r * r} = ${vol} cm³.`
  };
};

export const generateDilation = (): Question => {
  const scale = getRandomInt(2, 4);
  const x = getRandomInt(1, 5);
  const y = getRandomInt(1, 5);

  return {
    id: 0,
    text: `A point P(${x}, ${y}) is dilated about the origin with a scale factor of ${scale}. What are the coordinates of the image P'?`,
    options: [
      `(${x * scale}, ${y * scale})`,
      `(${x + scale}, ${y + scale})`,
      `(${x / scale}, ${y / scale})`,
      `(${y}, ${x})`,
    ],
    correctAnswer: 0,
    explanation: `To dilate a point about the origin, multiply both the x and y coordinates by the scale factor. P' = (${x} × ${scale}, ${y} × ${scale}) = (${x * scale}, ${y * scale}).`
  };
};

// Fix #10: Randomized scatter plot trend with multiple correlation types
export const generateScatterPlotTrend = (): Question => {
  const types = [
    {
      correlation: 'strong positive',
      vars: ['hours studied', 'test scores'],
      correct: 'As hours studied increase, test scores tend to increase.',
      distractors: [
        'As hours studied increase, test scores tend to decrease.',
        'There is no relationship between hours studied and test scores.',
        'Test scores remain constant regardless of hours studied.',
      ],
      explanationDetail: 'as one variable increases, the other variable also tends to increase',
    },
    {
      correlation: 'strong negative',
      vars: ['temperature', 'hot chocolate sales'],
      correct: 'As temperature increases, hot chocolate sales tend to decrease.',
      distractors: [
        'As temperature increases, hot chocolate sales tend to increase.',
        'There is no relationship between temperature and hot chocolate sales.',
        'Hot chocolate sales remain constant regardless of temperature.',
      ],
      explanationDetail: 'as one variable increases, the other variable tends to decrease',
    },
    {
      correlation: 'strong positive',
      vars: ['hours of practice', 'free throw accuracy'],
      correct: 'As hours of practice increase, free throw accuracy tends to increase.',
      distractors: [
        'As hours of practice increase, free throw accuracy tends to decrease.',
        'There is no relationship between practice and accuracy.',
        'Free throw accuracy remains constant regardless of practice.',
      ],
      explanationDetail: 'as one variable increases, the other variable also tends to increase',
    },
    {
      correlation: 'strong negative',
      vars: ['distance from a city center', 'land price per square foot'],
      correct: 'As distance from the city center increases, land price tends to decrease.',
      distractors: [
        'As distance from the city center increases, land price tends to increase.',
        'There is no relationship between distance and land price.',
        'Land price remains constant regardless of distance.',
      ],
      explanationDetail: 'as one variable increases, the other variable tends to decrease',
    },
    {
      correlation: 'no',
      vars: ['shoe size', 'test scores'],
      correct: 'There is no clear relationship between shoe size and test scores.',
      distractors: [
        'As shoe size increases, test scores tend to increase.',
        'As shoe size increases, test scores tend to decrease.',
        'Test scores are perfectly predicted by shoe size.',
      ],
      explanationDetail: 'the variables do not show any consistent pattern together',
    },
  ];

  const t = types[getRandomInt(0, types.length - 1)];

  return {
    id: 0,
    text: `A scatter plot shows a ${t.correlation} correlation between ${t.vars[0]} and ${t.vars[1]}. Which of the following best describes the trend?`,
    options: [t.correct, ...t.distractors],
    correctAnswer: 0,
    explanation: `A ${t.correlation} correlation means that ${t.explanationDetail}.`
  };
};

// Fix #4: SVG Y-axis inverted for correct visual rendering, added point labels
export const generatePythagoreanDistance = (): Question => {
  const x1 = getRandomInt(1, 4);
  const y1 = getRandomInt(1, 4);
  const dx = getRandomInt(3, 6);
  const dy = getRandomInt(3, 6);
  const x2 = x1 + dx;
  const y2 = y1 + dy;

  const distSq = dx * dx + dy * dy;
  const dist = Math.sqrt(distSq);
  const isPerfect = Number.isInteger(dist);
  const distDisplay = isPerfect ? `${dist}` : `${dist.toFixed(2)}`;

  const maxSvgY = 12;
  const svgY = (y: number) => maxSvgY - y;

  return {
    id: 0,
    text: `What is the distance between the points (${x1}, ${y1}) and (${x2}, ${y2}) on the coordinate plane?`,
    diagram: (
      <svg width="200" height="200" viewBox="-1 -1 14 14" className="mx-auto border bg-white my-4">
        {/* Axes */}
        <line x1="0" y1={svgY(0)} x2="13" y2={svgY(0)} stroke="#94a3b8" strokeWidth="0.1" />
        <line x1="0" y1="-1" x2="0" y2="13" stroke="#94a3b8" strokeWidth="0.1" />
        {/* Tick marks */}
        {[2, 4, 6, 8, 10, 12].map(v => (
          <g key={`tick-${v}`}>
            <line x1={v} y1={svgY(0) - 0.2} x2={v} y2={svgY(0) + 0.2} stroke="#94a3b8" strokeWidth="0.06" />
            <text x={v} y={svgY(0) + 0.9} fontSize="0.7" textAnchor="middle" fill="#64748b">{v}</text>
            <line x1={-0.2} y1={svgY(v)} x2={0.2} y2={svgY(v)} stroke="#94a3b8" strokeWidth="0.06" />
            <text x={-0.7} y={svgY(v) + 0.25} fontSize="0.7" textAnchor="middle" fill="#64748b">{v}</text>
          </g>
        ))}
        {/* Dashed line between points */}
        <line
          x1={x1} y1={svgY(y1)}
          x2={x2} y2={svgY(y2)}
          stroke="#3b82f6" strokeWidth="0.1" strokeDasharray="0.4"
        />
        {/* Right-angle helper lines (optional visual aid) */}
        <line
          x1={x1} y1={svgY(y1)}
          x2={x2} y2={svgY(y1)}
          stroke="#94a3b8" strokeWidth="0.06" strokeDasharray="0.3"
        />
        <line
          x1={x2} y1={svgY(y1)}
          x2={x2} y2={svgY(y2)}
          stroke="#94a3b8" strokeWidth="0.06" strokeDasharray="0.3"
        />
        {/* Points */}
        <circle cx={x1} cy={svgY(y1)} r="0.2" fill="#3b82f6" />
        <circle cx={x2} cy={svgY(y2)} r="0.2" fill="#3b82f6" />
        {/* Labels */}
        <text x={x1 - 0.3} y={svgY(y1) - 0.5} fontSize="0.7" fill="#3b82f6" textAnchor="end">
          ({x1}, {y1})
        </text>
        <text x={x2 + 0.3} y={svgY(y2) - 0.5} fontSize="0.7" fill="#3b82f6">
          ({x2}, {y2})
        </text>
      </svg>
    ),
    options: [
      distDisplay,
      `${dx + dy}`,
      `${dx * dy}`,
      `${((dx + dy) / 2).toFixed(isPerfect ? 0 : 2)}`,
    ],
    correctAnswer: 0,
    explanation: `The distance between two points (x₁, y₁) and (x₂, y₂) is √((x₂−x₁)² + (y₂−y₁)²).
Distance = √((${x2}−${x1})² + (${y2}−${y1})²) = √(${dx}² + ${dy}²) = √(${dx * dx} + ${dy * dy}) = √${distSq} ≈ ${distDisplay}.`
  };
};

// Fix #7: Dynamic decimal places based on exponent magnitude, trimmed trailing zeros
export const generateScientificNotationConversion = (): Question => {
  const num = getRandomInt(10, 99) / 10;
  const exp = getRandomInt(-5, -2);
  const standard = num * Math.pow(10, exp);

  // Show enough decimal places to capture all significant digits without excess trailing zeros
  const decimalPlaces = Math.abs(exp) + 1;
  const standardDisplay = standard.toFixed(decimalPlaces);

  const answer = `${num} × 10^${exp}`;
  const { options, correctIndex } = generateUniqueOptions(answer, [
    `${num} × 10^${exp + 1}`,
    `${num} × 10^${exp - 1}`,
    `${num * 10} × 10^${exp - 1}`,
    `${num / 10} × 10^${exp + 1}`,
  ]);

  return {
    id: 0,
    text: `Express ${standardDisplay} in scientific notation.`,
    options,
    correctAnswer: correctIndex,
    explanation: `To write ${standardDisplay} in scientific notation, move the decimal point ${Math.abs(exp)} places to the right to get ${num}. Since we moved right, the exponent is negative: ${exp}.`
  };
};

// Fix #11: Distractors validated against the correct answer to prevent collisions
export const generateFunctionNotation = (): Question => {
  const a = getRandomInt(2, 5);
  const b = getRandomInt(1, 10);
  const x = getRandomInt(1, 6);
  const result = a * x + b;

  const answer = `${result}`;
  const candidateDistractors = [
    `${a * x}`,
    `${a + b + x}`,
    `${a * x - b}`,
    `${result + a}`,
    `${result - b}`,
    `${a * (x + b)}`,
  ];

  const { options, correctIndex } = generateUniqueOptions(answer, candidateDistractors);

  return {
    id: 0,
    text: `If f(x) = ${a}x + ${b}, what is the value of f(${x})?`,
    options,
    correctAnswer: correctIndex,
    explanation: `To find f(${x}), substitute ${x} for x in the function: f(${x}) = ${a}(${x}) + ${b} = ${a * x} + ${b} = ${result}.`
  };
};

// Fix #5: SVG Y-axis inverted, lines now visually match equations, intersection labeled
export const generateSystemByGraphing = (): Question => {
  const maxSvgY = 8;
  const svgY = (y: number) => maxSvgY - y;

  return {
    id: 0,
    text: `A system of linear equations consists of y = x + 2 and y = -x + 4. At what point do the two lines intersect?`,
    diagram: (
      <svg width="220" height="220" viewBox="-2 -1 11 11" className="mx-auto border bg-white my-4">
        {/* Axes */}
        <line x1="-2" y1={svgY(0)} x2="9" y2={svgY(0)} stroke="#94a3b8" strokeWidth="0.08" />
        <line x1="0" y1={svgY(-1)} x2="0" y2={svgY(9)} stroke="#94a3b8" strokeWidth="0.08" />
        {/* Tick marks */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map(v => (
          <g key={`tick-${v}`}>
            <line x1={v} y1={svgY(0) - 0.15} x2={v} y2={svgY(0) + 0.15} stroke="#94a3b8" strokeWidth="0.05" />
            <text x={v} y={svgY(0) + 0.7} fontSize="0.55" textAnchor="middle" fill="#64748b">{v}</text>
            <line x1={-0.15} y1={svgY(v)} x2={0.15} y2={svgY(v)} stroke="#94a3b8" strokeWidth="0.05" />
            <text x={-0.5} y={svgY(v) + 0.2} fontSize="0.55" textAnchor="middle" fill="#64748b">{v}</text>
          </g>
        ))}
        {/* y = x + 2 (blue line) */}
        <line
          x1={-2} y1={svgY(-2 + 2)}
          x2={6} y2={svgY(6 + 2)}
          stroke="#3b82f6" strokeWidth="0.15"
        />
        <text x={5.2} y={svgY(7.2)} fontSize="0.55" fill="#3b82f6">y = x + 2</text>
        {/* y = -x + 4 (red line) */}
        <line
          x1={-1} y1={svgY(-(-1) + 4)}
          x2={8} y2={svgY(-(8) + 4)}
          stroke="#ef4444" strokeWidth="0.15"
        />
        <text x={5.5} y={svgY(-1.5)} fontSize="0.55" fill="#ef4444">y = -x + 4</text>
        {/* Intersection at (1, 3) */}
        <circle cx={1} cy={svgY(3)} r="0.18" fill="black" />
        <text x={1.4} y={svgY(3) - 0.3} fontSize="0.6" fill="black" fontWeight="bold">(1, 3)</text>
      </svg>
    ),
    options: ["(1, 3)", "(2, 4)", "(0, 2)", "(3, 1)"],
    correctAnswer: 0,
    explanation: `The intersection point is where both equations are true. For (1, 3): y = 1 + 2 = 3 ✓ and y = -1 + 4 = 3 ✓. The lines cross at (1, 3).`
  };
};

export const generateSystemSubstitution = (): Question => {
  // y = ax + b
  // y = cx + d
  // ax + b = cx + d => (a-c)x = d - b => x = (d-b)/(a-c)
  
  const x = getRandomInt(-5, 5);
  const a = getRandomInt(2, 4);
  const c = getRandomInt(-4, -2);
  const b = getRandomInt(-5, 5);
  const d = (a - c) * x + b;
  const y = a * x + b;

  return {
    id: 0,
    text: `Solve the system of equations using substitution or elimination:
y = ${a}x ${b < 0 ? '-' : '+'} ${Math.abs(b)}
y = ${c}x ${d < 0 ? '-' : '+'} ${Math.abs(d)}`,
    options: [`(${x}, ${y})`, `(${y}, ${x})`, `(${x + 1}, ${y - 1})`, `(${x - 1}, ${y + 1})`],
    correctAnswer: 0,
    explanation: `1. Set the equations equal to each other: ${a}x ${b < 0 ? '-' : '+'} ${Math.abs(b)} = ${c}x ${d < 0 ? '-' : '+'} ${Math.abs(d)}.
2. Add ${Math.abs(c)}x to both sides: ${a - c}x ${b < 0 ? '-' : '+'} ${Math.abs(b)} = ${d}.
3. ${b < 0 ? 'Add' : 'Subtract'} ${Math.abs(b)}: ${a - c}x = ${d - b}.
4. Divide by ${a - c}: x = ${x}.
5. Substitute x = ${x} into the first equation: y = ${a}(${x}) ${b < 0 ? '-' : '+'} ${Math.abs(b)} = ${y}.
The solution is (${x}, ${y}).`
  };
};

export const generateTransformations = (): Question => {
  const type = getRandomInt(1, 3); // 1: Translation, 2: Reflection, 3: Rotation
  const x = getRandomInt(1, 5);
  const y = getRandomInt(1, 5);
  
  let text = '';
  let ans = '';
  let expl = '';
  
  if (type === 1) {
    const dx = getRandomInt(2, 5);
    const dy = getRandomInt(-5, -2);
    text = `Point A(${x}, ${y}) is translated ${dx} units right and ${Math.abs(dy)} units down. What are the coordinates of the image A'?`;
    ans = `(${x + dx}, ${y + dy})`;
    expl = `To translate a point, add the horizontal shift to the x-coordinate and the vertical shift to the y-coordinate. A' = (${x} + ${dx}, ${y} + (${dy})) = (${x + dx}, ${y + dy}).`;
  } else if (type === 2) {
    const axis = Math.random() > 0.5 ? 'x-axis' : 'y-axis';
    text = `Point B(${x}, ${y}) is reflected across the ${axis}. What are the coordinates of the image B'?`;
    ans = axis === 'x-axis' ? `(${x}, ${-y})` : `(${-x}, ${y})`;
    expl = axis === 'x-axis' 
      ? `When reflecting across the x-axis, the x-coordinate stays the same and the y-coordinate changes sign. B' = (${x}, ${-y}).`
      : `When reflecting across the y-axis, the y-coordinate stays the same and the x-coordinate changes sign. B' = (${-x}, ${y}).`;
  } else {
    text = `Point C(${x}, ${y}) is rotated 90° counterclockwise about the origin. What are the coordinates of the image C'?`;
    ans = `(${-y}, ${x})`;
    expl = `A 90° counterclockwise rotation about the origin transforms (x, y) into (-y, x). C' = (${-y}, ${x}).`;
  }
  
  return {
    id: 0,
    text: text,
    options: [ans, `(${x}, ${y})`, `(${-x}, ${-y})`, `(${y}, ${x})`],
    correctAnswer: 0,
    explanation: expl
  };
};

export const generateScientificNotationOperations = (): Question => {
  const isMultiplication = Math.random() > 0.5;
  
  if (isMultiplication) {
    const num1 = getRandomInt(2, 4);
    const exp1 = getRandomInt(2, 5);
    const num2 = getRandomInt(2, 4);
    const exp2 = getRandomInt(3, 6);
    
    // Ensure product of nums is < 10 for simplicity
    const finalNum = num1 * num2;
    const finalExp = exp1 + exp2;
    
    const ans = `${finalNum} × 10^${finalExp}`;
    const distractors = [
      `${finalNum} × 10^${exp1 * exp2}`,
      `${num1 + num2} × 10^${finalExp}`,
      `${finalNum} × 10^${Math.abs(exp1 - exp2)}`,
      `${finalNum * 10} × 10^${finalExp - 1}`
    ];
    
    const { options, correctIndex } = generateUniqueOptions(ans, distractors);
    
    return {
      id: 0,
      text: `Evaluate: (${num1} × 10^${exp1})(${num2} × 10^${exp2}). Express the result in scientific notation.`,
      options,
      correctAnswer: correctIndex,
      explanation: `Multiply the coefficients: ${num1} × ${num2} = ${finalNum}. Add the exponents: ${exp1} + ${exp2} = ${finalExp}. Result: ${finalNum} × 10^${finalExp}.`
    };
  } else {
    // Division
    const finalNum = getRandomInt(2, 4);
    const num2 = getRandomInt(2, 4);
    const num1 = finalNum * num2; // Ensures clean division
    
    const exp1 = getRandomInt(5, 9);
    const exp2 = getRandomInt(2, 4);
    const finalExp = exp1 - exp2;
    
    const ans = `${finalNum} × 10^${finalExp}`;
    const distractors = [
      `${finalNum} × 10^${exp1 + exp2}`,
      `${num1 - num2} × 10^${finalExp}`,
      `${finalNum} × 10^${exp1 * exp2}`,
      `${finalNum / 10} × 10^${finalExp + 1}`
    ];
    
    const { options, correctIndex } = generateUniqueOptions(ans, distractors);
    
    return {
      id: 0,
      text: `Evaluate: (${num1} × 10^${exp1}) / (${num2} × 10^${exp2}). Express the result in scientific notation.`,
      options,
      correctAnswer: correctIndex,
      explanation: `Divide the coefficients: ${num1} ÷ ${num2} = ${finalNum}. Subtract the exponents: ${exp1} - ${exp2} = ${finalExp}. Result: ${finalNum} × 10^${finalExp}.`
    };
  }
};

export const generateComparingFunctions = (): Question => {
  // Function A (Table)
  const slopeA = getRandomInt(2, 4);
  const interceptA = getRandomInt(1, 5);
  const xValues = [0, 1, 2];
  const yValues = xValues.map(x => slopeA * x + interceptA);

  // Function B (Equation)
  const slopeB = slopeA + getRandomInt(1, 3) * (Math.random() > 0.5 ? 1 : -1);
  const interceptB = interceptA + getRandomInt(1, 3) * (Math.random() > 0.5 ? 1 : -1);
  
  // Ensure they aren't totally equal
  const isAGreaterSlope = slopeA > slopeB;
  const isAGreaterIntercept = interceptA > interceptB;

  return {
    id: 0,
    text: `Function A is represented by the table below. Function B is represented by the equation y = ${slopeB}x + ${interceptB}. Which statement is true?`,
    diagram: (
      <table className="mx-auto border-collapse border border-slate-400 my-4">
        <thead>
          <tr>
            <th className="border border-slate-300 px-4 py-2 bg-slate-50">x</th>
            {xValues.map(x => <td key={x} className="border border-slate-300 px-4 py-2 text-center">{x}</td>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="border border-slate-300 px-4 py-2 bg-slate-50">Function A (y)</th>
            {yValues.map((y, i) => <td key={i} className="border border-slate-300 px-4 py-2 text-center">{y}</td>)}
          </tr>
        </tbody>
      </table>
    ),
    options: [
      `Function ${isAGreaterSlope ? 'A' : 'B'} has a greater rate of change.`,
      `Function ${!isAGreaterSlope ? 'A' : 'B'} has a greater rate of change.`,
      `Function ${isAGreaterIntercept ? 'B' : 'A'} has a greater y-intercept.`,
      `Both functions have the same rate of change.`
    ],
    correctAnswer: 0,
    explanation: `Calculate the rate of change (slope) for Function A using the table: (${yValues[1]} - ${yValues[0]}) / (${xValues[1]} - ${xValues[0]}) = ${slopeA}. The slope for Function B is ${slopeB}. Therefore, Function ${isAGreaterSlope ? 'A' : 'B'} has a greater rate of change.`
  };
};

export const generateSystemWordProblem = (): Question => {
  const item1Price = getRandomInt(2, 5);
  const item2Price = getRandomInt(6, 12);
  const numItem1 = getRandomInt(3, 8);
  const numItem2 = getRandomInt(2, 6);
  
  const totalItems = numItem1 + numItem2;
  const totalCost = (item1Price * numItem1) + (item2Price * numItem2);

  const { options, correctIndex } = generateUniqueOptions(String(numItem1), [
    String(numItem2),
    String(numItem1 + 1),
    String(numItem2 + 2),
    String(Math.abs(numItem1 - numItem2)),
    String(totalItems)
  ]);

  return {
    id: 0,
    text: `A family bought a total of ${totalItems} tickets to a movie. Child tickets cost $${item1Price} each, and adult tickets cost $${item2Price} each. If the family spent a total of $${totalCost}, how many child tickets did they buy?`,
    options,
    correctAnswer: correctIndex,
    explanation: `Let c = child tickets and a = adult tickets.
System of equations:
1) c + a = ${totalItems}
2) ${item1Price}c + ${item2Price}a = ${totalCost}
From (1), a = ${totalItems} - c.
Substitute into (2): ${item1Price}c + ${item2Price}(${totalItems} - c) = ${totalCost}.
${item1Price}c + ${item2Price * totalItems} - ${item2Price}c = ${totalCost}.
-${item2Price - item1Price}c = ${totalCost - (item2Price * totalItems)}.
c = ${(totalCost - (item2Price * totalItems)) / -(item2Price - item1Price)}.`
  };
};

export const generateTwoWayTable = (): Question => {
  const boysSports = getRandomInt(20, 40);
  const boysNoSports = getRandomInt(10, 20);
  const girlsSports = getRandomInt(25, 45);
  const girlsNoSports = getRandomInt(5, 15);
  
  const totalBoys = boysSports + boysNoSports;
  const totalGirls = girlsSports + girlsNoSports;
  const totalSports = boysSports + girlsSports;
  const totalNoSports = boysNoSports + girlsNoSports;
  const grandTotal = totalBoys + totalGirls;
  
  return {
    id: 0,
    text: `The table below shows the results of a survey about sports participation. What is the relative frequency of girls who do NOT play sports out of the total number of students?`,
    diagram: (
      <table className="mx-auto border-collapse border border-slate-400 my-4">
        <thead>
          <tr>
            <th className="border border-slate-300 px-4 py-2 bg-slate-50"></th>
            <th className="border border-slate-300 px-4 py-2 bg-slate-50">Sports</th>
            <th className="border border-slate-300 px-4 py-2 bg-slate-50">No Sports</th>
            <th className="border border-slate-300 px-4 py-2 bg-slate-50">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="border border-slate-300 px-4 py-2 bg-slate-50">Boys</th>
            <td className="border border-slate-300 px-4 py-2 text-center">{boysSports}</td>
            <td className="border border-slate-300 px-4 py-2 text-center">{boysNoSports}</td>
            <td className="border border-slate-300 px-4 py-2 text-center">{totalBoys}</td>
          </tr>
          <tr>
            <th className="border border-slate-300 px-4 py-2 bg-slate-50">Girls</th>
            <td className="border border-slate-300 px-4 py-2 text-center">{girlsSports}</td>
            <td className="border border-slate-300 px-4 py-2 text-center">{girlsNoSports}</td>
            <td className="border border-slate-300 px-4 py-2 text-center">{totalGirls}</td>
          </tr>
          <tr>
            <th className="border border-slate-300 px-4 py-2 bg-slate-50">Total</th>
            <td className="border border-slate-300 px-4 py-2 text-center">{totalSports}</td>
            <td className="border border-slate-300 px-4 py-2 text-center">{totalNoSports}</td>
            <td className="border border-slate-300 px-4 py-2 text-center">{grandTotal}</td>
          </tr>
        </tbody>
      </table>
    ),
    options: [
      `${(girlsNoSports / grandTotal).toFixed(2)}`,
      `${(girlsNoSports / totalGirls).toFixed(2)}`,
      `${(girlsNoSports / totalNoSports).toFixed(2)}`,
      `${(totalGirls / grandTotal).toFixed(2)}`
    ],
    correctAnswer: 0,
    explanation: `Relative Frequency = Frequency of Interest / Total Frequency.
1. Frequency of girls who do not play sports = ${girlsNoSports}.
2. Grand Total students = ${grandTotal}.
3. Relative Frequency = ${girlsNoSports} / ${grandTotal} ≈ ${(girlsNoSports / grandTotal).toFixed(2)}.`
  };
};
