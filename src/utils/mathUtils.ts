export const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, Math.abs(a % b));

export const simplify = (num: number, den: number): string => {
  if (den === 0) return 'undefined';
  if (num === 0) return '0';
  const common = gcd(Math.abs(num), Math.abs(den));
  const n = num / common;
  const d = den / common;
  if (d === 1) return `${n}`;
  if (d < 0) return `${-n}/${-d}`;
  return `${n}/${d}`;
};
