export const ensureUniqueOptions = (options: string[], correctIdx: number): string[] => {
  const seen = new Set<string>();
  const result = [...options];
  seen.add(result[correctIdx]);
  
  for (let i = 0; i < result.length; i++) {
    if (i === correctIdx) continue;
    let attempt = 0;
    while (seen.has(result[i]) && attempt < 20) {
      attempt++;
      const num = parseFloat(result[i].replace(/[^0-9.\-]/g, ''));
      if (!isNaN(num) && result[i].match(/^-?\d+\.?\d*$/)) {
        // Pure numeric: offset deterministically
        result[i] = `${num + attempt * (i % 2 === 0 ? 1 : -1)}`;
      } else if (result[i].includes('/') && !result[i].includes(' ')) {
        // Fraction: adjust numerator (only if it's a simple fraction like "1/2")
        const parts = result[i].split('/');
        const firstPartNum = parseInt(parts[0]);
        if (!isNaN(firstPartNum)) {
          const newNum = firstPartNum + attempt;
          result[i] = `${newNum}/${parts[1]}`;
        } else {
          result[i] = result[i] + ` (${attempt})`;
        }
      } else {
        // For text options, append a distinguishing marker
        result[i] = result[i].replace(/\s+$/, '') + ` (${attempt})`;
      }
    }
    seen.add(result[i]);
  }
  return result;
};

export const shuffleOptions = (options: string[], correctAnswer: number) => {
  const optionIndices = [0, 1, 2, 3, 4];
  for (let j = optionIndices.length - 1; j > 0; j--) {
    const k = Math.floor(Math.random() * (j + 1));
    [optionIndices[j], optionIndices[k]] = [optionIndices[k], optionIndices[j]];
  }
  
  const shuffledOptions = optionIndices.map(idx => options[idx]);
  const newCorrectAnswer = optionIndices.indexOf(correctAnswer);
  
  return {
    shuffled: shuffledOptions,
    newCorrectIdx: newCorrectAnswer
  };
};
