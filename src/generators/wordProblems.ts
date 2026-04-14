import { getRandomInt, simplify } from '../utils/mathUtils';

export const generateRatesMedium = () => {
  const rate = getRandomInt(40, 70);
  const time = getRandomInt(2, 5);
  const dist = rate * time;
  return {
    category: 'Word Problems',
    subCategory: 'Rates',
    difficulty: 'medium' as const,
    text: `A car travels at a constant speed of ${rate} miles per hour. How long will it take to travel ${dist} miles?`,
    options: [`${time - 1} hours`, `${time - 0.5} hours`, `${time} hours`, `${time + 0.5} hours`, `${time + 1} hours`],
    correctAnswer: 2,
    explanation: `Time = Distance / Rate = ${dist} / ${rate} = ${time} hours.`
  };
};

export const generateWorkMedium = () => {
  const t1 = getRandomInt(2, 4);
  const t2 = getRandomInt(5, 8);
  const combined = (t1 * t2) / (t1 + t2);
  return {
    category: 'Word Problems',
    subCategory: 'Work',
    difficulty: 'medium' as const,
    text: `Machine A can complete a job in ${t1} hours. Machine B can complete the same job in ${t2} hours. Working together, how many hours will it take them to complete the job?`,
    options: [`${(t1 + t2) / 2}`, `${t1 + t2}`, `${combined.toFixed(2)}`, `${(t2 - t1).toFixed(2)}`, `${(t1 * t2).toFixed(2)}`],
    correctAnswer: 2,
    explanation: `Rate A = 1/${t1}, Rate B = 1/${t2}. Combined rate = 1/${t1} + 1/${t2} = ${(t1+t2)}/${t1*t2}. Time = 1 / Combined rate = ${t1*t2}/${t1+t2} ≈ ${combined.toFixed(2)} hours.`
  };
};

export const generateMixturesHard = () => {
  const vol1 = getRandomInt(10, 30);
  const pct1 = getRandomInt(10, 20);
  const vol2 = getRandomInt(10, 30);
  const pct2 = getRandomInt(30, 50);
  const finalPct = ((vol1 * pct1 + vol2 * pct2) / (vol1 + vol2)).toFixed(1);
  return {
    category: 'Word Problems',
    subCategory: 'Mixtures',
    difficulty: 'hard' as const,
    text: `If ${vol1} liters of a ${pct1}% acid solution are mixed with ${vol2} liters of a ${pct2}% acid solution, what is the concentration of the resulting mixture?`,
    options: [`${(pct1 + pct2)/2}%`, `${pct1 + pct2}%`, `${finalPct}%`, `${Math.abs(pct1 - pct2)}%`, `${(parseFloat(finalPct) + 5).toFixed(1)}%`],
    correctAnswer: 2,
    explanation: `Total acid = (${pct1/100} × ${vol1}) + (${pct2/100} × ${vol2}) = ${vol1*pct1/100 + vol2*pct2/100}. Total volume = ${vol1 + vol2}. Concentration = (${vol1*pct1/100 + vol2*pct2/100} / ${vol1 + vol2}) × 100 ≈ ${finalPct}%.`
  };
};

export const generateUnitConversionEasy = () => {
  const feet = getRandomInt(10, 50);
  const inches = feet * 12;
  return {
    category: 'Word Problems',
    subCategory: 'Unit conversion',
    difficulty: 'easy' as const,
    text: `How many inches are in ${feet} feet?`,
    options: [`${inches - 12}`, `${inches}`, `${inches + 12}`, `${simplify(feet, 12)}`, `${feet * 3}`],
    correctAnswer: 1,
    explanation: `There are 12 inches in a foot. ${feet} × 12 = ${inches}.`
  };
};
