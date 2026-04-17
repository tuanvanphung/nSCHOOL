import React from 'react';
import { Question } from '../questions';

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

/** Ensure term1 and term2 are coprime */
const getCoprimeInts = (min1: number, max1: number, min2: number, max2: number): [number, number] => {
  let a: number, b: number;
  do {
    a = getRandomInt(min1, max1);
    b = getRandomInt(min2, max2);
  } while (gcd(a, b) !== 1);
  return [a, b];
};

/** Ensure dividend is divisible by divisor */
const getDivisibleInt = (min: number, max: number, divisor: number): number => {
  const candidates = [];
  for (let i = min; i <= max; i++) {
    if (i % divisor === 0) candidates.push(i);
  }
  return candidates[Math.floor(Math.random() * candidates.length)];
};

/** Format a numeric rate cleanly (no trailing zeros) */
const formatRate = (v: number, unit: string) => `${parseFloat(v.toFixed(2))} ${unit}`;

/** Generate unique numeric options, ensuring correctAnswer is included and shuffled */
const generateUniqueOptions = (correct: number, count = 4, spread = 3): { options: string[]; correctIndex: number } => {
  const set = new Set<number>();
  set.add(correct);
  while (set.size < count) {
    const distractor = correct + getRandomInt(-spread, spread);
    if (distractor !== correct) set.add(distractor);
  }
  const shuffled = Array.from(set).sort(() => Math.random() - 0.5);
  return {
    options: shuffled.map(String),
    correctIndex: shuffled.indexOf(correct),
  };
};

export const generateProportionalTable = (): Question => {
  const isProportional = Math.random() > 0.5;
  const ratio = getRandomInt(2, 6);
  const xValues = [2, 4, 6, 8];

  // Fix #10: Ensure at least two different offsets so the non-proportional case is clearly non-proportional
  let offsets: number[];
  if (!isProportional) {
    do {
      offsets = xValues.map(() => getRandomInt(1, 3));
    } while (new Set(offsets).size === 1);
  } else {
    offsets = xValues.map(() => 0);
  }

  const yValues = xValues.map((x, i) => x * ratio + offsets[i]);

  return {
    id: 0,
    text: `Does the table below represent a proportional relationship?`,
    diagram: (
      <div className="overflow-x-auto">
        <table className="mx-auto border-collapse border border-slate-400 my-4">
          <thead>
            <tr>
              <th className="border border-slate-300 px-4 py-2 bg-slate-50">x</th>
              {xValues.map(x => <td key={x} className="border border-slate-300 px-4 py-2 text-center">{x}</td>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="border border-slate-300 px-4 py-2 bg-slate-50">y</th>
              {yValues.map((y, i) => <td key={i} className="border border-slate-300 px-4 py-2 text-center">{y}</td>)}
            </tr>
          </tbody>
        </table>
      </div>
    ),
    options: ["Yes, it is proportional", "No, it is not proportional"],
    correctAnswer: isProportional ? 0 : 1,
    explanation: isProportional
      ? `Yes, because the ratio y/x is constant: ${simplifyFraction(yValues[0], xValues[0])} = ${simplifyFraction(yValues[1], xValues[1])} = ${ratio}.`
      : `No, because the ratio y/x is not constant. For example, ${yValues[0]}/${xValues[0]} = ${yValues[0] / xValues[0]} but ${yValues[1]}/${xValues[1]} = ${yValues[1] / xValues[1]}.`
  };
};

export const generateProportionalGraph = (): Question => {
  const isProportional = Math.random() > 0.5;
  const slope = getRandomInt(1, 3);
  const intercept = isProportional ? 0 : getRandomInt(1, 3);

  // Fix #2: Clean equation text when intercept is 0
  const equationText = intercept === 0 ? `y = ${slope}x` : `y = ${slope}x + ${intercept}`;

  // Fix #1: SVG coordinate system — Y is inverted, and line is clipped to viewBox
  const maxY = 10;
  const svgY = (mathY: number) => maxY - mathY;
  const clipId = `graphClip-${Math.random().toString(36).slice(2, 8)}`;

  return {
    id: 0,
    text: `Does the graph of the line ${equationText} represent a proportional relationship?`,
    diagram: (
      <svg width="200" height="200" viewBox="-2 -2 14 14" className="mx-auto border bg-white my-4">
        <defs>
          <clipPath id={clipId}>
            <rect x="-2" y="-2" width="14" height="14" />
          </clipPath>
        </defs>
        {/* Grid lines */}
        <line x1="-2" y1={svgY(0)} x2="12" y2={svgY(0)} stroke="#94a3b8" strokeWidth="0.1" />
        <line x1="0" y1="-2" x2="0" y2="12" stroke="#94a3b8" strokeWidth="0.1" />
        {/* Tick marks */}
        {[2, 4, 6, 8, 10].map(v => (
          <g key={`tick-${v}`}>
            <line x1={v} y1={svgY(0) - 0.2} x2={v} y2={svgY(0) + 0.2} stroke="#94a3b8" strokeWidth="0.08" />
            <text x={v} y={svgY(0) + 1} fontSize="0.8" textAnchor="middle" fill="#64748b">{v}</text>
            <line x1={-0.2} y1={svgY(v)} x2={0.2} y2={svgY(v)} stroke="#94a3b8" strokeWidth="0.08" />
            <text x={-0.8} y={svgY(v) + 0.3} fontSize="0.8" textAnchor="middle" fill="#64748b">{v}</text>
          </g>
        ))}
        {/* The line — properly inverted and clipped */}
        <line
          x1={0}
          y1={svgY(slope * 0 + intercept)}
          x2={10}
          y2={svgY(slope * 10 + intercept)}
          stroke="#3b82f6"
          strokeWidth="0.2"
          clipPath={`url(#${clipId})`}
        />
        {/* Origin marker */}
        <circle cx={0} cy={svgY(0)} r="0.2" fill="#ef4444" />
        {/* Y-intercept marker (if not at origin) */}
        {intercept !== 0 && (
          <circle cx={0} cy={svgY(intercept)} r="0.15" fill="#3b82f6" />
        )}
      </svg>
    ),
    options: ["Yes, it is proportional", "No, it is not proportional"],
    correctAnswer: isProportional ? 0 : 1,
    explanation: isProportional
      ? `Yes, because the graph is a straight line that passes through the origin (0,0).`
      : `No, because although it is a straight line, it does not pass through the origin (0,0). It crosses the y-axis at ${intercept}.`
  };
};

export const generateComplexUnitRate = (): Question => {
  const weight = (getRandomInt(20, 100) / 10).toFixed(1);
  const hours = (getRandomInt(15, 50) / 10).toFixed(2);
  const rate = parseFloat(weight) / parseFloat(hours);
  const inverseRate = parseFloat(hours) / parseFloat(weight);
  const product = parseFloat(weight) * parseFloat(hours);
  const sum = parseFloat(weight) + parseFloat(hours);

  // Fix #8: Clean rate display without trailing zeros
  return {
    id: 0,
    text: `A machine produces ${weight} lbs of product in ${hours} hours. What is the unit rate in pounds per hour?`,
    options: [
      formatRate(rate, 'lb/hr'),
      formatRate(inverseRate, 'lb/hr'),
      formatRate(product, 'lb/hr'),
      formatRate(sum, 'lb/hr'),
    ],
    correctAnswer: 0,
    explanation: `Unit Rate = Total Pounds ÷ Total Hours = ${weight} ÷ ${hours} ≈ ${formatRate(rate, 'lb/hr')}.`
  };
};

export const generateMultiStepPercent = (): Question => {
  const price = getRandomInt(50, 200);
  const discount = getRandomInt(10, 30);
  const tax = getRandomInt(5, 10);

  const discountedPrice = price * (1 - discount / 100);
  const finalPrice = discountedPrice * (1 + tax / 100);

  return {
    id: 0,
    text: `A jacket costs $${price}. It is on sale for ${formatPercent(discount, 0)} off. If the sales tax is ${formatPercent(tax, 0)} (applied after the discount), what is the final price?`,
    options: [`$${finalPrice.toFixed(2)}`, `$${(price * (1 - (discount - tax) / 100)).toFixed(2)}`, `$${(price * (1 - discount / 100 + tax / 100)).toFixed(2)}`, `$${(price - (price * discount / 100) + tax).toFixed(2)}`],
    correctAnswer: 0,
    explanation: `1. Discount: $${price} × ${formatPercent(discount, 0)} = $${(price * discount / 100).toFixed(2)}. Sale Price = $${price} - $${(price * discount / 100).toFixed(2)} = $${discountedPrice.toFixed(2)}. 
2. Tax: $${discountedPrice.toFixed(2)} × ${formatPercent(tax, 0)} = $${(discountedPrice * tax / 100).toFixed(2)}. 
3. Total: $${discountedPrice.toFixed(2)} + $${(discountedPrice * tax / 100).toFixed(2)} = $${finalPrice.toFixed(2)}.`
  };
};

export const generateScaleDrawing = (): Question => {
  const scale = getRandomInt(2, 10);
  const drawingWidth = getRandomInt(5, 15);
  const actualWidth = drawingWidth * scale;
  
  return {
    id: 0,
    text: `On a scale drawing, 1 inch represents ${scale} feet. If a room is ${drawingWidth} inches wide on the drawing, what is the actual width of the room in feet?`,
    options: [`${actualWidth} feet`, `${drawingWidth / scale} feet`, `${drawingWidth + scale} feet`, `${actualWidth * 12} feet`],
    correctAnswer: 0,
    explanation: `Scale is 1 in : ${scale} ft. Actual Width = Drawing Width × Scale Factor = ${drawingWidth} × ${scale} = ${actualWidth} feet.`
  };
};

export const generateVerbalExpression = (): Question => {
  const n = getRandomInt(2, 10);
  const x = getRandomInt(5, 20);
  const isLess = Math.random() > 0.5;

  return {
    id: 0,
    text: `Which expression represents "${n} ${isLess ? 'less than' : 'more than'} ${x}"?`,
    options: [
      isLess ? `${x} - ${n}` : `${x} + ${n}`,
      isLess ? `${n} - ${x}` : `${n} + ${x}`,
      `${n}x`,
      `${x}/${n}`
    ],
    correctAnswer: 0,
    // Fix #5: Branch the explanation for "more than" vs "less than"
    explanation: isLess
      ? `"${n} less than ${x}" means start with ${x} and subtract ${n}: ${x} - ${n} = ${x - n}.`
      : `"${n} more than ${x}" means start with ${x} and add ${n}: ${x} + ${n} = ${x + n}.`
  };
};

export const generateMultiStepEquation = (): Question => {
  // Fix #4: Guard against a === c (even though current ranges don't overlap, this is future-proof)
  let a: number, c: number;
  do {
    a = getRandomInt(2, 5);
    c = getRandomInt(6, 10);
  } while (a === c);

  const x = getRandomInt(-10, 10);
  const b = getRandomInt(1, 10);
  // ax + b = cx + d  => d = ax + b - cx
  const d = a * x + b - c * x;

  // Fix #3: Handle d = 0 in equation display
  const rhsText = d === 0 ? `${c}x` : `${c}x ${d < 0 ? '-' : '+'} ${Math.abs(d)}`;

  // Fix #6: Generate unique options to avoid duplicates (e.g., when x = 0)
  const { options, correctIndex } = generateUniqueOptions(x, 4, 3);

  return {
    id: 0,
    text: `Solve for x: ${a}x + ${b} = ${rhsText}`,
    options,
    correctAnswer: correctIndex,
    explanation: `1. Subtract ${a}x from both sides: ${b} = ${c - a}x${d === 0 ? '' : ` ${d < 0 ? '-' : '+'} ${Math.abs(d)}`}.
2. ${d === 0 ? 'We already have' : `${d < 0 ? 'Add' : 'Subtract'} ${Math.abs(d)}:`} ${b - d} = ${c - a}x.
3. Divide by ${c - a}: x = ${b - d} / ${c - a} = ${x}.`
  };
};

export const generateInequalityGraph = (): Question => {
  const val = getRandomInt(-5, 5);
  const isGreater = Math.random() > 0.5;
  const isClosed = Math.random() > 0.5;

  const symbol = isGreater ? (isClosed ? '≥' : '>') : (isClosed ? '≤' : '<');

  // Fix #9: Add an actual number line SVG diagram
  return {
    id: 0,
    text: `Which inequality is represented by the number line below?`,
    diagram: (
      <svg width="100%" height="60" viewBox="-9 0 18 12" className="mx-auto max-w-md my-4">
        {/* Main axis */}
        <line x1="-8" y1="6" x2="8" y2="6" stroke="#64748b" strokeWidth="0.12" />
        {/* Tick marks and labels */}
        {Array.from({ length: 17 }, (_, i) => i - 8).map(v => (
          <g key={v}>
            <line x1={v} y1="5.2" x2={v} y2="6.8" stroke="#64748b" strokeWidth="0.08" />
            <text x={v} y="9" fontSize="1.5" textAnchor="middle" fill="#64748b">{v}</text>
          </g>
        ))}
        {/* Shading line (arrow) */}
        <line
          x1={val}
          y1="6"
          x2={isGreater ? 8 : -8}
          y2="6"
          stroke="#3b82f6"
          strokeWidth="0.35"
        />
        {/* Arrowhead */}
        <polygon
          points={
            isGreater
              ? "8,5.4 8,6.6 8.6,6"
              : "-8,5.4 -8,6.6 -8.6,6"
          }
          fill="#3b82f6"
        />
        {/* Circle (open or closed) at val */}
        <circle
          cx={val}
          cy="6"
          r="0.4"
          fill={isClosed ? '#3b82f6' : 'white'}
          stroke="#3b82f6"
          strokeWidth="0.15"
        />
      </svg>
    ),
    options: [
      `x ${symbol} ${val}`,
      `x ${isGreater ? (isClosed ? '≤' : '<') : (isClosed ? '≥' : '>')} ${val}`,
      `x = ${val}`,
      `x + ${val} > 0`
    ],
    correctAnswer: 0,
    explanation: `${isClosed ? 'A closed' : 'An open'} circle means the value is ${isClosed ? 'included (≤ or ≥)' : 'not included (< or >)'}. Shading to the ${isGreater ? 'right' : 'left'} means "${isGreater ? 'greater than' : 'less than'}". So the inequality is x ${symbol} ${val}.`
  };
};

export const generateAngleParallelLines = (): Question => {
  const angle1 = getRandomInt(40, 140);
  const angle2 = angle1; // Corresponding
  
  return {
    id: 0,
    text: `In the diagram below, lines L and M are parallel. If angle 1 is ${angle1}°, what is the measure of its corresponding angle 5?`,
    diagram: (
      <svg width="200" height="150" viewBox="0 0 200 150" className="mx-auto border bg-white my-4">
        <line x1="20" y1="40" x2="180" y2="40" stroke="black" strokeWidth="2" />
        <line x1="20" y1="100" x2="180" y2="100" stroke="black" strokeWidth="2" />
        <line x1="60" y1="20" x2="140" y2="130" stroke="red" strokeWidth="2" />
        <text x="75" y="35" fontSize="10">1</text>
        <text x="105" y="95" fontSize="10">5</text>
        <text x="185" y="45" fontSize="10">L</text>
        <text x="185" y="105" fontSize="10">M</text>
      </svg>
    ),
    options: [`${angle1}°`, `${180 - angle1}°`, `${90}°`, `${angle1 / 2}°`],
    correctAnswer: 0,
    explanation: `When two parallel lines are cut by a transversal, corresponding angles are equal. Therefore, angle 5 is also ${angle1}°.`
  };
};

export const generateIQR = (): Question => {
  // Fix #7: Widen data range to better fill the 0–100 axis
  const min = getRandomInt(5, 15);
  const q1 = min + getRandomInt(10, 20);
  const med = q1 + getRandomInt(10, 15);
  const q3 = med + getRandomInt(10, 15);
  const max = q3 + getRandomInt(10, 20);
  const iqr = q3 - q1;

  return {
    id: 0,
    text: `Based on the box plot below, what is the Interquartile Range (IQR)?`,
    diagram: (
      <svg width="100%" height="80" viewBox="0 0 100 40" className="mx-auto max-w-sm my-4">
        <line x1="5" y1="30" x2="95" y2="30" stroke="#64748b" strokeWidth="0.5" />
        {[0, 20, 40, 60, 80, 100].map(x => (
          <g key={x}>
            <line x1={x} y1="28" x2={x} y2="32" stroke="#64748b" strokeWidth="0.5" />
            <text x={x} y="38" fontSize="4" textAnchor="middle" fill="#64748b">{x}</text>
          </g>
        ))}
        <line x1={min} y1="15" x2={q1} y2="15" stroke="#3b82f6" strokeWidth="1" />
        <line x1={q3} y1="15" x2={max} y2="15" stroke="#3b82f6" strokeWidth="1" />
        <rect x={q1} y="10" width={q3 - q1} height="10" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1" />
        <line x1={med} y1="10" x2={med} y2="20" stroke="#3b82f6" strokeWidth="1" />
        {/* Whisker end caps */}
        <line x1={min} y1="12" x2={min} y2="18" stroke="#3b82f6" strokeWidth="0.8" />
        <line x1={max} y1="12" x2={max} y2="18" stroke="#3b82f6" strokeWidth="0.8" />
      </svg>
    ),
    options: [`${iqr}`, `${q1}`, `${q3}`, `${max - min}`],
    correctAnswer: 0,
    explanation: `IQR = Q3 - Q1. From the box plot, Q3 = ${q3} and Q1 = ${q1}. IQR = ${q3} - ${q1} = ${iqr}.`
  };
};

export const generateCompositeArea = (): Question => {
  const w = getRandomInt(5, 10);
  const h = getRandomInt(4, 8);
  const triH = getRandomInt(3, 6);
  
  const rectArea = w * h;
  const triArea = 0.5 * w * triH;
  const totalArea = rectArea + triArea;
  
  return {
    id: 0,
    text: `Find the total area of the composite figure shown below, which consists of a rectangle and a triangle.`,
    diagram: (
      <svg width="150" height="120" viewBox="0 0 150 120" className="mx-auto border bg-white my-4">
        <rect x="35" y="50" width="80" height="50" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
        <polygon points="35,50 115,50 75,10" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
        <text x="75" y="80" fontSize="10" textAnchor="middle">Rect: {w}x{h}</text>
        <text x="75" y="40" fontSize="10" textAnchor="middle">Tri h={triH}</text>
      </svg>
    ),
    options: [`${totalArea}`, `${rectArea}`, `${triArea}`, `${totalArea + 10}`],
    correctAnswer: 0,
    explanation: `1. Area of Rectangle = length × width = ${w} × ${h} = ${rectArea}. 
2. Area of Triangle = ½ × base × height = ½ × ${w} × ${triH} = ${triArea}. 
3. Total Area = ${rectArea} + ${triArea} = ${totalArea}.`
  };
};

export const generateFrequencyTableProb = (): Question => {
  const categories = ["Red", "Blue", "Green"];
  const counts = [getRandomInt(10, 20), getRandomInt(15, 25), getRandomInt(5, 15)];
  const total = counts.reduce((a, b) => a + b, 0);
  const targetIdx = getRandomInt(0, 2);
  
  return {
    id: 0,
    text: `Based on the frequency table below, what is the experimental probability of choosing a ${categories[targetIdx]} marble?`,
    diagram: (
      <table className="mx-auto border-collapse border border-slate-400 my-4">
        <thead>
          <tr>
            <th className="border border-slate-300 px-4 py-2 bg-slate-50">Color</th>
            <th className="border border-slate-300 px-4 py-2 bg-slate-50">Frequency</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, i) => (
            <tr key={cat}>
              <td className="border border-slate-300 px-4 py-2">{cat}</td>
              <td className="border border-slate-300 px-4 py-2 text-center">{counts[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ),
    options: [`${counts[targetIdx]}/${total}`, `${counts[targetIdx]}/${total - counts[targetIdx]}`, `1/${categories.length}`, `${total}/${counts[targetIdx]}`],
    correctAnswer: 0,
    explanation: `Experimental Probability = Frequency of Category / Total Frequency. Total = ${counts.join(' + ')} = ${total}. Probability of ${categories[targetIdx]} = ${counts[targetIdx]}/${total}.`
  };
};

export const generateHybridPay = (): Question => {
  const basePay = getRandomInt(300, 600);
  const commissionRate = getRandomInt(2, 8);
  const sales = getRandomInt(2000, 8000);
  const commission = sales * (commissionRate / 100);
  const totalPay = basePay + commission;

  return {
    id: 0,
    text: `A salesperson earns a base salary of $${basePay} per week plus a ${commissionRate}% commission on all sales. If they sell $${sales} worth of merchandise in one week, what is their total earnings?`,
    options: [
      `$${totalPay.toFixed(2)}`,
      `$${commission.toFixed(2)}`,
      `$${(sales * (commissionRate / 100 + basePay / 100)).toFixed(2)}`,
      `$${(basePay + sales).toFixed(2)}`
    ],
    correctAnswer: 0,
    explanation: `1. Commission = Sales × Rate = $${sales} × ${commissionRate}% = $${commission.toFixed(2)}.
2. Total Earnings = Base Salary + Commission = $${basePay} + $${commission.toFixed(2)} = $${totalPay.toFixed(2)}.`
  };
};

export const generateRateConversion = (): Question => {
  const mph = getRandomInt(30, 75);
  // mph to fps: mph * 5280 / 3600 = mph * 22 / 15
  const fps = (mph * 5280) / 3600;

  return {
    id: 0,
    text: `A car is traveling at ${mph} miles per hour. What is its speed in feet per second? (1 mile = 5,280 feet)`,
    options: [
      `${fps.toFixed(1)} ft/s`,
      `${(mph * 5280).toFixed(0)} ft/s`,
      `${(mph / 60).toFixed(2)} ft/s`,
      `${(mph * 1.47).toFixed(1)} ft/s`
    ],
    correctAnswer: 0,
    explanation: `1. Convert miles to feet: ${mph} miles = ${mph} × 5,280 = ${mph * 5280} feet.
2. Convert hours to seconds: 1 hour = 3,600 seconds.
3. Speed = ${mph * 5280} feet ÷ 3,600 seconds ≈ ${fps.toFixed(1)} ft/s.`
  };
};

export const generateVolumePyramid = (): Question => {
  const baseSide = getRandomInt(4, 10);
  const height = getRandomInt(6, 12);
  const baseArea = baseSide * baseSide;
  const volume = (1/3) * baseArea * height;

  return {
    id: 0,
    text: `A square pyramid has a base side length of ${baseSide} cm and a height of ${height} cm. What is its volume?`,
    diagram: (
      <svg width="150" height="120" viewBox="0 0 150 120" className="mx-auto border bg-white my-4">
        <polygon points="40,100 110,100 130,80 60,80" fill="none" stroke="#3b82f6" strokeWidth="2" />
        <line x1="85" y1="20" x2="40" y2="100" stroke="#3b82f6" strokeWidth="2" />
        <line x1="85" y1="20" x2="110" y2="100" stroke="#3b82f6" strokeWidth="2" />
        <line x1="85" y1="20" x2="130" y2="80" stroke="#3b82f6" strokeWidth="2" />
        <line x1="85" y1="20" x2="60" y2="80" stroke="#3b82f6" strokeDasharray="2,2" strokeWidth="1" />
        <line x1="85" y1="20" x2="85" y2="90" stroke="#ef4444" strokeDasharray="2,2" strokeWidth="1" />
        <text x="75" y="115" fontSize="10" textAnchor="middle">s = {baseSide}</text>
        <text x="95" y="55" fontSize="10" fill="#ef4444">h = {height}</text>
      </svg>
    ),
    options: [
      `${volume.toFixed(1)} cm³`,
      `${(baseArea * height).toFixed(1)} cm³`,
      `${(baseArea + height).toFixed(1)} cm³`,
      `${(volume * 3).toFixed(1)} cm³`
    ],
    correctAnswer: 0,
    explanation: `Volume of a Pyramid = 1/3 × Base Area × Height.
1. Base Area = ${baseSide} × ${baseSide} = ${baseArea} cm².
2. Volume = 1/3 × ${baseArea} × ${height} = ${volume.toFixed(1)} cm³.`
  };
};
