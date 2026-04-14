import { getRandomInt } from '../utils/mathUtils';

export const generateMeanEasy = () => {
  let n1, n2, n3, n4, sum;
  do {
    n1 = getRandomInt(10, 50);
    n2 = getRandomInt(10, 50);
    n3 = getRandomInt(10, 50);
    n4 = getRandomInt(10, 50);
    sum = n1 + n2 + n3 + n4;
  } while (sum % 4 !== 0);
  const avg = sum / 4;
  return {
    category: 'Statistics',
    subCategory: 'Mean',
    difficulty: 'easy' as const,
    text: `What is the average of the numbers ${n1}, ${n2}, ${n3}, and ${n4}?`,
    options: [
      `${avg + 5}`,
      `${avg - 3}`,
      `${avg}`,
      `${avg * 2}`,
      `${avg - 5}`
    ],
    correctAnswer: 2,
    explanation: `The average is the sum divided by the count: (${n1} + ${n2} + ${n3} + ${n4}) / 4 = ${sum} / 4 = ${avg}.`
  };
};

export const generatePermutationsMedium = () => {
  const n = getRandomInt(5, 8);
  const r = 3;
  let perm = 1;
  for (let j = 0; j < r; j++) perm *= (n - j);
  return {
    category: 'Statistics',
    subCategory: 'Permutations',
    difficulty: 'medium' as const,
    text: `How many ways can a president, vice president, and secretary be chosen from a club of ${n} members?`,
    options: [`${perm / 6}`, `${perm}`, `${perm * 2}`, `${n * 3}`, `${Math.pow(n, 3)}`],
    correctAnswer: 1,
    explanation: `This is a permutation of ${n} items taken ${r} at a time: ${n}P${r} = ${n} × ${n-1} × ${n-2} = ${perm}.`
  };
};

export const generateCombinationsMedium = () => {
  const n = getRandomInt(6, 10);
  const r = 3;
  let perm = 1;
  for (let j = 0; j < r; j++) perm *= (n - j);
  const comb = perm / 6;
  return {
    category: 'Statistics',
    subCategory: 'Combinations',
    difficulty: 'medium' as const,
    text: `How many ways can a committee of 3 people be chosen from a group of ${n} people?`,
    options: [`${perm}`, `${comb}`, `${comb * 2}`, `${n * 3}`, `${n + 3}`],
    correctAnswer: 1,
    explanation: `This is a combination of ${n} items taken ${r} at a time: ${n}C${r} = (${n} × ${n-1} × ${n-2}) / (3 × 2 × 1) = ${comb}.`
  };
};

export const generateMedianMedium = () => {
  const list = [getRandomInt(1, 10), getRandomInt(11, 20), getRandomInt(21, 30), getRandomInt(31, 40), getRandomInt(41, 50), getRandomInt(51, 60)];
  const sorted = [...list].sort((a, b) => a - b);
  const median = (sorted[2] + sorted[3]) / 2;
  return {
    category: 'Statistics',
    subCategory: 'Median',
    difficulty: 'medium' as const,
    text: `What is the median of the following data set: ${list.join(', ')}?`,
    options: [`${sorted[2]}`, `${sorted[3]}`, `${median}`, `${(sorted[0] + sorted[5])/2}`, `${sorted[4]}`],
    correctAnswer: 2,
    explanation: `Order the set: ${sorted.join(', ')}. The median is the average of the two middle numbers: (${sorted[2]} + ${sorted[3]}) / 2 = ${median}.`
  };
};

export const generateIQRMedium = () => {
  const list = [getRandomInt(1, 5), getRandomInt(6, 10), getRandomInt(11, 15), getRandomInt(16, 20), getRandomInt(21, 25), getRandomInt(26, 30), getRandomInt(31, 35)];
  const sorted = [...list].sort((a, b) => a - b);
  const q1 = sorted[1];
  const q3 = sorted[5];
  const iqr = q3 - q1;
  return {
    category: 'Statistics',
    subCategory: 'IQR',
    difficulty: 'medium' as const,
    text: `What is the interquartile range (IQR) of the following data set: ${list.join(', ')}?`,
    options: [`${iqr - 2}`, `${iqr}`, `${iqr + 2}`, `${q3}`, `${q1}`],
    correctAnswer: 1,
    explanation: `Order the set: ${sorted.join(', ')}. Q1 is the median of the lower half (${q1}), Q3 is the median of the upper half (${q3}). IQR = Q3 - Q1 = ${q3} - ${q1} = ${iqr}.`
  };
};

export const generateWeightedMeanMedium = () => {
  let w1, v1, w2, v2;
  do {
    w1 = getRandomInt(2, 5);
    v1 = getRandomInt(70, 80);
    w2 = getRandomInt(2, 5);
    v2 = getRandomInt(85, 95);
  } while (w1 === w2);
  const wMean = ((w1 * v1 + w2 * v2) / (w1 + w2)).toFixed(1);
  return {
    category: 'Statistics',
    subCategory: 'Weighted mean',
    difficulty: 'medium' as const,
    text: `A student has ${w1} test scores of ${v1} and ${w2} test scores of ${v2}. What is the student's overall average?`,
    options: [`${(v1 + v2) / 2}`, `${wMean}`, `${v1 + w1}`, `${v2 - w2}`, `${(parseFloat(wMean) + 2).toFixed(1)}`],
    correctAnswer: 1,
    explanation: `Weighted mean = (Sum of all scores) / (Total number of scores) = (${w1} × ${v1} + ${w2} × ${v2}) / (${w1} + ${w2}) = ${(w1*v1 + w2*v2)} / ${w1+w2} ≈ ${wMean}.`
  };
};

export const generateModeMedium = () => {
  const m = getRandomInt(3, 9);
  const list = [getRandomInt(2, 5), m, getRandomInt(2, 5), m, getRandomInt(6, 9), getRandomInt(2, 5), m, getRandomInt(6, 9)];
  return {
    category: 'Statistics',
    subCategory: 'Mode',
    difficulty: 'medium' as const,
    text: `What is the mode of the following data set: ${list.join(', ')}?`,
    options: [`${list[0]}`, `${list[4]}`, `${list[7]}`, `${list[2]}`, `${m}`],
    correctAnswer: 4,
    explanation: `The mode is the value that appears most frequently. In this set, ${m} appears most often.`
  };
};

export const generateBimodalMedium = () => {
  const m1 = getRandomInt(2, 5);
  const m2 = getRandomInt(6, 9);
  const list = [getRandomInt(1, 2), m1, m1, getRandomInt(5, 6), m2, m2, getRandomInt(10, 12)];
  return {
    category: 'Statistics',
    subCategory: 'Mode',
    difficulty: 'medium' as const,
    text: `What are the modes of the following data set: ${list.join(', ')}?`,
    options: [`${m1} only`, `${m2} only`, `${m1} and ${m2}`, `${list[3]}`, `No mode`],
    correctAnswer: 2,
    explanation: `Both ${m1} and ${m2} appear twice, which is more than any other value. Therefore, the data set is bimodal with modes ${m1} and ${m2}.`
  };
};

export const generateMeasuresOfCenterComparison = () => {
  return {
    category: 'Statistics',
    subCategory: 'Measures of Center',
    difficulty: 'medium' as const,
    text: `For the data set {2, 4, 4, 6, 8, 10}, which of the following is true?`,
    options: [
      `Mean < Median < Mode`,
      `Mode < Mean = Median`,
      `Mode = Mean = Median`,
      `Mode < Median < Mean`,
      `Mean > Median > Mode`
    ],
    correctAnswer: 3,
    explanation: `Mode = 4. Median = (4+6)/2 = 5. Mean = (2+4+4+6+8+10)/6 = 34/6 ≈ 5.67. Thus, Mode (4) < Median (5) < Mean (5.67).`
  };
};
