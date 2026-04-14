import { getRandomInt } from '../utils/mathUtils';

export const generateCoordinateGeometryLinesMulti = () => {
  let x1, y1, x2, y2, m, b;
  do {
    x1 = getRandomInt(1, 4);
    y1 = getRandomInt(1, 4);
    const dx = getRandomInt(1, 3);
    x2 = x1 + dx;
    const dy = dx * getRandomInt(1, 4);
    y2 = y1 + dy;
    m = dy / dx;
    b = y1 - m * x1;
  } while (!Number.isInteger(b) || !Number.isInteger(m));
  return {
    category: 'Multi-skill',
    subCategory: 'Coordinate geometry + Lines',
    difficulty: 'medium' as const,
    text: `A line passes through the points (${x1}, ${y1}) and (${x2}, ${y2}). What is the y-intercept of this line?`,
    options: [`${b - 1}`, `${b}`, `${b + 1}`, `${m}`, `${y1}`],
    correctAnswer: 1,
    explanation: `First find the slope m = (${y2} - ${y1}) / (${x2} - ${x1}) = ${m}. Then use y = mx + b with point (${x1}, ${y1}): ${y1} = ${m}(${x1}) + b. So b = ${y1} - ${m * x1} = ${b}.`
  };
};

export const generateSimilarityTrigMulti = () => {
  const opp = getRandomInt(3, 5);
  const adj = getRandomInt(4, 6);
  const hyp = Math.sqrt(opp*opp + adj*adj);
  const scale = getRandomInt(2, 4);
  return {
    category: 'Multi-skill',
    subCategory: 'Similarity + Trig',
    difficulty: 'hard' as const,
    text: `Triangle ABC is a right triangle with legs of length ${opp} and ${adj}. Triangle DEF is similar to ABC with a scale factor of ${scale}. What is the sine of the smallest angle in Triangle DEF?`,
    options: [`${opp}/${adj}`, `${adj}/${hyp.toFixed(2)}`, `${opp}/${hyp.toFixed(2)}`, `${(opp*scale)}/${(hyp*scale).toFixed(2)}`, `${adj}/${opp}`],
    correctAnswer: 2,
    explanation: `Similar triangles have the same angle measures, so the sine of the angle is the same in both triangles. The smallest angle is opposite the shortest leg (${opp}). sin(θ) = opposite / hypotenuse = ${opp} / √(${opp}² + ${adj}²) ≈ ${opp}/${hyp.toFixed(2)}.`
  };
};

export const generateCirclesAlgebraMulti = () => {
  const r = getRandomInt(3, 8);
  const area = r * r;
  return {
    category: 'Multi-skill',
    subCategory: 'Circles + Algebra',
    difficulty: 'hard' as const,
    text: `The area of a circle is given by the expression (${area}π). If the radius is represented by (x - 2), what is the value of x?`,
    options: [`${r - 2}`, `${r}`, `${r + 2}`, `${area}`, `${area + 2}`],
    correctAnswer: 2,
    explanation: `Area = πr² = ${area}π, so r² = ${area}, meaning r = ${r}. If r = x - 2, then ${r} = x - 2, so x = ${r + 2}.`
  };
};
