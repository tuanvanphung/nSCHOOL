import { getRandomInt, simplify } from '../utils/mathUtils';

export const generateCirclesAreaEasy = () => {
  const r = getRandomInt(2, 10);
  const area = r * r;
  return {
    category: 'Geometry',
    subCategory: 'Circles',
    difficulty: 'easy' as const,
    text: `What is the area of a circle with a radius of ${r}?`,
    options: [`${r * 2}π`, `${area * 4}π`, `${area}π`, `${r}π`, `${area / 2}π`],
    correctAnswer: 2,
    explanation: `The area of a circle is πr². π(${r})² = ${area}π.`
  };
};

export const generateRightTrianglesPythagorean = () => {
  const a = getRandomInt(1, 4) * 3;
  const b = (a / 3) * 4;
  const c = (a / 3) * 5;
  return {
    category: 'Geometry',
    subCategory: 'Right triangles',
    difficulty: 'medium' as const,
    text: `In a right triangle, the lengths of the legs are ${a} and ${b}. What is the length of the hypotenuse?`,
    options: [`${c - 2}`, `${c - 1}`, `${c}`, `${c + 1}`, `${c + 2}`],
    correctAnswer: 2,
    explanation: `Using the Pythagorean theorem (a² + b² = c²): ${a}² + ${b}² = ${a*a} + ${b*b} = ${a*a + b*b}. √${a*a + b*b} = ${c}.`
  };
};

export const generateSimilarTrianglesMedium = () => {
  const s1 = getRandomInt(3, 6);
  const s2 = getRandomInt(4, 8);
  const scale = getRandomInt(2, 4);
  return {
    category: 'Geometry',
    subCategory: 'Similar triangles',
    difficulty: 'medium' as const,
    text: `Triangle ABC is similar to Triangle DEF. If AB = ${s1} and BC = ${s2}, and DE = ${s1 * scale}, what is the length of EF?`,
    options: [`${s2 * scale - 2}`, `${s2 * scale - 1}`, `${s2 * scale}`, `${s2 * scale + 1}`, `${s2 * scale + 2}`],
    correctAnswer: 2,
    explanation: `The scale factor from ABC to DEF is DE / AB = ${s1 * scale} / ${s1} = ${scale}. So, EF = BC × ${scale} = ${s2} × ${scale} = ${s2 * scale}.`
  };
};

export const generateAnglesParallelLines = () => {
  const angle = getRandomInt(40, 80);
  return {
    category: 'Geometry',
    subCategory: 'Angles',
    difficulty: 'medium' as const,
    text: `Two parallel lines are intersected by a transversal. If one of the acute interior angles measures ${angle}°, what is the measure of the consecutive interior angle?`,
    options: [`${angle}°`, `${90 - angle}°`, `${180 - angle}°`, `${180 + angle}°`, `90°`],
    correctAnswer: 2,
    explanation: `Consecutive interior angles are supplementary, so they add up to 180°. 180° - ${angle}° = ${180 - angle}°.`
  };
};

export const generateSpecialRightTriangles306090 = () => {
  const x = getRandomInt(2, 8);
  return {
    category: 'Geometry',
    subCategory: 'Right triangles',
    difficulty: 'medium' as const,
    text: `In a 30°-60°-90° triangle, the length of the shortest leg is ${x}. What is the length of the hypotenuse?`,
    options: [`${x}√2`, `${x}√3`, `${2 * x}`, `${3 * x}`, `${x / 2}`],
    correctAnswer: 2,
    explanation: `In a 30°-60°-90° triangle, the hypotenuse is twice the length of the shortest leg. ${x} × 2 = ${2 * x}.`
  };
};

export const generateSpecialRightTriangles454590 = () => {
  const x = getRandomInt(2, 8);
  return {
    category: 'Geometry',
    subCategory: 'Right triangles',
    difficulty: 'medium' as const,
    text: `In a 45°-45°-90° triangle, the length of a leg is ${x}. What is the length of the hypotenuse?`,
    options: [`${x}`, `${x}√2`, `${x}√3`, `${2 * x}`, `${x * x}`],
    correctAnswer: 1,
    explanation: `In a 45°-45°-90° triangle, the hypotenuse is √2 times the length of a leg. So, ${x}√2.`
  };
};

export const generateArcLengthMedium = () => {
  const r = getRandomInt(3, 9);
  const angle = getRandomInt(1, 5) * 30;
  const frac = simplify(angle * r, 180);
  const wrongFrac1 = simplify(angle * r * r, 360);
  const wrongFrac2 = simplify(angle * (2 * r), 180);
  return {
    category: 'Geometry',
    subCategory: 'Circles',
    difficulty: 'medium' as const,
    text: `In a circle with radius ${r}, what is the length of an arc intercepted by a central angle of ${angle}°?`,
    options: [`(${wrongFrac1})π`, `(${frac})π`, `(${wrongFrac2})π`, `${r}π`, `${r * 2}π`],
    correctAnswer: 1,
    explanation: `Arc length = (θ/360) × 2πr = (${angle}/360) × 2π(${r}) = (${angle * r}/180)π = (${frac})π.`
  };
};

export const generateSectorAreaMedium = () => {
  const r = getRandomInt(2, 8);
  const angle = getRandomInt(1, 4) * 45;
  const frac = simplify(angle * r * r, 360);
  const wrongFrac1 = simplify(angle * r, 180);
  const wrongFrac2 = simplify(angle * (2 * r) * (2 * r), 360);
  return {
    category: 'Geometry',
    subCategory: 'Circles',
    difficulty: 'medium' as const,
    text: `What is the area of a sector of a circle with radius ${r} and a central angle of ${angle}°?`,
    options: [`(${wrongFrac1})π`, `(${frac})π`, `(${wrongFrac2})π`, `${r * r}π`, `${r}π`],
    correctAnswer: 1,
    explanation: `Sector area = (θ/360) × πr² = (${angle}/360) × π(${r}²) = (${angle * r * r}/360)π = (${frac})π.`
  };
};

export const generateTangentCircleMedium = () => {
  const r = getRandomInt(3, 7);
  const dist = getRandomInt(r + 1, r + 5);
  const tangent = Math.sqrt(dist*dist - r*r).toFixed(2);
  return {
    category: 'Geometry',
    subCategory: 'Circles',
    difficulty: 'medium' as const,
    text: `A line is tangent to a circle of radius ${r} at point P. The distance from the center of the circle to a point Q on the tangent line is ${dist}. What is the length of the segment PQ?`,
    options: [`${Math.sqrt(dist*dist + r*r).toFixed(2)}`, `${(dist - r).toFixed(2)}`, `${tangent}`, `${(dist + r).toFixed(2)}`, `${(dist*dist - r*r).toFixed(2)}`],
    correctAnswer: 2,
    explanation: `A tangent is perpendicular to the radius at the point of tangency, forming a right triangle. PQ = √(hypotenuse² - radius²) = √(${dist}² - ${r}²) = √(${dist*dist - r*r}) ≈ ${tangent}.`
  };
};

export const generateVolumeCylinderMedium = () => {
  const r = getRandomInt(2, 5);
  const h = getRandomInt(4, 10);
  const vol = r * r * h;
  return {
    category: 'Geometry',
    subCategory: 'Volume',
    difficulty: 'medium' as const,
    text: `What is the volume of a cylinder with radius ${r} and height ${h}?`,
    options: [`${vol / 2}π`, `${vol}π`, `${vol * 2}π`, `${2 * r * h}π`, `${r * h}π`],
    correctAnswer: 1,
    explanation: `Volume of a cylinder = πr²h = π(${r}²)(${h}) = ${vol}π.`
  };
};

export const generateCompositeAreaHard = () => {
  const w = getRandomInt(8, 16);
  const h = getRandomInt(6, 12);
  const hEven = h % 2 === 0 ? h : h + 1;
  const r = hEven / 2;
  const rectArea = w * hEven;
  const semiArea = (0.5 * Math.PI * r * r);
  const ans = (rectArea - semiArea).toFixed(1);
  return {
    category: 'Geometry',
    subCategory: 'Composite Area',
    difficulty: 'hard' as const,
    text: `A rectangle is ${w} units long and ${hEven} units wide. A semicircle with a diameter of ${hEven} is removed from one of the shorter sides. What is the approximate area of the remaining shape?`,
    options: [
      `${rectArea}`,
      `${ans}`,
      `${(rectArea - semiArea * 2).toFixed(1)}`,
      `${(rectArea + semiArea).toFixed(1)}`,
      `${(w * hEven / 2).toFixed(1)}`
    ],
    correctAnswer: 1,
    explanation: `Area of rectangle = ${w} × ${hEven} = ${rectArea}. Area of semicircle = 1/2 × π × ${r}² = ${semiArea.toFixed(1)}. Remaining area ≈ ${ans}.`
  };
};

export const generateSurfaceAreaCylinderHard = () => {
  const r = getRandomInt(2, 6);
  const h = getRandomInt(5, 12);
  const sa = 2 * r * r + 2 * r * h;
  return {
    category: 'Geometry',
    subCategory: 'Surface Area',
    difficulty: 'hard' as const,
    text: `What is the total surface area of a cylinder with a radius of ${r} and a height of ${h}?`,
    options: [
      `${2 * r * h}π`,
      `${r * r + 2 * r * h}π`,
      `${sa}π`,
      `${sa + r * r}π`,
      `${2 * r * r}π`
    ],
    correctAnswer: 2,
    explanation: `Total SA = 2πr² + 2πrh = 2π(${r}²) + 2π(${r})(${h}) = ${2 * r * r}π + ${2 * r * h}π = ${sa}π.`
  };
};

export const generatePolygonSumAngles = () => {
  const n = getRandomInt(5, 10);
  const sum = (n - 2) * 180;
  const names = ["pentagon", "hexagon", "heptagon", "octagon", "nonagon", "decagon"];
  const name = names[n - 5];
  return {
    category: 'Geometry',
    subCategory: 'Polygons',
    difficulty: 'medium' as const,
    text: `What is the sum of the interior angles of a regular ${name}?`,
    options: [`${sum - 180}°`, `${sum + 180}°`, `${sum}°`, `${sum / 2}°`, `360°`],
    correctAnswer: 2,
    explanation: `The sum of the interior angles of an n-gon is (n - 2) × 180°. For a ${name} (n=${n}), the sum is (${n} - 2) × 180° = ${n - 2} × 180° = ${sum}°.`
  };
};

export const generatePolygonInteriorAngle = () => {
  const n = [6, 8, 10, 12][getRandomInt(0, 3)];
  const names: Record<number, string> = { 6: "hexagon", 8: "octagon", 10: "decagon", 12: "dodecagon" };
  const angle = (n - 2) * 180 / n;
  return {
    category: 'Geometry',
    subCategory: 'Polygons',
    difficulty: 'medium' as const,
    text: `What is the measure of each interior angle of a regular ${names[n]}?`,
    options: [`${angle - 20}°`, `${angle + 20}°`, `${angle}°`, `${180 - angle}°`, `180°`],
    correctAnswer: 2,
    explanation: `Each interior angle of a regular n-gon is [(n - 2) × 180°] / n. For a ${names[n]} (n=${n}), the angle is (${n - 2} × 180°) / ${n} = ${(n - 2) * 180}° / ${n} = ${angle}°.`
  };
};

export const generatePolygonExteriorAngle = () => {
  const n = getRandomInt(5, 12);
  const angle = (360 / n).toFixed(1);
  return {
    category: 'Geometry',
    subCategory: 'Polygons',
    difficulty: 'medium' as const,
    text: `What is the measure of each exterior angle of a regular ${n}-sided polygon?`,
    options: [`${(360 / (n + 1)).toFixed(1)}°`, `${(180 - 360 / n).toFixed(1)}°`, `45°`, `90°`, `${angle}°`],
    correctAnswer: 4,
    explanation: `The sum of exterior angles of any polygon is 360°. For a regular n-gon, each exterior angle is 360° / n. For n=${n}, the angle is 360° / ${n} = ${angle}°.`
  };
};

export const generateQuadrilateralAngles = () => {
  const a1 = getRandomInt(70, 100);
  const a2 = getRandomInt(100, 130);
  const a3 = getRandomInt(80, 110);
  const a4 = 360 - (a1 + a2 + a3);
  return {
    category: 'Geometry',
    subCategory: 'Polygons',
    difficulty: 'medium' as const,
    text: `A quadrilateral has three angles measuring ${a1}°, ${a2}°, and ${a3}°. What is the measure of the fourth angle?`,
    options: [`${a4 - 10}°`, `${a4 + 10}°`, `${a4}°`, `80°`, `90°`],
    correctAnswer: 2,
    explanation: `The sum of the interior angles of a quadrilateral is 360°. The fourth angle is 360° - ${a1}° - ${a2}° - ${a3}° = ${a4}°.`
  };
};

export const generateVolumeConeMedium = () => {
  let r, h, vol;
  do {
    r = getRandomInt(3, 6);
    h = getRandomInt(6, 12);
    vol = (r * r * h) / 3;
  } while (vol % 1 !== 0);
  return {
    category: 'Geometry',
    subCategory: 'Volume',
    difficulty: 'medium' as const,
    text: `What is the volume of a cone with radius ${r} and height ${h}?`,
    options: [`${r * r * h}π`, `${vol}π`, `${vol * 2}π`, `${vol / 2}π`, `${r * h}π`],
    correctAnswer: 1,
    explanation: `Volume of a cone = (1/3)πr²h. Here, (1/3)π(${r}²)(${h}) = (1/3)π(${r * r})(${h}) = ${vol}π.`
  };
};

export const generateVolumeSphereMedium = () => {
  const r = [3, 6, 9][getRandomInt(0, 2)];
  const volNum = 4 * Math.pow(r, 3);
  const vol = simplify(volNum, 3);
  return {
    category: 'Geometry',
    subCategory: 'Volume',
    difficulty: 'medium' as const,
    text: `What is the volume of a sphere with radius ${r}?`,
    options: [
      `${r * r}π`,
      `${2 * r * r}π`,
      `${vol}π`,
      `${simplify(volNum, 6)}π`,
      `${simplify(volNum * 2, 3)}π`
    ],
    correctAnswer: 2,
    explanation: `Volume of a sphere = (4/3)πr³ = (4/3)π(${r}³) = (4/3)π(${Math.pow(r, 3)}) = ${vol}π.`
  };
};

export const generateSurfaceAreaSphereMedium = () => {
  const r = getRandomInt(3, 8);
  const sa = 4 * r * r;
  return {
    category: 'Geometry',
    subCategory: 'Surface Area',
    difficulty: 'medium' as const,
    text: `What is the surface area of a sphere with radius ${r}?`,
    options: [`${r * r}π`, `${2 * r * r}π`, `${sa / 2}π`, `${sa}π`, `${sa * 2}π` ],
    correctAnswer: 3,
    explanation: `Surface Area of a sphere = 4πr². Here, 4π(${r}²) = 4π(${r * r}) = ${sa}π.`
  };
};

export const generateVolumeRatioConeCylinder = () => {
  return {
    category: 'Geometry',
    subCategory: 'Volume',
    difficulty: 'medium' as const,
    text: `A cone and a cylinder have the same radius and the same height. What is the ratio of the cone's volume to the cylinder's volume?`,
    options: [`1:2`, `1:4`, `1:3`, `2:3`, `3:1`],
    correctAnswer: 2,
    explanation: `The volume of a cylinder is πr²h and the volume of a cone is (1/3)πr²h. The ratio of the cone's volume to the cylinder's volume is (1/3)πr²h / πr²h = 1/3, or 1:3.`
  };
};
