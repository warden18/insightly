export const isConsistentlyIncreasing = (array: number[]) => {
  return array.every((value, index) => index === 0 || value >= array[index - 1] )
};

export const isTrendingDownwards = (array: number[]) => {
  return array.every((value, index) => index === 0 || value <= array[index - 1]);
};