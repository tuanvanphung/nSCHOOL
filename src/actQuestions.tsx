import React from 'react';
import { Question } from './questions';

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
const simplify = (num: number, den: number): string => {
  const common = gcd(Math.abs(num), Math.abs(den));
  const n = num / common;
  const d = den / common;
  if (d === 1) return `${n}`;
  return `${n}/${d}`;
};

export const generateACTQuestions = (): Question[] => {
  const qs: Question[] = [];
  
  for (let i = 0; i < 63; i++) {
    const type = i;
    let text = '';
    let options: string[] = [];
    let correctAnswer = 0;
    let explanation = '';
    let diagram: React.ReactNode = undefined;
    let category = '';
    let subCategory = '';

    switch (type) {
      case 0: {
        category = 'Algebra'; subCategory = 'Linear equations';
        const x = getRandomInt(2, 12);
        const a_coeff = getRandomInt(2, 8);
        const b_const = getRandomInt(2, 20);
        const c_val = a_coeff * x + b_const;
        text = `If ${a_coeff}x + ${b_const} = ${c_val}, what is the value of x?`;
        options = [`${x - 2}`, `${x - 1}`, `${x}`, `${x + 1}`, `${x + 2}`];
        correctAnswer = 2;
        explanation = `Subtract ${b_const} from both sides to get ${a_coeff}x = ${c_val - b_const}. Divide by ${a_coeff} to get x = ${x}.`;
        break;
      }
      case 1: {
        category = 'Statistics'; subCategory = 'Mean';
        const n1 = getRandomInt(10, 50);
        const n2 = getRandomInt(10, 50);
        const n3 = getRandomInt(10, 50);
        const n4 = getRandomInt(10, 50);
        const sum = n1 + n2 + n3 + n4;
        const avg = sum / 4;
        text = `What is the average of the numbers ${n1}, ${n2}, ${n3}, and ${n4}?`;
        options = [`${sum}`, `${sum / 3}`, `${avg}`, `${avg * 2}`, `${sum / 5}`];
        correctAnswer = 2;
        explanation = `The average is the sum divided by the count: (${n1} + ${n2} + ${n3} + ${n4}) / 4 = ${sum} / 4 = ${avg}.`;
        break;
      }
      case 2: {
        category = 'Probability'; subCategory = 'Simple probability';
        const red = getRandomInt(3, 10);
        const blue = getRandomInt(3, 10);
        const green = getRandomInt(3, 10);
        const total = red + blue + green;
        text = `A bag contains ${red} red marbles, ${blue} blue marbles, and ${green} green marbles. If one marble is drawn at random, what is the probability that it is blue?`;
        options = [`${blue}/${total + 2}`, `${blue - 1}/${total}`, `${blue}/${total}`, `${blue + 1}/${total}`, `${red}/${total}`];
        correctAnswer = 2;
        explanation = `The probability is the number of blue marbles divided by the total number of marbles: ${blue} / (${red} + ${blue} + ${green}) = ${blue}/${total}.`;
        break;
      }
      case 3: {
        category = 'Algebra'; subCategory = 'Matrices';
        const m11 = getRandomInt(1, 10);
        const m12 = getRandomInt(1, 10);
        const m21 = getRandomInt(1, 10);
        const m22 = getRandomInt(1, 10);
        text = `If matrix A = [${m11} ${m12}] and matrix B = [${m21} ${m22}], what is the top-left element of A + B?`;
        options = [`${m11 + m21 - 2}`, `${m11 + m21 - 1}`, `${m11 + m21}`, `${m11 + m21 + 1}`, `${m11 + m21 + 2}`];
        correctAnswer = 2;
        explanation = `To add matrices, add the corresponding elements. The top-left element is ${m11} + ${m21} = ${m11 + m21}.`;
        break;
      }
      case 4: {
        category = 'Trigonometry'; subCategory = 'Right triangles';
        const opp = getRandomInt(3, 8);
        const adj = getRandomInt(4, 9);
        const hypVal = Math.sqrt(opp*opp + adj*adj);
        const hyp = hypVal.toFixed(2);
        text = `In a right triangle, the side opposite angle θ is ${opp} and the adjacent side is ${adj}. What is the value of tan(θ)?`;
        options = [`${adj}/${opp}`, `${opp}/${hyp}`, `${adj}/${hyp}`, `${opp}/${adj}`, `${simplify(opp + adj, 2)}`];
        correctAnswer = 3;
        explanation = `Tangent is opposite over adjacent (TOA). tan(θ) = ${opp}/${adj}.`;
        break;
      }
      case 5: {
        category = 'Coordinate Geometry'; subCategory = 'Slope';
        const x1 = getRandomInt(-5, 5);
        const y1 = getRandomInt(-5, 5);
        const x2 = x1 + getRandomInt(1, 5);
        const y2 = y1 + getRandomInt(1, 5);
        const dy = y2 - y1;
        const dx = x2 - x1;
        text = `What is the slope of the line passing through (${x1}, ${y1}) and (${x2}, ${y2})?`;
        options = [`${dx}/${dy}`, `-${dy}/${dx}`, `${dy}/${dx}`, `-${dx}/${dy}`, `${dy + dx}`];
        correctAnswer = 2;
        explanation = `Slope = (y2 - y1) / (x2 - x1) = (${y2} - ${y1}) / (${x2} - ${x1}) = ${dy}/${dx}.`;
        break;
      }
      case 6: {
        category = 'Coordinate Geometry'; subCategory = 'Midpoint';
        const x1 = getRandomInt(-10, 10);
        const y1 = getRandomInt(-10, 10);
        const x2 = getRandomInt(-10, 10);
        const y2 = getRandomInt(-10, 10);
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        text = `What is the midpoint of the line segment with endpoints (${x1}, ${y1}) and (${x2}, ${y2})?`;
        options = [
          `(${(x1 - x2) / 2}, ${(y1 - y2) / 2})`, 
          `(${my}, ${mx})`, 
          `(${mx}, ${my})`, 
          `(${x1 + x2}, ${y1 + y2})`, 
          `(${mx * 2}, ${my * 2})`
        ];
        correctAnswer = 2;
        explanation = `Midpoint = ((x1 + x2)/2, (y1 + y2)/2) = ((${x1} + ${x2})/2, (${y1} + ${y2})/2) = (${mx}, ${my}).`;
        break;
      }
      case 7: {
        category = 'Coordinate Geometry'; subCategory = 'Distance';
        const x1 = getRandomInt(1, 5);
        const y1 = getRandomInt(1, 5);
        const x2 = x1 + 3;
        const y2 = y1 + 4;
        text = `What is the distance between the points (${x1}, ${y1}) and (${x2}, ${y2})?`;
        options = [`3`, `4`, `5`, `6`, `7`];
        correctAnswer = 2;
        explanation = `Distance = √((x2 - x1)² + (y2 - y1)²) = √((3)² + (4)²) = √(9 + 16) = √25 = 5.`;
        break;
      }
      case 8: {
        category = 'Algebra'; subCategory = 'Complex numbers';
        const a1 = getRandomInt(2, 6);
        const b1 = getRandomInt(2, 6);
        const a2 = getRandomInt(2, 6);
        const b2 = getRandomInt(2, 6);
        text = `If i² = -1, what is the sum of (${a1} + ${b1}i) and (${a2} + ${b2}i)?`;
        options = [`${a1 + a2 - 1} + ${b1 + b2}i`, `${a1 + a2} + ${b1 + b2 - 1}i`, `${a1 + a2} + ${b1 + b2}i`, `${a1 + a2 + 1} + ${b1 + b2}i`, `${a1 + a2} + ${b1 + b2 + 1}i`];
        correctAnswer = 2;
        explanation = `Add the real parts and the imaginary parts: (${a1} + ${a2}) + (${b1} + ${b2})i = ${a1 + a2} + ${b1 + b2}i.`;
        break;
      }
      case 9: {
        category = 'Algebra'; subCategory = 'Logarithms';
        const base = getRandomInt(2, 5);
        const exp = getRandomInt(2, 4);
        const val = Math.pow(base, exp);
        text = `What is the value of log_${base}(${val})?`;
        options = [`${exp - 2}`, `${exp - 1}`, `${exp}`, `${exp + 1}`, `${exp + 2}`];
        correctAnswer = 2;
        explanation = `log_${base}(${val}) asks "what power of ${base} gives ${val}?". Since ${base}^${exp} = ${val}, the answer is ${exp}.`;
        break;
      }
      case 10: {
        category = 'Algebra'; subCategory = 'Systems of equations';
        const x = getRandomInt(1, 5);
        const y = getRandomInt(1, 5);
        const eq1 = x + y;
        const eq2 = x - y;
        text = `If x + y = ${eq1} and x - y = ${eq2}, what is the value of x?`;
        options = [`${x - 2}`, `${x - 1}`, `${x}`, `${x + 1}`, `${x + 2}`];
        correctAnswer = 2;
        explanation = `Adding the two equations gives 2x = ${eq1 + eq2}, so x = ${(eq1 + eq2) / 2} = ${x}.`;
        break;
      }
      case 11: {
        category = 'Algebra'; subCategory = 'Functions';
        const a = getRandomInt(2, 5);
        const b = getRandomInt(1, 5);
        const x = getRandomInt(2, 5);
        const ans = a * x * x + b;
        text = `If f(x) = ${a}x² + ${b}, what is the value of f(${x})?`;
        options = [`${ans - 10}`, `${ans - 5}`, `${ans}`, `${ans + 5}`, `${ans + 10}`];
        correctAnswer = 2;
        explanation = `Substitute ${x} for x: f(${x}) = ${a}(${x})² + ${b} = ${a}(${x * x}) + ${b} = ${a * x * x} + ${b} = ${ans}.`;
        break;
      }
      case 12: {
        category = 'Algebra'; subCategory = 'Exponents';
        const base = getRandomInt(2, 5);
        const exp1 = getRandomInt(3, 8);
        const exp2 = getRandomInt(2, 5);
        text = `Which of the following is equivalent to (${base}^${exp1}) / (${base}^${exp2})?`;
        options = [`${base}^${exp1 + exp2}`, `${base}^${exp1 * exp2}`, `${base}^${exp1 - exp2}`, `${base}^${Math.abs(exp1 - exp2) + 1}`, `${base * 2}^${exp1 - exp2}`];
        correctAnswer = 2;
        explanation = `When dividing with the same base, subtract the exponents: ${exp1} - ${exp2} = ${exp1 - exp2}. So, ${base}^${exp1 - exp2}.`;
        break;
      }
      case 13: {
        category = 'Arithmetic'; subCategory = 'Percentages';
        const percent = getRandomInt(1, 9) * 10;
        const whole = getRandomInt(2, 10) * 10;
        const part = (percent * whole) / 100;
        text = `What is ${percent}% of ${whole}?`;
        options = [`${part - 10}`, `${part - 5}`, `${part}`, `${part + 5}`, `${part + 10}`];
        correctAnswer = 2;
        explanation = `${percent}% = ${percent / 100}. ${percent / 100} × ${whole} = ${part}.`;
        break;
      }
      case 14: {
        category = 'Geometry'; subCategory = 'Circles';
        const r = getRandomInt(2, 10);
        const area = r * r;
        text = `What is the area of a circle with a radius of ${r}?`;
        options = [`${r * 2}π`, `${area * 4}π`, `${area}π`, `${r}π`, `${area / 2}π`];
        correctAnswer = 2;
        explanation = `The area of a circle is πr². π(${r})² = ${area}π.`;
        break;
      }
      case 15: {
        category = 'Geometry'; subCategory = 'Right triangles';
        const a = getRandomInt(1, 4) * 3;
        const b = (a / 3) * 4;
        const c = (a / 3) * 5;
        text = `In a right triangle, the lengths of the legs are ${a} and ${b}. What is the length of the hypotenuse?`;
        options = [`${c - 2}`, `${c - 1}`, `${c}`, `${c + 1}`, `${c + 2}`];
        correctAnswer = 2;
        explanation = `Using the Pythagorean theorem (a² + b² = c²): ${a}² + ${b}² = ${a*a} + ${b*b} = ${a*a + b*b}. √${a*a + b*b} = ${c}.`;
        break;
      }
      case 16: {
        category = 'Algebra'; subCategory = 'Quadratics';
        const r1 = getRandomInt(1, 5);
        const r2 = getRandomInt(1, 5);
        const b = r1 + r2;
        const c = r1 * r2;
        text = `Which of the following is the factored form of x² + ${b}x + ${c}?`;
        options = [`(x + ${r1 - 1})(x + ${r2 + 1})`, `(x - ${r1})(x - ${r2})`, `(x + ${r1})(x + ${r2})`, `(x + ${b})(x + ${c})`, `(x + ${c})(x + 1)`];
        correctAnswer = 2;
        explanation = `We need two numbers that multiply to ${c} and add to ${b}. Those numbers are ${r1} and ${r2}. So, (x + ${r1})(x + ${r2}).`;
        break;
      }
      case 17: {
        category = 'Arithmetic'; subCategory = 'Ratios';
        const r1 = getRandomInt(2, 5);
        const r2 = getRandomInt(3, 7);
        const mult = getRandomInt(2, 6);
        const total = (r1 + r2) * mult;
        text = `The ratio of boys to girls in a class is ${r1}:${r2}. If there are ${total} students in total, how many boys are there?`;
        options = [`${r1 * mult - 2}`, `${r1 * mult - 1}`, `${r1 * mult}`, `${r1 * mult + 1}`, `${r1 * mult + 2}`];
        correctAnswer = 2;
        explanation = `The total ratio parts are ${r1} + ${r2} = ${r1 + r2}. Each part is ${total} / ${r1 + r2} = ${mult}. The number of boys is ${r1} × ${mult} = ${r1 * mult}.`;
        break;
      }
      case 18: {
        category = 'Algebra'; subCategory = 'Absolute value';
        const ans = getRandomInt(3, 10);
        const val = getRandomInt(5, 15);
        text = `If |x - ${ans}| = ${val}, what is the positive value of x?`;
        options = [`${ans + val - 2}`, `${ans + val - 1}`, `${ans + val}`, `${ans + val + 1}`, `${ans + val + 2}`];
        correctAnswer = 2;
        explanation = `x - ${ans} = ${val} or x - ${ans} = -${val}. The positive solution is x = ${val} + ${ans} = ${ans + val}.`;
        break;
      }
      case 19: {
        category = 'Arithmetic'; subCategory = 'Scientific notation';
        const coeff = getRandomInt(2, 9);
        const exp = getRandomInt(3, 6);
        const val = coeff * Math.pow(10, exp);
        text = `How is the number ${val} written in scientific notation?`;
        options = [`${coeff} × 10^${exp - 1}`, `${coeff * 10} × 10^${exp - 1}`, `${coeff} × 10^${exp}`, `${coeff} × 10^${exp + 1}`, `${coeff / 10} × 10^${exp + 1}`];
        correctAnswer = 2;
        explanation = `Move the decimal point ${exp} places to the left to get ${coeff}. This gives ${coeff} × 10^${exp}.`;
        break;
      }
      case 20: {
        category = 'Algebra'; subCategory = 'Linear equations';
        const x = getRandomInt(2, 8);
        const den = getRandomInt(2, 5);
        const a = getRandomInt(2, 6);
        const b = getRandomInt(1, 10);
        const c = (a * x) / den + b;
        text = `If (${a}x / ${den}) + ${b} = ${c}, what is the value of x?`;
        options = [`${x - den}`, `${x - 1}`, `${x}`, `${x + 1}`, `${x + den}`];
        correctAnswer = 2;
        explanation = `Subtract ${b}: (${a}x / ${den}) = ${c - b}. Multiply by ${den}: ${a}x = ${(c - b) * den}. Divide by ${a}: x = ${x}.`;
        break;
      }
      case 21: {
        category = 'Algebra'; subCategory = 'Inequalities';
        const a = -getRandomInt(2, 5);
        const b = getRandomInt(2, 10);
        const x = getRandomInt(2, 6);
        const c = a * x + b;
        text = `Solve the inequality: ${a}x + ${b} < ${c}`;
        options = [`x < ${x}`, `x > ${x}`, `x < ${-x}`, `x > ${-x}`, `x < ${x + b}`];
        correctAnswer = 1;
        explanation = `Subtract ${b}: ${a}x < ${c - b}. Divide by ${a} and flip the inequality sign (since ${a} is negative): x > ${x}.`;
        break;
      }
      case 22: {
        category = 'Algebra'; subCategory = 'Rational expressions';
        const a = getRandomInt(2, 5);
        const b = getRandomInt(1, 5);
        text = `Simplify the expression: (${a}x² + ${a * b}x) / (${a}x)`;
        options = [`x + ${b}`, `x² + ${b}`, `${a}x + ${b}`, `x + ${a * b}`, `x`];
        correctAnswer = 0;
        explanation = `Factor the numerator: ${a}x(x + ${b}). Divide by ${a}x to get x + ${b}.`;
        break;
      }
      case 23: {
        category = 'Algebra'; subCategory = 'Quadratics';
        const r1 = getRandomInt(2, 6);
        const r2 = -getRandomInt(2, 6);
        const b = -(r1 + r2);
        const c = r1 * r2;
        const bText = b === 0 ? '' : `${b > 0 ? '+ ' : '- '}${Math.abs(b) === 1 ? '' : Math.abs(b)}x `;
        text = `What are the solutions to the equation x² ${bText}${c > 0 ? '+ ' : '- '}${Math.abs(c)} = 0?`;
        options = [`x = ${-r1}, x = ${-r2}`, `x = ${r1}, x = ${-r2}`, `x = ${r1}, x = ${r2}`, `x = ${-r1}, x = ${r2}`, `x = ${r1 + 1}, x = ${r2 - 1}`];
        correctAnswer = 2;
        explanation = `The equation factors to (x - ${r1})(x - ${r2}) = 0. The solutions are x = ${r1} and x = ${r2}.`;
        break;
      }
      case 24: {
        category = 'Algebra'; subCategory = 'Quadratics';
        const h = getRandomInt(1, 5);
        const k = getRandomInt(1, 5);
        const a = getRandomInt(2, 4);
        text = `What is the vertex of the parabola given by the equation y = ${a}(x - ${h})² + ${k}?`;
        options = [`(-${h}, ${k})`, `(${h}, -${k})`, `(${h}, ${k})`, `(-${h}, -${k})`, `(${a}, ${k})`];
        correctAnswer = 2;
        explanation = `The vertex form of a parabola is y = a(x - h)² + k, where (h, k) is the vertex. Here, the vertex is (${h}, ${k}).`;
        break;
      }
      case 25: {
        category = 'Algebra'; subCategory = 'Functions';
        const a = getRandomInt(2, 4);
        const b = getRandomInt(1, 5);
        const c = getRandomInt(2, 4);
        const x = getRandomInt(1, 3);
        const gx = c * x;
        const fgx = a * gx + b;
        text = `If f(x) = ${a}x + ${b} and g(x) = ${c}x, what is the value of f(g(${x}))?`;
        options = [`${fgx - a}`, `${fgx - c}`, `${fgx}`, `${fgx + c}`, `${fgx + a}`];
        correctAnswer = 2;
        explanation = `First find g(${x}) = ${c}(${x}) = ${gx}. Then find f(${gx}) = ${a}(${gx}) + ${b} = ${fgx}.`;
        break;
      }
      case 26: {
        category = 'Algebra'; subCategory = 'Functions';
        const a = getRandomInt(2, 5);
        const b = getRandomInt(1, 8);
        text = `If f(x) = ${a}x + ${b}, what is the inverse function, f⁻¹(x)?`;
        options = [`(x + ${b}) / ${a}`, `(x - ${b}) / ${a}`, `${a}x - ${b}`, `(x / ${a}) - ${b}`, `x / ${a} + ${b}`];
        correctAnswer = 1;
        explanation = `Let y = ${a}x + ${b}. Swap x and y: x = ${a}y + ${b}. Solve for y: y = (x - ${b}) / ${a}.`;
        break;
      }
      case 27: {
        category = 'Algebra'; subCategory = 'Systems of equations';
        const x = getRandomInt(2, 5);
        const y = getRandomInt(2, 5);
        const a = getRandomInt(2, 4);
        const b = y - a * x;
        const c = getRandomInt(2, 4);
        const d = getRandomInt(2, 4);
        const e = c * x + d * y;
        text = `Given the system of equations:\ny = ${a}x ${b >= 0 ? '+' : ''}${b}\n${c}x + ${d}y = ${e}\nWhat is the value of y?`;
        options = [`${y - 2}`, `${y - 1}`, `${y}`, `${y + 1}`, `${y + 2}`];
        correctAnswer = 2;
        explanation = `Substitute y into the second equation: ${c}x + ${d}(${a}x ${b >= 0 ? '+' : ''}${b}) = ${e}. Solve for x to get x = ${x}. Then y = ${a}(${x}) ${b >= 0 ? '+' : ''}${b} = ${y}.`;
        break;
      }
      case 28: {
        category = 'Geometry'; subCategory = 'Similar triangles';
        const s1 = getRandomInt(3, 6);
        const s2 = getRandomInt(4, 8);
        const scale = getRandomInt(2, 4);
        text = `Triangle ABC is similar to Triangle DEF. If AB = ${s1} and BC = ${s2}, and DE = ${s1 * scale}, what is the length of EF?`;
        options = [`${s2 * scale - 2}`, `${s2 * scale - 1}`, `${s2 * scale}`, `${s2 * scale + 1}`, `${s2 * scale + 2}`];
        correctAnswer = 2;
        explanation = `The scale factor from ABC to DEF is DE / AB = ${s1 * scale} / ${s1} = ${scale}. So, EF = BC × ${scale} = ${s2} × ${scale} = ${s2 * scale}.`;
        break;
      }
      case 29: {
        category = 'Geometry'; subCategory = 'Angles';
        const angle = getRandomInt(40, 80);
        text = `Two parallel lines are intersected by a transversal. If one of the acute interior angles measures ${angle}°, what is the measure of the consecutive interior angle?`;
        options = [`${angle}°`, `${90 - angle}°`, `${180 - angle}°`, `${180 + angle}°`, `90°`];
        correctAnswer = 2;
        explanation = `Consecutive interior angles are supplementary, so they add up to 180°. 180° - ${angle}° = ${180 - angle}°.`;
        break;
      }
      case 30: {
        category = 'Geometry'; subCategory = 'Right triangles';
        const x = getRandomInt(2, 8);
        text = `In a 30°-60°-90° triangle, the length of the shortest leg is ${x}. What is the length of the hypotenuse?`;
        options = [`${x}√2`, `${x}√3`, `${2 * x}`, `${3 * x}`, `${x / 2}`];
        correctAnswer = 2;
        explanation = `In a 30°-60°-90° triangle, the hypotenuse is twice the length of the shortest leg. ${x} × 2 = ${2 * x}.`;
        break;
      }
      case 31: {
        category = 'Geometry'; subCategory = 'Right triangles';
        const x = getRandomInt(2, 8);
        text = `In a 45°-45°-90° triangle, the length of a leg is ${x}. What is the length of the hypotenuse?`;
        options = [`${x}`, `${x}√2`, `${x}√3`, `${2 * x}`, `${x * x}`];
        correctAnswer = 1;
        explanation = `In a 45°-45°-90° triangle, the hypotenuse is √2 times the length of a leg. So, ${x}√2.`;
        break;
      }
      case 32: {
        category = 'Geometry'; subCategory = 'Circles';
        const r = getRandomInt(3, 9);
        const angle = getRandomInt(1, 5) * 30; // 30, 60, 90, 120, 150
        const frac = simplify(angle * r, 180);
        const wrongFrac1 = simplify(angle * r * r, 360); // Sector area instead
        const wrongFrac2 = simplify(angle * (2 * r), 180); // Using diameter wrong
        text = `In a circle with radius ${r}, what is the length of an arc intercepted by a central angle of ${angle}°?`;
        options = [`(${wrongFrac1})π`, `(${frac})π`, `(${wrongFrac2})π`, `${r}π`, `${r * 2}π`];
        correctAnswer = 1;
        explanation = `Arc length = (θ/360) × 2πr = (${angle}/360) × 2π(${r}) = (${angle * r}/180)π = (${frac})π.`;
        break;
      }
      case 33: {
        category = 'Geometry'; subCategory = 'Circles';
        const r = getRandomInt(2, 8);
        const angle = getRandomInt(1, 4) * 45; // 45, 90, 135, 180
        const frac = simplify(angle * r * r, 360);
        const wrongFrac1 = simplify(angle * r, 180); // Arc length instead
        const wrongFrac2 = simplify(angle * (2 * r) * (2 * r), 360); // Using diameter instead of radius
        text = `What is the area of a sector of a circle with radius ${r} and a central angle of ${angle}°?`;
        options = [`(${wrongFrac1})π`, `(${frac})π`, `(${wrongFrac2})π`, `${r * r}π`, `${r}π`];
        correctAnswer = 1;
        explanation = `Sector area = (θ/360) × πr² = (${angle}/360) × π(${r}²) = (${angle * r * r}/360)π = (${frac})π.`;
        break;
      }
      case 34: {
        category = 'Geometry'; subCategory = 'Circles';
        const r = getRandomInt(3, 7);
        const dist = getRandomInt(r + 1, r + 5);
        const tangent = Math.sqrt(dist*dist - r*r).toFixed(2);
        text = `A line is tangent to a circle of radius ${r} at point P. The distance from the center of the circle to a point Q on the tangent line is ${dist}. What is the length of the segment PQ?`;
        options = [`${Math.sqrt(dist*dist + r*r).toFixed(2)}`, `${(dist - r).toFixed(2)}`, `${tangent}`, `${(dist + r).toFixed(2)}`, `${(dist*dist - r*r).toFixed(2)}`];
        correctAnswer = 2;
        explanation = `A tangent is perpendicular to the radius at the point of tangency, forming a right triangle. PQ = √(hypotenuse² - radius²) = √(${dist}² - ${r}²) = √(${dist*dist - r*r}) ≈ ${tangent}.`;
        break;
      }
      case 35: {
        category = 'Geometry'; subCategory = 'Volume';
        const r = getRandomInt(2, 5);
        const h = getRandomInt(4, 10);
        const vol = r * r * h;
        text = `What is the volume of a cylinder with radius ${r} and height ${h}?`;
        options = [`${vol / 2}π`, `${vol}π`, `${vol * 2}π`, `${2 * r * h}π`, `${r * h}π`];
        correctAnswer = 1;
        explanation = `Volume of a cylinder = πr²h = π(${r}²)(${h}) = ${vol}π.`;
        break;
      }
      case 36: {
        category = 'Word Problems'; subCategory = 'Rates';
        const rate = getRandomInt(40, 70);
        const time = getRandomInt(2, 5);
        const dist = rate * time;
        text = `A car travels at a constant speed of ${rate} miles per hour. How long will it take to travel ${dist} miles?`;
        options = [`${time - 1} hours`, `${time - 0.5} hours`, `${time} hours`, `${time + 0.5} hours`, `${time + 1} hours`];
        correctAnswer = 2;
        explanation = `Time = Distance / Rate = ${dist} / ${rate} = ${time} hours.`;
        break;
      }
      case 37: {
        category = 'Word Problems'; subCategory = 'Work';
        const t1 = getRandomInt(2, 4);
        const t2 = getRandomInt(5, 8);
        const combined = (t1 * t2) / (t1 + t2);
        text = `Machine A can complete a job in ${t1} hours. Machine B can complete the same job in ${t2} hours. Working together, how many hours will it take them to complete the job?`;
        options = [`${(t1 + t2) / 2}`, `${t1 + t2}`, `${combined.toFixed(2)}`, `${(t2 - t1).toFixed(2)}`, `${(t1 * t2).toFixed(2)}`];
        correctAnswer = 2;
        explanation = `Rate A = 1/${t1}, Rate B = 1/${t2}. Combined rate = 1/${t1} + 1/${t2} = ${(t1+t2)}/${t1*t2}. Time = 1 / Combined rate = ${t1*t2}/${t1+t2} ≈ ${combined.toFixed(2)} hours.`;
        break;
      }
      case 38: {
        category = 'Word Problems'; subCategory = 'Mixtures';
        const vol1 = getRandomInt(10, 30);
        const pct1 = getRandomInt(10, 20);
        const vol2 = getRandomInt(10, 30);
        const pct2 = getRandomInt(30, 50);
        const finalPct = ((vol1 * pct1 + vol2 * pct2) / (vol1 + vol2)).toFixed(1);
        text = `If ${vol1} liters of a ${pct1}% acid solution are mixed with ${vol2} liters of a ${pct2}% acid solution, what is the concentration of the resulting mixture?`;
        options = [`${(pct1 + pct2)/2}%`, `${pct1 + pct2}%`, `${finalPct}%`, `${Math.abs(pct1 - pct2)}%`, `${(parseFloat(finalPct) + 5).toFixed(1)}%`];
        correctAnswer = 2;
        explanation = `Total acid = (${pct1/100} × ${vol1}) + (${pct2/100} × ${vol2}) = ${vol1*pct1/100 + vol2*pct2/100}. Total volume = ${vol1 + vol2}. Concentration = (${vol1*pct1/100 + vol2*pct2/100} / ${vol1 + vol2}) × 100 ≈ ${finalPct}%.`;
        break;
      }
      case 39: {
        category = 'Word Problems'; subCategory = 'Unit conversion';
        const feet = getRandomInt(10, 50);
        const inches = feet * 12;
        text = `How many inches are in ${feet} feet?`;
        options = [`${inches - 12}`, `${inches}`, `${inches + 12}`, `${feet / 12}`, `${feet * 3}`];
        correctAnswer = 1;
        explanation = `There are 12 inches in a foot. ${feet} × 12 = ${inches}.`;
        break;
      }
      case 40: {
        category = 'Statistics'; subCategory = 'Permutations';
        const n = getRandomInt(5, 8);
        const r = 3;
        let perm = 1;
        for (let j = 0; j < r; j++) perm *= (n - j);
        text = `How many ways can a president, vice president, and secretary be chosen from a club of ${n} members?`;
        options = [`${perm / 6}`, `${perm}`, `${perm * 2}`, `${n * 3}`, `${Math.pow(n, 3)}`];
        correctAnswer = 1;
        explanation = `This is a permutation of ${n} items taken ${r} at a time: ${n}P${r} = ${n} × ${n-1} × ${n-2} = ${perm}.`;
        break;
      }
      case 41: {
        category = 'Statistics'; subCategory = 'Combinations';
        const n = getRandomInt(6, 10);
        const r = 3;
        let perm = 1;
        for (let j = 0; j < r; j++) perm *= (n - j);
        const comb = perm / 6; // 3!
        text = `How many ways can a committee of 3 people be chosen from a group of ${n} people?`;
        options = [`${perm}`, `${comb}`, `${comb * 2}`, `${n * 3}`, `${n + 3}`];
        correctAnswer = 1;
        explanation = `This is a combination of ${n} items taken ${r} at a time: ${n}C${r} = (${n} × ${n-1} × ${n-2}) / (3 × 2 × 1) = ${comb}.`;
        break;
      }
      case 42: {
        category = 'Statistics'; subCategory = 'Median';
        const list = [getRandomInt(1, 10), getRandomInt(11, 20), getRandomInt(21, 30), getRandomInt(31, 40), getRandomInt(41, 50), getRandomInt(51, 60)];
        const sorted = [...list].sort((a, b) => a - b);
        const median = (sorted[2] + sorted[3]) / 2;
        text = `What is the median of the following data set: ${list.join(', ')}?`;
        options = [`${sorted[2]}`, `${sorted[3]}`, `${median}`, `${(sorted[0] + sorted[5])/2}`, `${sorted[4]}`];
        correctAnswer = 2;
        explanation = `Order the set: ${sorted.join(', ')}. The median is the average of the two middle numbers: (${sorted[2]} + ${sorted[3]}) / 2 = ${median}.`;
        break;
      }
      case 43: {
        category = 'Statistics'; subCategory = 'IQR';
        const list = [getRandomInt(1, 5), getRandomInt(6, 10), getRandomInt(11, 15), getRandomInt(16, 20), getRandomInt(21, 25), getRandomInt(26, 30), getRandomInt(31, 35)];
        const sorted = [...list].sort((a, b) => a - b);
        const q1 = sorted[1];
        const q3 = sorted[5];
        const iqr = q3 - q1;
        text = `What is the interquartile range (IQR) of the following data set: ${list.join(', ')}?`;
        options = [`${iqr - 2}`, `${iqr}`, `${iqr + 2}`, `${q3}`, `${q1}`];
        correctAnswer = 1;
        explanation = `Order the set: ${sorted.join(', ')}. Q1 is the median of the lower half (${q1}), Q3 is the median of the upper half (${q3}). IQR = Q3 - Q1 = ${q3} - ${q1} = ${iqr}.`;
        break;
      }
      case 44: {
        category = 'Statistics'; subCategory = 'Weighted mean';
        const w1 = getRandomInt(2, 5);
        const v1 = getRandomInt(70, 80);
        const w2 = getRandomInt(2, 5);
        const v2 = getRandomInt(85, 95);
        const wMean = ((w1 * v1 + w2 * v2) / (w1 + w2)).toFixed(1);
        text = `A student has ${w1} test scores of ${v1} and ${w2} test scores of ${v2}. What is the student's overall average?`;
        options = [`${(v1 + v2) / 2}`, `${wMean}`, `${v1 + w1}`, `${v2 - w2}`, `${(parseFloat(wMean) + 2).toFixed(1)}`];
        correctAnswer = 1;
        explanation = `Weighted mean = (Sum of all scores) / (Total number of scores) = (${w1} × ${v1} + ${w2} × ${v2}) / (${w1} + ${w2}) = ${(w1*v1 + w2*v2)} / ${w1+w2} ≈ ${wMean}.`;
        break;
      }
      case 45: {
        category = 'Multi-skill'; subCategory = 'Coordinate geometry + Lines';
        const x1 = getRandomInt(1, 4);
        const y1 = getRandomInt(1, 4);
        const x2 = x1 + getRandomInt(1, 3);
        const y2 = y1 + getRandomInt(2, 5);
        const m = (y2 - y1) / (x2 - x1);
        const b = y1 - m * x1;
        text = `A line passes through the points (${x1}, ${y1}) and (${x2}, ${y2}). What is the y-intercept of this line?`;
        options = [`${b - 1}`, `${b}`, `${b + 1}`, `${m}`, `${y1}`];
        correctAnswer = 1;
        explanation = `First find the slope m = (${y2} - ${y1}) / (${x2} - ${x1}) = ${m}. Then use y = mx + b with point (${x1}, ${y1}): ${y1} = ${m}(${x1}) + b. So b = ${y1} - ${m*x1} = ${b}.`;
        break;
      }
      case 46: {
        category = 'Multi-skill'; subCategory = 'Similarity + Trig';
        const opp = getRandomInt(3, 5);
        const adj = getRandomInt(4, 6);
        const hyp = Math.sqrt(opp*opp + adj*adj);
        const scale = getRandomInt(2, 4);
        text = `Triangle ABC is a right triangle with legs of length ${opp} and ${adj}. Triangle DEF is similar to ABC with a scale factor of ${scale}. What is the sine of the smallest angle in Triangle DEF?`;
        options = [`${opp}/${adj}`, `${adj}/${hyp.toFixed(2)}`, `${opp}/${hyp.toFixed(2)}`, `${(opp*scale)}/${(hyp*scale).toFixed(2)}`, `${adj}/${opp}`];
        correctAnswer = 2;
        explanation = `Similar triangles have the same angle measures, so the sine of the angle is the same in both triangles. The smallest angle is opposite the shortest leg (${opp}). sin(θ) = opposite / hypotenuse = ${opp} / √(${opp}² + ${adj}²) ≈ ${opp}/${hyp.toFixed(2)}.`;
        break;
      }
      case 47: {
        category = 'Multi-skill'; subCategory = 'Circles + Algebra';
        const r = getRandomInt(3, 8);
        const area = r * r;
        text = `The area of a circle is given by the expression (${area}π). If the radius is represented by (x - 2), what is the value of x?`;
        options = [`${r - 2}`, `${r}`, `${r + 2}`, `${area}`, `${area + 2}`];
        correctAnswer = 2;
        explanation = `Area = πr² = ${area}π, so r² = ${area}, meaning r = ${r}. If r = x - 2, then ${r} = x - 2, so x = ${r + 2}.`;
        break;
      }
      case 48: {
        category = 'Algebra'; subCategory = 'Complex numbers';
        const a = getRandomInt(2, 5);
        const b = getRandomInt(2, 5);
        const c = getRandomInt(2, 5);
        const d = getRandomInt(2, 5);
        const real = a * c - b * d;
        const imag = a * d + b * c;
        const wrongReal = a * c + b * d; // Sign error on i^2
        text = `If i² = -1, what is the product of (${a} + ${b}i) and (${c} + ${d}i)?`;
        options = [`${real} + ${imag}i`, `${wrongReal} + ${imag}i`, `${a*c} + ${b*d}i`, `${a*c} - ${b*d}i`, `${real} - ${imag}i`];
        correctAnswer = 0;
        explanation = `FOIL: (${a})(${c}) + (${a})(${d}i) + (${b}i)(${c}) + (${b}i)(${d}i) = ${a*c} + ${a*d}i + ${b*c}i + ${b*d}i². Since i² = -1, this is ${a*c} - ${b*d} + (${a*d + b*c})i = ${real} + ${imag}i.`;
        break;
      }
      case 49: {
        category = 'Algebra'; subCategory = 'Logarithms';
        const x_val = getRandomInt(2, 5);
        const y_val = getRandomInt(2, 5);
        text = `Which of the following is equivalent to log(x^${x_val}) + log(y^${y_val})?`;
        options = [
          `log(x^${x_val} + y^${y_val})`, 
          `log(x^${x_val} * y^${y_val})`, 
          `log(x^${x_val} / y^${y_val})`, 
          `log(${x_val}x * ${y_val}y)`, 
          `log(x + y)^${x_val + y_val}`
        ];
        correctAnswer = 1;
        explanation = `By logarithm properties, log(a) + log(b) = log(a * b). Therefore, log(x^${x_val}) + log(y^${y_val}) = log(x^${x_val} * y^${y_val}).`;
        break;
      }
      case 50: {
        category = 'Number & Quantity'; subCategory = 'Remainders';
        const base = 7;
        const exp = getRandomInt(50, 60);
        const mod = 5;
        // 7^1 mod 5 = 2
        // 7^2 mod 5 = 4
        // 7^3 mod 5 = 3
        // 7^4 mod 5 = 1 (cycle of 4: 2, 4, 3, 1)
        const cycle = [1, 2, 4, 3]; // index is exp % 4
        const ans = cycle[exp % 4];
        text = `What is the remainder when ${base}^{${exp}} is divided by ${mod}?`;
        options = [`0`, `1`, `2`, `3`, `4`];
        correctAnswer = options.indexOf(`${ans}`);
        explanation = `Look for a pattern in the remainders of ${base}^n divided by ${mod}: 7^1=7 (rem 2), 7^2=49 (rem 4), 7^3=343 (rem 3), 7^4=2401 (rem 1). The pattern 2, 4, 3, 1 repeats every 4 powers. Since ${exp} divided by 4 has a remainder of ${exp % 4}, the remainder is ${ans}.`;
        break;
      }
      case 51: {
        category = 'Algebra'; subCategory = 'Radicals';
        const prime = [2, 3, 5, 6, 7, 10][getRandomInt(0, 5)];
        const square = [4, 9, 16, 25, 36][getRandomInt(0, 4)];
        const val = prime * square;
        const rootSquare = Math.sqrt(square);
        text = `Simplify the radical expression: √${val}`;
        options = [`${rootSquare}√${prime}`, `${prime}√${rootSquare}`, `√${val}`, `${square}√${prime}`, `${rootSquare * prime}`];
        correctAnswer = 0;
        explanation = `Factor out the largest perfect square: √${val} = √(${square} × ${prime}) = √${square} × √${prime} = ${rootSquare}√${prime}.`;
        break;
      }
      case 52: {
        category = 'Algebra'; subCategory = 'Quadratic Formula';
        const a = 2;
        const b = -3;
        const c = -7;
        // 2x^2 - 3x - 7 = 0
        // x = (3 +/- sqrt(9 - 4(2)(-7))) / 4 = (3 +/- sqrt(9 + 56)) / 4 = (3 +/- sqrt(65)) / 4
        text = `What are the solutions for x in the equation ${a}x² ${b}x ${c} = 0?`;
        options = [
          `(3 ± √65) / 4`,
          `(3 ± √47) / 4`,
          `(-3 ± √65) / 4`,
          `(3 ± √55) / 4`,
          `(-3 ± √47) / 4`
        ];
        correctAnswer = 0;
        explanation = `Use the quadratic formula x = [-b ± √(b² - 4ac)] / 2a. Here a=${a}, b=${b}, c=${c}. x = [3 ± √((-3)² - 4(2)(-7))] / (2*2) = [3 ± √(9 + 56)] / 4 = (3 ± √65) / 4.`;
        break;
      }
      case 53: {
        category = 'Algebra'; subCategory = 'Domain';
        const a = [2, 3, 4, 5][getRandomInt(0, 3)];
        const b = [4, 9, 16, 25][getRandomInt(0, 3)];
        text = `What is the domain of the function f(x) = 1 / (x² - ${b})?`;
        const root = Math.sqrt(b);
        options = [
          `All real numbers`,
          `x > ${root}`,
          `x ≠ ${root} and x ≠ -${root}`,
          `x ≥ 0`,
          `x ≠ ${b}`
        ];
        correctAnswer = 2;
        explanation = `The domain of a rational function excludes values that make the denominator zero. x² - ${b} = 0 when x = ${root} or x = -${root}. So the domain is all real numbers except x = ±${root}.`;
        break;
      }
      case 54: {
        category = 'Algebra'; subCategory = 'Piecewise Functions';
        const val1 = getRandomInt(-6, -2);
        const val2 = getRandomInt(2, 6);
        text = `If f(x) = { x² for x < 0; 2x + 1 for x ≥ 0 }, what is the value of f(${val1}) + f(${val2})?`;
        const ans1 = val1 * val1;
        const ans2 = 2 * val2 + 1;
        const total = ans1 + ans2;
        options = [`${total - 5}`, `${total - 2}`, `${total}`, `${total + 2}`, `${total + 5}`];
        correctAnswer = 2;
        explanation = `For f(${val1}), since ${val1} < 0, use x²: (${val1})² = ${ans1}. For f(${val2}), since ${val2} ≥ 0, use 2x + 1: 2(${val2}) + 1 = ${ans2}. Total = ${ans1} + ${ans2} = ${total}.`;
        break;
      }
      case 55: {
        category = 'Geometry'; subCategory = 'Composite Area';
        const w = 12;
        const h = 8;
        const r = h / 2;
        const rectArea = w * h;
        const semiArea = (0.5 * Math.PI * r * r).toFixed(1);
        text = `A rectangle is ${w} units long and ${h} units wide. A semicircle with a diameter of ${h} is removed from one of the shorter sides. What is the approximate area of the remaining shape?`;
        const ans = (rectArea - parseFloat(semiArea)).toFixed(1);
        options = [`${rectArea}`, `${ans}`, `${(rectArea - parseFloat(semiArea) * 2).toFixed(1)}`, `${(rectArea + parseFloat(semiArea)).toFixed(1)}`, `${(w * h / 2).toFixed(1)}`];
        correctAnswer = 1;
        explanation = `Area of rectangle = ${w} × ${h} = ${rectArea}. Area of semicircle = 1/2 × π × r² = 1/2 × π × 4² = 8π ≈ ${semiArea}. Remaining area = ${rectArea} - ${semiArea} ≈ ${ans}.`;
        break;
      }
      case 56: {
        category = 'Coordinate Geometry'; subCategory = 'Area';
        const x1 = 1, y1 = 1;
        const x2 = 5, y2 = 1;
        const x3 = 3, y3 = 6;
        const base = x2 - x1;
        const height = y3 - y1;
        const area = 0.5 * base * height;
        text = `What is the area of a triangle with vertices at (1, 1), (5, 1), and (3, 6)?`;
        options = [`${area - 2}`, `${area - 1}`, `${area}`, `${area + 1}`, `${area + 2}`];
        correctAnswer = 2;
        explanation = `The base is the horizontal distance between (1, 1) and (5, 1), which is 5 - 1 = 4. The height is the vertical distance from the base (y=1) to the top vertex (y=6), which is 6 - 1 = 5. Area = 1/2 × base × height = 1/2 × 4 × 5 = 10.`;
        break;
      }
      case 57: {
        category = 'Geometry'; subCategory = 'Surface Area';
        const r = 4;
        const h = 10;
        const lateral = 2 * Math.PI * r * h;
        const base = Math.PI * r * r;
        const total = 2 * base + lateral;
        // total = 32pi + 80pi = 112pi
        text = `What is the total surface area of a cylinder with a radius of ${r} and a height of ${h}?`;
        options = [`40π`, `80π`, `96π`, `112π`, `144π`];
        correctAnswer = 3;
        explanation = `Total Surface Area = 2πr² + 2πrh. Here, 2π(${r}²) + 2π(${r})(${h}) = 2π(16) + 2π(40) = 32π + 80π = 112π.`;
        break;
      }
      case 58: {
        category = 'Probability'; subCategory = 'Compound Probability';
        const red = 5;
        const blue = 3;
        const total = red + blue;
        // P(both red) = (5/8) * (4/7) = 20/56 = 5/14
        text = `A bag contains ${red} red marbles and ${blue} blue marbles. If two marbles are drawn at random without replacement, what is the probability that both marbles are red?`;
        options = [`25/64`, `5/14`, `5/8`, `1/2`, `20/64`];
        correctAnswer = 1;
        explanation = `Probability of first red = 5/8. After one red is removed, there are 4 red and 7 total marbles left. Probability of second red = 4/7. P(both red) = (5/8) × (4/7) = 20/56 = 5/14.`;
        break;
      }
      case 59: {
        category = 'Algebra'; subCategory = 'Sequences';
        const a1 = 7;
        const d = 4;
        const n = 20;
        const an = a1 + (n - 1) * d;
        text = `In an arithmetic sequence, the first term is ${a1} and the common difference is ${d}. What is the ${n}th term of the sequence?`;
        options = [`${an - 8}`, `${an - 4}`, `${an}`, `${an + 4}`, `${an + 8}`];
        correctAnswer = 2;
        explanation = `Use the formula a_n = a_1 + (n - 1)d. Here, a_20 = ${a1} + (20 - 1)(${d}) = ${a1} + 19(${d}) = ${a1} + 76 = ${an}.`;
        break;
      }
      case 60: {
        category = 'Arithmetic'; subCategory = 'Percent Change';
        const oldVal = 80;
        const newVal = 92;
        const diff = newVal - oldVal;
        const pct = (diff / oldVal) * 100;
        text = `A price increases from $${oldVal} to $${newVal}. What is the percent increase?`;
        options = [`12%`, `${pct - 5}%`, `${pct}%`, `${pct + 5}%`, `20%`];
        correctAnswer = 2;
        explanation = `Percent Increase = (Change / Original) × 100. Change = ${newVal} - ${oldVal} = ${diff}. Percent = (${diff} / ${oldVal}) × 100 = 0.15 × 100 = ${pct}%.`;
        break;
      }
      case 61: {
        category = 'Arithmetic'; subCategory = 'Unit Rates';
        const gal = 3.5;
        const cost = 14;
        const quarts = gal * 4;
        const perQuart = cost / quarts;
        text = `If ${gal} gallons of milk cost $${cost}, what is the cost per quart? (Note: 1 gallon = 4 quarts)`;
        options = [`$${perQuart - 0.25}`, `$${perQuart}`, `$${perQuart + 0.25}`, `$${cost / gal}`, `$${cost * 4 / gal}`];
        correctAnswer = 1;
        explanation = `First, convert gallons to quarts: ${gal} gallons × 4 = ${quarts} quarts. Then divide the total cost by the number of quarts: $${cost} / ${quarts} = $${perQuart}.`;
        break;
      }
      case 62: {
        category = 'Trigonometry'; subCategory = 'Applications';
        const dist = 50;
        const angle = 35;
        // tan(35) = h / 50 => h = 50 * tan(35)
        const h = Math.round(dist * Math.tan(angle * Math.PI / 180));
        text = `From a point ${dist} feet from the base of a building, the angle of elevation to the top of the building is ${angle}°. To the nearest foot, how tall is the building?`;
        options = [`${h - 5}`, `${h - 2}`, `${h}`, `${h + 2}`, `${h + 5}`];
        correctAnswer = 2;
        explanation = `Use the tangent ratio: tan(θ) = opposite / adjacent. tan(${angle}°) = height / ${dist}. height = ${dist} × tan(${angle}°) ≈ ${dist} × 0.7002 ≈ ${h} feet.`;
        break;
      }
    }
    
    // shuffle options
    const optionIndices = [0, 1, 2, 3, 4];
    for (let j = optionIndices.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [optionIndices[j], optionIndices[k]] = [optionIndices[k], optionIndices[j]];
    }
    
    const shuffledOptions = optionIndices.map(idx => options[idx]);
    const newCorrectAnswer = optionIndices.indexOf(correctAnswer);

    qs.push({
      id: i + 1,
      text,
      options: shuffledOptions,
      correctAnswer: newCorrectAnswer,
      explanation,
      diagram,
      category,
      subCategory
    });
  }
  
  return qs;
};
