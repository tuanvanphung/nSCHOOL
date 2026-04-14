import React from 'react';
import { Question } from './questions';

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateACTQuestions = (): Question[] => {
  const qs: Question[] = [];
  
  for (let i = 0; i < 100; i++) {
    const type = i % 20;
    let text = '';
    let options: string[] = [];
    let correctAnswer = 0;
    let explanation = '';
    let diagram: React.ReactNode = undefined;

    switch (type) {
      case 0: {
        // Linear Equation
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
        // Average
        const n1 = getRandomInt(10, 50);
        const n2 = getRandomInt(10, 50);
        const n3 = getRandomInt(10, 50);
        const n4 = getRandomInt(10, 50);
        const avg = (n1 + n2 + n3 + n4) / 4;
        text = `What is the average of the numbers ${n1}, ${n2}, ${n3}, and ${n4}?`;
        options = [`${avg - 5}`, `${avg - 2.5}`, `${avg}`, `${avg + 2.5}`, `${avg + 5}`];
        correctAnswer = 2;
        explanation = `The average is the sum divided by the count: (${n1} + ${n2} + ${n3} + ${n4}) / 4 = ${n1+n2+n3+n4} / 4 = ${avg}.`;
        break;
      }
      case 2: {
        // Probability
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
        // Matrix Addition
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
        // Trigonometry
        const opp = getRandomInt(3, 8);
        const adj = getRandomInt(4, 9);
        const hyp = Math.sqrt(opp*opp + adj*adj).toFixed(2);
        text = `In a right triangle, the side opposite angle θ is ${opp} and the adjacent side is ${adj}. What is the value of tan(θ)?`;
        options = [`${adj}/${opp}`, `${opp}/${hyp}`, `${adj}/${hyp}`, `${opp}/${adj}`, `${hyp}/${opp}`];
        correctAnswer = 3;
        explanation = `Tangent is opposite over adjacent (TOA). tan(θ) = ${opp}/${adj}.`;
        break;
      }
      case 5: {
        // Slope
        const x1 = getRandomInt(-5, 5);
        const y1 = getRandomInt(-5, 5);
        const x2 = x1 + getRandomInt(1, 5);
        const y2 = y1 + getRandomInt(1, 5);
        const slope = `${y2 - y1}/${x2 - x1}`;
        text = `What is the slope of the line passing through (${x1}, ${y1}) and (${x2}, ${y2})?`;
        options = [`${x2 - x1}/${y2 - y1}`, `-${y2 - y1}/${x2 - x1}`, `${slope}`, `-${x2 - x1}/${y2 - y1}`, `1`];
        correctAnswer = 2;
        explanation = `Slope = (y2 - y1) / (x2 - x1) = (${y2} - ${y1}) / (${x2} - ${x1}) = ${slope}.`;
        break;
      }
      case 6: {
        // Midpoint
        const x1 = getRandomInt(-10, 10);
        const y1 = getRandomInt(-10, 10);
        const x2 = getRandomInt(-10, 10);
        const y2 = getRandomInt(-10, 10);
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        text = `What is the midpoint of the line segment with endpoints (${x1}, ${y1}) and (${x2}, ${y2})?`;
        options = [`(${mx - 1}, ${my})`, `(${mx}, ${my - 1})`, `(${mx}, ${my})`, `(${mx + 1}, ${my})`, `(${mx}, ${my + 1})`];
        correctAnswer = 2;
        explanation = `Midpoint = ((x1 + x2)/2, (y1 + y2)/2) = ((${x1} + ${x2})/2, (${y1} + ${y2})/2) = (${mx}, ${my}).`;
        break;
      }
      case 7: {
        // Distance
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
        // Complex Numbers
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
        // Logarithms
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
        // System of Equations
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
        // Function Evaluation
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
        // Exponent Rules
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
        // Percentages
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
        // Area of Circle
        const r = getRandomInt(2, 10);
        const area = r * r;
        text = `What is the area of a circle with a radius of ${r}?`;
        options = [`${area / 2}π`, `${r * 2}π`, `${area}π`, `${area * 2}π`, `${area * 4}π`];
        correctAnswer = 2;
        explanation = `The area of a circle is πr². π(${r})² = ${area}π.`;
        break;
      }
      case 15: {
        // Pythagorean Theorem
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
        // Factoring Quadratics
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
        // Ratios
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
        // Absolute Value
        const ans = getRandomInt(3, 10);
        const val = getRandomInt(5, 15);
        text = `If |x - ${ans}| = ${val}, what is the positive value of x?`;
        options = [`${ans + val - 2}`, `${ans + val - 1}`, `${ans + val}`, `${ans + val + 1}`, `${ans + val + 2}`];
        correctAnswer = 2;
        explanation = `x - ${ans} = ${val} or x - ${ans} = -${val}. The positive solution is x = ${val} + ${ans} = ${ans + val}.`;
        break;
      }
      case 19: {
        // Scientific Notation
        const coeff = getRandomInt(2, 9);
        const exp = getRandomInt(3, 6);
        const val = coeff * Math.pow(10, exp);
        text = `How is the number ${val} written in scientific notation?`;
        options = [`${coeff} × 10^${exp - 1}`, `${coeff * 10} × 10^${exp - 1}`, `${coeff} × 10^${exp}`, `${coeff} × 10^${exp + 1}`, `${coeff / 10} × 10^${exp + 1}`];
        correctAnswer = 2;
        explanation = `Move the decimal point ${exp} places to the left to get ${coeff}. This gives ${coeff} × 10^${exp}.`;
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
      diagram
    });
  }
  
  return qs;
};
