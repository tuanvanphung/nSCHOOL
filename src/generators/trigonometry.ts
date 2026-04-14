import { getRandomInt, simplify } from '../utils/mathUtils';

export const generateRightTriangleTrigMedium = () => {
  const opp = getRandomInt(3, 8);
  const adj = getRandomInt(4, 9);
  const hypVal = Math.sqrt(opp*opp + adj*adj);
  const hyp = hypVal.toFixed(2);
  return {
    category: 'Trigonometry',
    subCategory: 'Right triangles',
    difficulty: 'medium' as const,
    text: `In a right triangle, the side opposite angle θ is ${opp} and the adjacent side is ${adj}. What is the value of tan(θ)?`,
    options: [`${adj}/${opp}`, `${opp}/${hyp}`, `${adj}/${hyp}`, `${opp}/${adj}`, `${simplify(opp + adj, 2)}`],
    correctAnswer: 3,
    explanation: `Tangent is opposite over adjacent (TOA). tan(θ) = ${opp}/${adj}.`
  };
};

export const generateTrigApplicationsMedium = () => {
  const dist = 50;
  const angle = 35;
  const h = Math.round(dist * Math.tan(angle * Math.PI / 180));
  return {
    category: 'Trigonometry',
    subCategory: 'Applications',
    difficulty: 'medium' as const,
    text: `From a point ${dist} feet from the base of a building, the angle of elevation to the top of the building is ${angle}°. To the nearest foot, how tall is the building?`,
    options: [`${h - 5}`, `${h - 2}`, `${h}`, `${h + 2}`, `${h + 5}`],
    correctAnswer: 2,
    explanation: `Use the tangent ratio: tan(θ) = opposite / adjacent. tan(${angle}°) = height / ${dist}. height = ${dist} × tan(${angle}°) ≈ ${dist} × 0.7002 ≈ ${h} feet.`
  };
};

export const generateTrigRatiosMedium = () => {
  return {
    category: 'Trigonometry',
    subCategory: 'Ratios',
    difficulty: 'medium' as const,
    text: `In a right triangle, the hypotenuse is 13 and the side adjacent to angle θ is 5. What is the value of cos(θ)?`,
    options: [`5/12`, `12/13`, `5/13`, `13/5`, `12/5`],
    correctAnswer: 2,
    explanation: `Cosine is adjacent over hypotenuse (CAH). cos(θ) = 5 / 13.`
  };
};

export const generateTrigGraphsMedium = () => {
  const amp = getRandomInt(2, 5);
  const b = getRandomInt(2, 4);
  const period = simplify(2, b);
  return {
    category: 'Trigonometry',
    subCategory: 'Graphs',
    difficulty: 'medium' as const,
    text: `What is the amplitude and period of the function y = ${amp}sin(${b}x)?`,
    options: [
      `Amp = ${b}, Period = ${amp}π`,
      `Amp = ${amp}, Period = ${period}π`,
      `Amp = ${amp}, Period = 2π`,
      `Amp = ${amp * 2}, Period = ${period}π`,
      `Amp = ${amp}, Period = ${b}π`
    ],
    correctAnswer: 1,
    explanation: `For y = Asin(Bx), Amplitude = |A| = ${amp}. Period = 2π / B = 2π / ${b} = ${period}π.`
  };
};

export const generateTrigRadiansMedium = () => {
  return {
    category: 'Trigonometry',
    subCategory: 'Radians',
    difficulty: 'medium' as const,
    text: `Convert 270° to radians.`,
    options: [`π/2`, `π`, `2π/3`, `3π/2`, `2π`],
    correctAnswer: 3,
    explanation: `To convert degrees to radians, multiply by π/180. 270° × (π/180) = 270π/180 = 3π/2.`
  };
};

export const generateTrigUnitCircleMedium = () => {
  return {
    category: 'Trigonometry',
    subCategory: 'Unit Circle',
    difficulty: 'medium' as const,
    text: `What is the exact value of sin(60°) × cos(30°)?`,
    options: [`1/4`, `√3/2`, `3/4`, `1`, `√3/4`],
    correctAnswer: 2,
    explanation: `sin(60°) = √3/2 and cos(30°) = √3/2. Their product is (√3/2) × (√3/2) = 3/4.`
  };
};

export const generateTrigIdentities1 = () => {
  return {
    category: 'Trigonometry',
    subCategory: 'Identities',
    difficulty: 'medium' as const,
    text: `If sin(θ) = 3/5 and θ is in the first quadrant, what is the value of cos(θ)?`,
    options: [`3/4`, `5/3`, `4/5`, `3/5`, `5/4`],
    correctAnswer: 2,
    explanation: `Use the Pythagorean identity: sin²(θ) + cos²(θ) = 1. (3/5)² + cos²(θ) = 1 => 9/25 + cos²(θ) = 1 => cos²(θ) = 16/25 => cos(θ) = 4/5.`
  };
};

export const generateTrigIdentities2 = () => {
  return {
    category: 'Trigonometry',
    subCategory: 'Identities',
    difficulty: 'medium' as const,
    text: `Which of the following is equivalent to 1 - sin²(θ)?`,
    options: [`sin²(θ)`, `tan²(θ)`, `1`, `cos²(θ)`, `sin(θ)cos(θ)`],
    correctAnswer: 3,
    explanation: `From the Pythagorean identity sin²(θ) + cos²(θ) = 1, we can rearrange to get cos²(θ) = 1 - sin²(θ).`
  };
};

export const generateTrigIdentities3 = () => {
  return {
    category: 'Trigonometry',
    subCategory: 'Identities',
    difficulty: 'medium' as const,
    text: `If cos(θ) = 5/13 and sin(θ) = 12/13, what is the value of tan(θ)?`,
    options: [`5/12`, `13/12`, `12/5`, `5/13`, `13/5`],
    correctAnswer: 2,
    explanation: `Use the identity tan(θ) = sin(θ) / cos(θ). tan(θ) = (12/13) / (5/13) = 12/5.`
  };
};

export const generateTrigIdentities4 = () => {
  return {
    category: 'Trigonometry',
    subCategory: 'Identities',
    difficulty: 'medium' as const,
    text: `Which of the following is equivalent to (sin²(θ) / cos²(θ)) + 1?`,
    options: [`sin²(θ)`, `cos²(θ)`, `cot²(θ)`, `sec²(θ)`, `tan(θ)`],
    correctAnswer: 3,
    explanation: `sin²(θ) / cos²(θ) is tan²(θ). The identity is tan²(θ) + 1 = sec²(θ).`
  };
};

export const generateInverseTrig1 = () => {
  return {
    category: 'Trigonometry',
    subCategory: 'Inverse Trig',
    difficulty: 'medium' as const,
    text: `In a right triangle, the opposite side is 5 and the hypotenuse is 13. To the nearest degree, what is the measure of the angle θ opposite the side of length 5?`,
    options: [`21°`, `23°`, `67°`, `45°`, `25°`],
    correctAnswer: 1,
    explanation: `sin(θ) = opposite / hypotenuse = 5 / 13. θ = arcsin(5/13) ≈ 22.6°, which rounds to 23°.`
  };
};

export const generateInverseTrig2 = () => {
  const h = getRandomInt(2, 6);
  const d = getRandomInt(10, 20);
  const angle = (Math.atan(h / d) * 180 / Math.PI).toFixed(0);
  return {
    category: 'Trigonometry',
    subCategory: 'Inverse Trig',
    difficulty: 'medium' as const,
    text: `A ramp rises ${h} feet over a horizontal distance of ${d} feet. What is the angle of inclination of the ramp to the nearest degree?`,
    options: [`${Number(angle) - 5}°`, `${angle}°`, `${90 - Number(angle)}°`, `45°`, `30°`],
    correctAnswer: 1,
    explanation: `tan(θ) = opposite / adjacent = ${h} / ${d}. θ = arctan(${h}/${d}) ≈ ${(Math.atan(h / d) * 180 / Math.PI).toFixed(1)}°, which rounds to ${angle}°.`
  };
};

export const generateInverseTrig3 = () => {
  const adj = getRandomInt(5, 15);
  const hyp = getRandomInt(adj + 5, adj + 20);
  const angle = (Math.acos(adj / hyp) * 180 / Math.PI).toFixed(0);
  return {
    category: 'Trigonometry',
    subCategory: 'Inverse Trig',
    difficulty: 'medium' as const,
    text: `In a right triangle, the adjacent side is ${adj} and the hypotenuse is ${hyp}. What is the measure of the angle θ between these two sides to the nearest degree?`,
    options: [`${Number(angle) - 1}°`, `${angle}°`, `${90 - Number(angle)}°`, `45°`, `60°`],
    correctAnswer: 1,
    explanation: `cos(θ) = adjacent / hypotenuse = ${adj} / ${hyp} ≈ ${(adj / hyp).toFixed(2)}. θ = arccos(${(adj / hyp).toFixed(2)}) ≈ ${(Math.acos(adj / hyp) * 180 / Math.PI).toFixed(1)}°, which rounds to ${angle}°.`
  };
};
