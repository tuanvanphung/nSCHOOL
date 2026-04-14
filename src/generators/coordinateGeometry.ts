import { getRandomInt, simplify } from '../utils/mathUtils';

export const generateSlopeMedium = () => {
  const x1 = getRandomInt(-5, 5);
  const y1 = getRandomInt(-5, 5);
  const x2 = x1 + getRandomInt(1, 5);
  const y2 = y1 + getRandomInt(1, 5);
  const dy = y2 - y1;
  const dx = x2 - x1;
  return {
    category: 'Coordinate Geometry',
    subCategory: 'Slope',
    difficulty: 'medium' as const,
    text: `What is the slope of the line passing through (${x1}, ${y1}) and (${x2}, ${y2})?`,
    options: [`${dx}/${dy}`, `-${dy}/${dx}`, `${dy}/${dx}`, `-${dx}/${dy}`, `${dy + dx}`],
    correctAnswer: 2,
    explanation: `Slope = (y2 - y1) / (x2 - x1) = (${y2} - ${y1}) / (${x2} - ${x1}) = ${dy}/${dx}.`
  };
};

export const generateMidpointMedium = () => {
  let x1, y1, x2, y2, mx, my;
  do {
    x1 = getRandomInt(-10, 10);
    y1 = getRandomInt(-10, 10);
    x2 = getRandomInt(-10, 10);
    y2 = getRandomInt(-10, 10);
    mx = (x1 + x2) / 2;
    my = (y1 + y2) / 2;
  } while (mx === my || mx === (x1 - x2) / 2 || my === (y1 - y2) / 2);
  return {
    category: 'Coordinate Geometry',
    subCategory: 'Midpoint',
    difficulty: 'medium' as const,
    text: `What is the midpoint of the line segment with endpoints (${x1}, ${y1}) and (${x2}, ${y2})?`,
    options: [
      `(${(x1 - x2) / 2}, ${(y1 - y2) / 2})`, 
      `(${my}, ${mx})`, 
      `(${mx}, ${my})`, 
      `(${x1 + x2}, ${y1 + y2})`, 
      `(${mx * 2}, ${my * 2})`
    ],
    correctAnswer: 2,
    explanation: `Midpoint = ((x1 + x2)/2, (y1 + y2)/2) = ((${x1} + ${x2})/2, (${y1} + ${y2})/2) = (${mx}, ${my}).`
  };
};

export const generateDistanceEasy = () => {
  const triples = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17]];
  const triple = triples[getRandomInt(0, triples.length - 1)];
  const x1 = getRandomInt(0, 5);
  const y1 = getRandomInt(0, 5);
  const x2 = x1 + triple[0];
  const y2 = y1 + triple[1];
  const dist = triple[2];
  return {
    category: 'Coordinate Geometry',
    subCategory: 'Distance',
    difficulty: 'easy' as const,
    text: `What is the distance between the points (${x1}, ${y1}) and (${x2}, ${y2})?`,
    options: [
      `${dist - 2}`,
      `${dist - 1}`,
      `${dist}`,
      `${dist + 1}`,
      `${dist + 2}`
    ],
    correctAnswer: 2,
    explanation: `Distance = √((${x2}-${x1})² + (${y2}-${y1})²) = √(${triple[0]}² + ${triple[1]}²) = √${triple[0]*triple[0] + triple[1]*triple[1]} = ${dist}.`
  };
};

export const generateCoordinateAreaHard = () => {
  const x1 = getRandomInt(0, 3);
  const y1 = getRandomInt(0, 3);
  const baseLen = getRandomInt(3, 6);
  const x2 = x1 + baseLen;
  const y2 = y1;
  const x3 = x1 + getRandomInt(1, baseLen - 1);
  const heightLen = getRandomInt(3, 7);
  const y3 = y1 + heightLen;
  const area = 0.5 * baseLen * heightLen;
  return {
    category: 'Coordinate Geometry',
    subCategory: 'Area',
    difficulty: 'hard' as const,
    text: `What is the area of a triangle with vertices at (${x1}, ${y1}), (${x2}, ${y2}), and (${x3}, ${y3})?`,
    options: [
      `${area - 2}`,
      `${area - 1}`,
      `${area}`,
      `${area + 1}`,
      `${area + 2}`
    ],
    correctAnswer: 2,
    explanation: `The base is the horizontal distance between (${x1}, ${y1}) and (${x2}, ${y2}), which is ${baseLen}. The height is ${heightLen}. Area = 1/2 × ${baseLen} × ${heightLen} = ${area}.`
  };
};

export const generatePerpendicularLineMedium = () => {
  return {
    category: 'Coordinate Geometry',
    subCategory: 'Lines',
    difficulty: 'medium' as const,
    text: `Which of the following lines is perpendicular to y = (2/3)x + 5?`,
    options: [
      `y = (2/3)x - 1`,
      `y = (3/2)x + 5`,
      `y = -(3/2)x + 2`,
      `y = -(2/3)x + 5`,
      `y = (-2/3)x - 1`
    ],
    correctAnswer: 2,
    explanation: `Perpendicular lines have negative reciprocal slopes. The slope of the original line is 2/3, so the perpendicular slope is -3/2. The correct line must have this slope.`
  };
};

export const generateCircleEquationMedium = () => {
  return {
    category: 'Coordinate Geometry',
    subCategory: 'Circles',
    difficulty: 'medium' as const,
    text: `What is the equation of a circle with center (3, -2) and radius 5?`,
    options: [
      `(x - 3)² + (y + 2)² = 5`,
      `(x + 3)² + (y - 2)² = 25`,
      `(x - 3)² + (y + 2)² = 25`,
      `(x - 3)² + (y - 2)² = 25`,
      `(x + 3)² + (y + 2)² = 5`
    ],
    correctAnswer: 2,
    explanation: `The standard equation of a circle is (x - h)² + (y - k)² = r². With center (3, -2) and radius 5, we get (x - 3)² + (y - (-2))² = 5², which is (x - 3)² + (y + 2)² = 25.`
  };
};

export const generateCoordinateInequalityMedium = () => {
  return {
    category: 'Coordinate Geometry',
    subCategory: 'Inequalities',
    difficulty: 'medium' as const,
    text: `Which of the following points lies in the solution region of the inequality y > 2x - 3?`,
    options: [`(0, -4)`, `(2, 1)`, `(1, 0)`, `(0, 0)`, `(3, 2)`],
    correctAnswer: 3,
    explanation: `Test each point in the inequality. For (0, 0): 0 > 2(0) - 3 => 0 > -3. This is true, so (0, 0) is in the solution region.`
  };
};

export const generateParallelLineMedium = () => {
  const m = getRandomInt(2, 5);
  const b = getRandomInt(2, 9);
  return {
    category: 'Coordinate Geometry',
    subCategory: 'Lines',
    difficulty: 'medium' as const,
    text: `Which of the following lines is parallel to y = ${m}x + ${b}?`,
    options: [
      `y = -${m}x + ${b}`,
      `y = (1/${m})x + 2`,
      `y = ${m}x - 4`,
      `y = ${m}x + ${b}`,
      `y = -(1/${m})x + ${b}`
    ],
    correctAnswer: 2,
    explanation: `Parallel lines have the same slope but different y-intercepts. The slope of the original line is ${m}. Option C has a slope of ${m} and a different intercept (-4). Option D is the same line.`
  };
};

export const generateParallelLineFractional = () => {
  const a = getRandomInt(1, 4);
  const b = getRandomInt(2, 6);
  const c = getRandomInt(4, 12);
  const slope = simplify(a, b);
  const slopeDisplay = slope.includes('/') ? `(${slope})` : slope;
  const invSlope = simplify(b, a);
  const invSlopeDisplay = invSlope.includes('/') ? `(${invSlope})` : invSlope;
  return {
    category: 'Coordinate Geometry',
    subCategory: 'Lines',
    difficulty: 'medium' as const,
    text: `Which of the following lines is parallel to ${a}x - ${b}y = ${c}?`,
    options: [
      `y = -${slopeDisplay}x + 1`,
      `y = ${slopeDisplay}x + 1`,
      `y = ${invSlopeDisplay}x + 1`,
      `y = -${invSlopeDisplay}x + 1`,
      `y = x + 1`
    ],
    correctAnswer: 1,
    explanation: `Convert ${a}x - ${b}y = ${c} to slope-intercept form: -${b}y = -${a}x + ${c} => y = (${a}/${b})x - ${c}/${b}. The slope is ${slope}. Option B has the same slope.`
  };
};

export const generateParallelLineThroughPoint = () => {
  const m = -getRandomInt(1, 4);
  const b = getRandomInt(1, 8);
  const x1 = 0;
  const y1 = getRandomInt(1, 5);
  return {
    category: 'Coordinate Geometry',
    subCategory: 'Lines',
    difficulty: 'medium' as const,
    text: `What is the equation of the line parallel to y = ${m}x + ${b} that passes through the point (${x1}, ${y1})?`,
    options: [
      `y = ${-m}x + ${y1}`,
      `y = ${m}x + ${b}`,
      `y = ${m}x + ${y1}`,
      `y = ${simplify(1, -m)}x + ${y1}`,
      `y = -x + ${y1}`
    ],
    correctAnswer: 2,
    explanation: `A parallel line must have the same slope, m = ${m}. Since it passes through (0, ${y1}), the y-intercept is ${y1}. The equation is y = ${m}x + ${y1}.`
  };
};
