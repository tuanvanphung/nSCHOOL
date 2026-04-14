import { getRandomInt, simplify } from '../utils/mathUtils';

export const generateSimpleProbabilityMedium = () => {
  const red = getRandomInt(3, 10);
  const blue = getRandomInt(3, 10);
  const green = getRandomInt(3, 10);
  const total = red + blue + green;
  return {
    category: 'Probability',
    subCategory: 'Simple probability',
    difficulty: 'medium' as const,
    text: `A bag contains ${red} red marbles, ${blue} blue marbles, and ${green} green marbles. If one marble is drawn at random, what is the probability that it is blue?`,
    options: [`${blue}/${total + 2}`, `${blue - 1}/${total}`, `${blue}/${total}`, `${blue + 1}/${total}`, `${red}/${total}`],
    correctAnswer: 2,
    explanation: `The probability is the number of blue marbles divided by the total number of marbles: ${blue} / (${red} + ${blue} + ${green}) = ${blue}/${total}.`
  };
};

export const generateCompoundProbabilityHard = () => {
  const red = getRandomInt(4, 7);
  const blue = getRandomInt(2, 5);
  const total = red + blue;
  const num = red * (red - 1);
  const den = total * (total - 1);
  const simplified = simplify(num, den);
  return {
    category: 'Probability',
    subCategory: 'Compound Probability',
    difficulty: 'hard' as const,
    text: `A bag contains ${red} red marbles and ${blue} blue marbles. If two marbles are drawn at random without replacement, what is the probability that both marbles are red?`,
    options: [
      `${red * red}/${total * total}`,
      `${simplified}`,
      `${red}/${total}`,
      `1/2`,
      `${simplify(red * (red - 1), total * total)}`
    ],
    correctAnswer: 1,
    explanation: `P(1st red) = ${red}/${total}. After removing one red: P(2nd red) = ${red - 1}/${total - 1}. P(both) = (${red}/${total}) × (${red - 1}/${total - 1}) = ${num}/${den} = ${simplified}.`
  };
};
