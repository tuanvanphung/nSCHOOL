import React from 'react';

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  diagram?: React.ReactNode;
}

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateQuestions = (): Question[] => {
  const qs: Question[] = [];

  // 1. Ratios
  const r1 = getRandomInt(2, 5);
  const r2 = getRandomInt(3, 7);
  const mult = getRandomInt(3, 8);
  const flour = r1 * mult;
  const sugar = r2 * mult;
  qs.push({
    id: 1,
    text: `A recipe calls for ${r1} cups of flour for every ${r2} cups of sugar. If you use ${flour} cups of flour, how many cups of sugar do you need?`,
    options: [`${sugar - 2} cups`, `${sugar} cups`, `${sugar + 3} cups`, `${sugar * 2} cups`],
    correctAnswer: 1,
    explanation: `The ratio is ${r1}:${r2}. Since flour is ${flour} (${r1} * ${mult}), then sugar must be ${r2} * ${mult} = ${sugar}.`
  });

  // 2. Expressions
  const a = getRandomInt(2, 6);
  const b = getRandomInt(2, 8);
  const c = getRandomInt(1, 5);
  qs.push({
    id: 2,
    text: `Which expression is equivalent to ${a}(x + ${b}) - ${c}?`,
    options: [`${a}x + ${a * b - c}`, `${a}x + ${a * b}`, `${a}x + ${b - c}`, `${a}x + ${a * b + c}`],
    correctAnswer: 0,
    explanation: `${a}(x + ${b}) - ${c} = ${a}x + ${a * b} - ${c} = ${a}x + ${a * b - c}.`
  });

  // 3. Integers
  const i1 = getRandomInt(-10, -2);
  const i2 = getRandomInt(-10, -2);
  const i3 = getRandomInt(-10, -2);
  const ans3 = i1 + i2 - i3;
  qs.push({
    id: 3,
    text: `What is the value of ${i1} + (${i2}) - (${i3})?`,
    options: [`${ans3 - 5}`, `${ans3}`, `${ans3 + 5}`, `${ans3 * 2}`],
    correctAnswer: 1,
    explanation: `${i1} + (${i2}) - (${i3}) = ${i1} ${i2} + ${Math.abs(i3)} = ${ans3}.`
  });

  // 4. Circle Area
  const radius = getRandomInt(3, 10);
  const area = (3.14 * radius * radius).toFixed(2);
  qs.push({
    id: 4,
    text: `A circle has a radius of ${radius} cm. What is its approximate area? (Use π ≈ 3.14)`,
    options: [`${(2 * 3.14 * radius).toFixed(2)} cm²`, `${(3.14 * radius).toFixed(2)} cm²`, `${area} cm²`, `${(area as any * 2).toFixed(2)} cm²`],
    correctAnswer: 2,
    explanation: `Area = πr² = 3.14 * ${radius}² = 3.14 * ${radius * radius} = ${area}.`
  });

  // 5. Proportionality
  const k = (getRandomInt(15, 45) / 10).toFixed(1);
  qs.push({
    id: 5,
    text: `Identify the constant of proportionality in the equation y = ${k}x.`,
    options: ["y", "x", `${k}`, "0"],
    correctAnswer: 2,
    explanation: `In the form y = kx, k is the constant of proportionality. Here, k = ${k}.`
  });

  // 6. Percent Discount
  const orig = getRandomInt(4, 15) * 10;
  const disc = getRandomInt(1, 4) * 10;
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
  const sol7 = getRandomInt(2, 8);
  const coeff7 = getRandomInt(2, 5);
  const const7 = getRandomInt(2, 10);
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
  const x9 = getRandomInt(1, 4);
  const y9 = getRandomInt(-4, -1);
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
    explanation: `The point (${x9}, ${y9}) is ${x9} units right and ${Math.abs(y9)} units down.`
  });

  // 10. Surface Area Cube
  const side10 = getRandomInt(2, 6);
  const sa10 = 6 * side10 * side10;
  qs.push({
    id: 10,
    text: `Find the surface area of a cube with a side length of ${side10} inches.`,
    options: [`${side10 * side10} in²`, `${side10 ** 3} in²`, `${sa10} in²`, `${sa10 + 10} in²`],
    correctAnswer: 2,
    explanation: `Surface Area = 6 * s² = 6 * ${side10}² = 6 * ${side10 * side10} = ${sa10}.`
  });

  // 11. Probability NOT
  const red = getRandomInt(2, 5);
  const blue = getRandomInt(3, 6);
  const green = getRandomInt(1, 4);
  const total = red + blue + green;
  qs.push({
    id: 11,
    text: `A bag contains ${red} red marbles, ${blue} blue marbles, and ${green} green marbles. If you pick one marble at random, what is the probability it is NOT blue?`,
    options: [`${red}/${total}`, `${(red + green)}/${total}`, `${blue}/${total}`, `${green}/${total}`],
    correctAnswer: 1,
    explanation: `Total marbles = ${red} + ${blue} + ${green} = ${total}. Blue = ${blue}. Not blue = ${total} - ${blue} = ${red + green}. Probability = ${(red + green)}/${total}.`
  });

  // 12. Inequalities
  const n12 = getRandomInt(10, 30);
  qs.push({
    id: 12,
    text: `Which inequality represents 'a number n is at most ${n12}'?`,
    options: [`n > ${n12}`, `n < ${n12}`, `n ≥ ${n12}`, `n ≤ ${n12}`],
    correctAnswer: 3,
    explanation: "'At most' means less than or equal to (≤)."
  });

  // 13. Volume
  const l13 = getRandomInt(3, 8);
  const w13 = getRandomInt(2, 5);
  const h13 = getRandomInt(5, 12);
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
  const scale = getRandomInt(2, 6) * 10;
  const dist = (getRandomInt(2, 8) + 0.5);
  qs.push({
    id: 15,
    text: `A map has a scale of 1 inch = ${scale} miles. If two cities are ${dist} inches apart on the map, how far apart are they in reality?`,
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
  const x17 = getRandomInt(-5, 5);
  const a17 = getRandomInt(2, 6);
  const b17 = getRandomInt(1, 10);
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
  const list19 = [getRandomInt(1, 5), getRandomInt(6, 10), getRandomInt(11, 15), getRandomInt(16, 20), getRandomInt(21, 25)].sort((a, b) => a - b);
  qs.push({
    id: 19,
    text: `Find the median of the data set: ${[...list19].sort(() => Math.random() - 0.5).join(', ')}`,
    options: [`${list19[0]}`, `${list19[1]}`, `${list19[2]}`, `${list19[3]}`],
    correctAnswer: 2,
    explanation: `Ordered set: ${list19.join(', ')}. The middle number is ${list19[2]}.`
  });

  // 20. Triangle Area
  const b20 = getRandomInt(4, 12);
  const h20 = getRandomInt(4, 12);
  qs.push({
    id: 20,
    text: `A triangle has a base of ${b20} cm and a height of ${h20} cm. What is its area?`,
    options: [`${b20 + h20} cm²`, `${b20 * h20} cm²`, `${(b20 * h20) / 2} cm²`, `${b20 * h20 * 2} cm²`],
    correctAnswer: 2,
    explanation: `Area = (1/2) * base * height = (1/2) * ${b20} * ${h20} = ${(b20 * h20) / 2}.`
  });

  // 21. Simple Interest
  const principal = getRandomInt(1, 5) * 100;
  const rate = getRandomInt(2, 6);
  const time = getRandomInt(2, 5);
  const interest = (principal * rate * time) / 100;
  qs.push({
    id: 21,
    text: `You deposit $${principal} in an account earning ${rate}% simple interest annually. How much interest will you earn in ${time} years?`,
    options: [`$${interest}`, `$${interest + principal}`, `$${interest / time}`, `$${principal * rate}`],
    correctAnswer: 0,
    explanation: `Simple Interest = Principal × Rate × Time = ${principal} × 0.0${rate} × ${time} = ${interest}.`
  });

  // 22. Percent Increase/Decrease
  const oldVal = getRandomInt(4, 10) * 10;
  const newVal = oldVal + getRandomInt(1, 3) * 10;
  const pctInc = ((newVal - oldVal) / oldVal) * 100;
  qs.push({
    id: 22,
    text: `A store buys a jacket for $${oldVal} and sells it for $${newVal}. What is the percent markup?`,
    options: [`${pctInc}%`, `${pctInc + 10}%`, `${pctInc / 2}%`, `${oldVal}%`],
    correctAnswer: 0,
    explanation: `Markup = ${newVal} - ${oldVal} = ${newVal - oldVal}. Percent = (${newVal - oldVal} / ${oldVal}) × 100 = ${pctInc}%.`
  });

  // 23. Tax and Total Cost
  const meal = getRandomInt(20, 50);
  const tax = getRandomInt(5, 9);
  const totalCost = (meal * (1 + tax / 100)).toFixed(2);
  qs.push({
    id: 23,
    text: `Your meal costs $${meal}. If the sales tax is ${tax}%, what is the total cost of the meal?`,
    options: [`$${totalCost}`, `$${(meal + tax).toFixed(2)}`, `$${(meal * (tax / 100)).toFixed(2)}`, `$${(meal * 1.1).toFixed(2)}`],
    correctAnswer: 0,
    explanation: `Tax = ${meal} × 0.0${tax} = ${(meal * (tax / 100)).toFixed(2)}. Total = ${meal} + ${(meal * (tax / 100)).toFixed(2)} = ${totalCost}.`
  });

  // 24. Circumference
  const diam = getRandomInt(4, 12);
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
  const compAng = getRandomInt(20, 70);
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
  const flips = getRandomInt(40, 60);
  const heads = getRandomInt(20, 30);
  qs.push({
    id: 28,
    text: `A coin is flipped ${flips} times and lands on heads ${heads} times. What is the experimental probability of landing on heads?`,
    options: [`${heads}/${flips}`, `${flips - heads}/${flips}`, `1/2`, `${heads}/100`],
    correctAnswer: 0,
    explanation: `Experimental probability = (number of times event occurred) / (total trials) = ${heads}/${flips}.`
  });

  // 29. Mean
  const m1 = getRandomInt(2, 5);
  const m2 = getRandomInt(6, 9);
  const m3 = getRandomInt(10, 15);
  const m4 = getRandomInt(16, 20);
  const mean = (m1 + m2 + m3 + m4) / 4;
  qs.push({
    id: 29,
    text: `Find the mean of the data set: ${m1}, ${m2}, ${m3}, ${m4}`,
    options: [`${mean}`, `${mean + 1}`, `${mean - 1}`, `${m2}`],
    correctAnswer: 0,
    explanation: `Mean = (${m1} + ${m2} + ${m3} + ${m4}) / 4 = ${(m1 + m2 + m3 + m4)} / 4 = ${mean}.`
  });

  // 30. Factoring Expressions
  const f1 = getRandomInt(2, 5);
  const f2 = getRandomInt(2, 5);
  const f3 = getRandomInt(2, 5);
  const term1 = f1 * f2;
  const term2 = f1 * f3;
  qs.push({
    id: 30,
    text: `Factor the expression completely: ${term1}x + ${term2}`,
    options: [`${f1}(${f2}x + ${f3})`, `${f2}(${f1}x + ${f3})`, `${term1}(x + ${term2})`, `${f1}x(${f2} + ${f3})`],
    correctAnswer: 0,
    explanation: `The greatest common factor of ${term1}x and ${term2} is ${f1}. Factoring it out gives ${f1}(${f2}x + ${f3}).`
  });

  // 31. Two-step inequality word problem
  const costPer = getRandomInt(3, 8);
  const flatFee = getRandomInt(10, 20);
  const maxSpend = getRandomInt(40, 60);
  const maxItems = Math.floor((maxSpend - flatFee) / costPer);
  qs.push({
    id: 31,
    text: `An amusement park charges $${flatFee} for admission and $${costPer} per ride. If you have $${maxSpend} to spend, what is the maximum number of rides you can go on?`,
    options: [`${maxItems}`, `${maxItems + 1}`, `${maxItems - 1}`, `${Math.floor(maxSpend/costPer)}`],
    correctAnswer: 0,
    explanation: `Let r = rides. ${costPer}r + ${flatFee} ≤ ${maxSpend}. ${costPer}r ≤ ${maxSpend - flatFee}. r ≤ ${(maxSpend - flatFee) / costPer}. Max rides = ${maxItems}.`
  });

  // 32. Complex fraction unit rate
  const denDist = getRandomInt(2, 4);
  const denTime = getRandomInt(3, 6);
  qs.push({
    id: 32,
    text: `A snail crawls 1/${denDist} of a meter in 1/${denTime} of an hour. What is its speed in meters per hour?`,
    options: [`${denTime}/${denDist} m/hr`, `${denDist}/${denTime} m/hr`, `${denTime * denDist} m/hr`, `1/${denTime * denDist} m/hr`],
    correctAnswer: 0,
    explanation: `Speed = Distance / Time = (1/${denDist}) ÷ (1/${denTime}) = (1/${denDist}) × (${denTime}/1) = ${denTime}/${denDist}.`
  });

  // 33. Proportional Graph
  const unitY = getRandomInt(3, 8);
  qs.push({
    id: 33,
    text: `A graph shows a proportional relationship between hours worked (x) and total pay (y). The line passes through the point (1, ${unitY}). What does this point represent?`,
    options: [`The hourly pay rate is $${unitY}.`, `The total pay for ${unitY} hours is $1.`, `The worker earns $1 per hour.`, `The y-intercept is ${unitY}.`],
    correctAnswer: 0,
    explanation: `In a proportional graph, the point (1, r) represents the unit rate. Here, earning $${unitY} in 1 hour.`
  });

  // 34. Multiplying negative fractions
  const n1 = getRandomInt(1, 3);
  const d1 = getRandomInt(4, 5);
  const n2 = getRandomInt(1, 3);
  const d2 = getRandomInt(4, 5);
  qs.push({
    id: 34,
    text: `Multiply: (-${n1}/${d1}) × (${n2}/${d2})`,
    options: [`-${n1 * n2}/${d1 * d2}`, `${n1 * n2}/${d1 * d2}`, `-${n1 * d2}/${d1 * n2}`, `${n1 + n2}/${d1 + d2}`],
    correctAnswer: 0,
    explanation: `Negative × Positive = Negative. Multiply numerators: ${n1} × ${n2} = ${n1 * n2}. Multiply denominators: ${d1} × ${d2} = ${d1 * d2}. Result: -${n1 * n2}/${d1 * d2}.`
  });

  // 35. Distance on coordinate plane
  const px = getRandomInt(-8, -2);
  const py = getRandomInt(1, 5);
  const qx = getRandomInt(2, 8);
  qs.push({
    id: 35,
    text: `What is the distance between the points (${px}, ${py}) and (${qx}, ${py}) on a coordinate plane?`,
    options: [`${qx - px} units`, `${Math.abs(px)} units`, `${qx} units`, `${qx + px} units`],
    correctAnswer: 0,
    explanation: `Since the y-coordinates are the same, the distance is the absolute difference of the x-coordinates: |${qx} - (${px})| = ${qx - px}.`
  });

  // 36. Area of composite figure
  const rectL = getRandomInt(5, 10);
  const rectW = getRandomInt(4, 8);
  const triH = getRandomInt(3, 6);
  const compArea = (rectL * rectW) + (0.5 * rectL * triH);
  qs.push({
    id: 36,
    text: `A composite figure consists of a rectangle with length ${rectL} and width ${rectW}, and a triangle on top with base ${rectL} and height ${triH}. What is the total area?`,
    options: [`${compArea}`, `${rectL * rectW + rectL * triH}`, `${rectL * rectW}`, `${0.5 * rectL * triH}`],
    correctAnswer: 0,
    explanation: `Rectangle Area = ${rectL} × ${rectW} = ${rectL * rectW}. Triangle Area = 1/2 × ${rectL} × ${triH} = ${0.5 * rectL * triH}. Total = ${rectL * rectW} + ${0.5 * rectL * triH} = ${compArea}.`
  });

  // 37. Scale factor effect on area
  const sf = getRandomInt(2, 4);
  qs.push({
    id: 37,
    text: `If the dimensions of a rectangle are multiplied by a scale factor of ${sf}, how many times larger will the new area be?`,
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
  const totalPizzas = getRandomInt(3, 6);
  const sliceFrac = getRandomInt(4, 8);
  qs.push({
    id: 40,
    text: `You have ${totalPizzas} pizzas. If each serving is 1/${sliceFrac} of a pizza, how many servings do you have?`,
    options: [`${totalPizzas * sliceFrac}`, `${totalPizzas / sliceFrac}`, `${sliceFrac / totalPizzas}`, `${totalPizzas + sliceFrac}`],
    correctAnswer: 0,
    explanation: `${totalPizzas} ÷ (1/${sliceFrac}) = ${totalPizzas} × ${sliceFrac} = ${totalPizzas * sliceFrac}.`
  });

  return qs;
};
