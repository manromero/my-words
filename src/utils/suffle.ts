export const suffleArray = <T>(array: T[]): T[] => {
  return array.sort((_a, _b) => 0.5 - Math.random());
};
