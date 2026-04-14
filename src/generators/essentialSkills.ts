import { getRandomInt } from '../utils/mathUtils';

export const generateDataInterpretationMedium = () => {
  return {
    category: 'Integrating Essential Skills',
    subCategory: 'Data Interpretation',
    difficulty: 'medium' as const,
    text: `The table below shows the number of books read by students in a class:\n\nBooks: 1, 2, 3, 4, 5\nStudents: 4, 6, 5, 3, 2\n\nWhat is the mean number of books read per student?`,
    options: [`2.0`, `2.65`, `3.0`, `3.5`, `4.0`],
    correctAnswer: 1,
    explanation: `Total books = (1×4)+(2×6)+(3×5)+(4×3)+(5×2) = 4+12+15+12+10 = 53. Total students = 4+6+5+3+2 = 20. Mean = 53 / 20 = 2.65.`
  };
};

export const generateModelingYIntercept = () => {
  return {
    category: 'Integrating Essential Skills',
    subCategory: 'Modeling',
    difficulty: 'medium' as const,
    text: `A scatter plot shows the relationship between hours studied (x) and test score (y). The line of best fit is y = 5x + 60. What does the y-intercept of 60 represent?`,
    options: [
      `A student who studies 60 hours scores 0`,
      `The score increases by 60 for each hour studied`,
      `A student who studies 0 hours is predicted to score 60`,
      `The maximum possible score is 60`,
      `A student needs to study 60 hours to pass`
    ],
    correctAnswer: 2,
    explanation: `The y-intercept is the value of y when x = 0. Since x represents hours studied, the intercept represents the predicted score for 0 hours of study.`
  };
};

export const generateModelingLinearEquation = () => {
  const fee = 25;
  const rate = 0.10;
  const total = 43;
  const count = (total - fee) / rate;
  return {
    category: 'Integrating Essential Skills',
    subCategory: 'Modeling',
    difficulty: 'medium' as const,
    text: `A phone plan charges a flat fee of $${fee} per month plus $${rate.toFixed(2)} per text message. If Maria's bill was $${total} last month, how many text messages did she send?`,
    options: [`160`, `175`, `${count}`, `200`, `430`],
    correctAnswer: 2,
    explanation: `Set up the equation: ${fee} + ${rate.toFixed(2)}t = ${total}. Subtract ${fee}: ${rate.toFixed(2)}t = ${total - fee}. Divide by ${rate.toFixed(2)}: t = ${count}.`
  };
};

export const generateProportionalReasoningMap = () => {
  const scale = 35;
  const dist = 4.5;
  const actual = scale * dist;
  return {
    category: 'Integrating Essential Skills',
    subCategory: 'Proportional Reasoning',
    difficulty: 'medium' as const,
    text: `On a map, 1 inch represents ${scale} miles. If two cities are ${dist} inches apart on the map, what is the actual distance between them?`,
    options: [`140 miles`, `150 miles`, `155 miles`, `${actual} miles`, `175 miles`],
    correctAnswer: 3,
    explanation: `Use a proportion: 1 / ${scale} = ${dist} / x. Cross-multiplying gives x = ${dist} × ${scale} = ${actual} miles.`
  };
};

export const generateStatisticsMeanMedianComparison = () => {
  return {
    category: 'Integrating Essential Skills',
    subCategory: 'Statistics',
    difficulty: 'medium' as const,
    text: `A company reports the mean salary of its employees as $85,000 and the median salary as $52,000. Which of the following best explains why the mean is significantly higher than the median?`,
    options: [
      `The mean is always higher than the median`,
      `A few very high salaries are pulling the mean upward`,
      `Most employees earn more than $85,000`,
      `The median calculation excluded some employees`,
      `The company made an arithmetic error`
    ],
    correctAnswer: 1,
    explanation: `The mean is sensitive to outliers. A small number of very high earners (like executives) will pull the mean up significantly, while the median remains representative of the middle of the distribution.`
  };
};

export const generateDataInterpretationPieChart = () => {
  return {
    category: 'Integrating Essential Skills',
    subCategory: 'Data Interpretation',
    difficulty: 'medium' as const,
    text: `In a survey of 100 people, 40 preferred Brand A, 35 preferred Brand B, and the rest preferred Brand C. If a pie chart were made, what would be the measure of the central angle for Brand C?`,
    options: [`25°`, `40°`, `90°`, `100°`, `126°`],
    correctAnswer: 2,
    explanation: `Brand C preference = 100 - 40 - 35 = 25 people. This is 25% of the total. The central angle is 25% of 360°, which is 0.25 × 360° = 90°.`
  };
};

export const generateModelingSimpleInterest = () => {
  let principal, rate, time, interest;
  do {
    principal = [800, 1000, 1200, 1500, 2000][getRandomInt(0, 4)];
    rate = getRandomInt(3, 8);
    time = getRandomInt(2, 5);
    interest = (principal * rate * time) / 100;
  } while (
    interest === 50 || interest === 100 || interest === 200 ||
    interest === principal + interest
  );
  return {
    category: 'Integrating Essential Skills',
    subCategory: 'Modeling',
    difficulty: 'medium' as const,
    text: `A savings account earns ${rate}% simple interest annually. If $${principal} is deposited and no other transactions are made, how much interest will be earned after ${time} years?`,
    options: [
      `$${interest - 30}`,
      `$${interest + 50}`,
      `$${interest}`,
      `$${interest * 2}`,
      `$${Math.round(interest / 2)}`
    ],
    correctAnswer: 2,
    explanation: `Simple Interest = Principal × Rate × Time = ${principal} × ${rate / 100} × ${time} = $${interest}.`
  };
};

export const generateProportionalReasoningShadows = () => {
  return {
    category: 'Integrating Essential Skills',
    subCategory: 'Proportional Reasoning',
    difficulty: 'medium' as const,
    text: `A 6-foot tall man casts a 4-foot shadow. At the same time, a nearby flagpole casts an 18-foot shadow. How tall is the flagpole?`,
    options: [`12 feet`, `24 feet`, `27 feet`, `30 feet`, `36 feet`],
    correctAnswer: 2,
    explanation: `Use a proportion of height to shadow: 6 / 4 = x / 18. Cross-multiplying gives 4x = 108, so x = 108 / 4 = 27 feet.`
  };
};

export const generateModelingCorrelation = () => {
  return {
    category: 'Integrating Essential Skills',
    subCategory: 'Modeling',
    difficulty: 'medium' as const,
    text: `A scatter plot shows that as the number of hours a student studies increases, their test scores also increase. Which of the following best describes this relationship?`,
    options: [
      `No correlation`,
      `Negative correlation`,
      `Positive correlation`,
      `Inverse relationship`,
      `Exponential relationship`
    ],
    correctAnswer: 2,
    explanation: `When both variables increase together, the relationship is described as a positive correlation.`
  };
};

export const generateModelingStrongCorrelation = () => {
  return {
    category: 'Integrating Essential Skills',
    subCategory: 'Modeling',
    difficulty: 'medium' as const,
    text: `Which of the following scatter plot descriptions indicates the strongest negative correlation?`,
    options: [
      `Points scattered randomly with no pattern`,
      `Points loosely clustered around a line sloping downward`,
      `Points tightly clustered around a line sloping upward`,
      `Points tightly clustered around a line sloping downward`,
      `Points forming a perfect U-shape`
    ],
    correctAnswer: 3,
    explanation: `A negative correlation means the line slopes downward. "Strongest" means the points are most tightly clustered around that line.`
  };
};

export const generateModelingPrediction = () => {
  const x = 10;
  const y = -2 * x + 80;
  return {
    category: 'Integrating Essential Skills',
    subCategory: 'Modeling',
    difficulty: 'medium' as const,
    text: `The line of best fit for a scatter plot is y = -2x + 80, where x represents hours of TV watched and y represents test score. What is the predicted score for a student who watches ${x} hours of TV?`,
    options: [`70`, `80`, `${y}`, `50`, `100`],
    correctAnswer: 2,
    explanation: `Substitute x = ${x} into the equation: y = -2(${x}) + 80 = -20 + 80 = ${y}.`
  };
};

export const generateModelingSlopeInterpretation = () => {
  return {
    category: 'Integrating Essential Skills',
    subCategory: 'Modeling',
    difficulty: 'medium' as const,
    text: `In the equation y = -2x + 80, where x is hours of TV watched and y is test score, what does the slope of -2 represent?`,
    options: [
      `A student who watches 0 hours scores -2`,
      `For every additional hour of TV, the predicted score decreases by 2`,
      `The maximum score is 2`,
      `A student needs 2 hours of TV to pass`,
      `The score increases by 2 for each hour of TV`
    ],
    correctAnswer: 1,
    explanation: `The slope represents the rate of change. A slope of -2 means that for every 1 unit increase in x (hours of TV), the y-value (test score) decreases by 2 units.`
  };
};
