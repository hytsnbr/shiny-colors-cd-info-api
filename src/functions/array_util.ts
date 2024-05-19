export const hasDuplicateValue = (
  array1: string[],
  array2: string[],
): boolean => {
  return [...array1, ...array2].filter((item) =>
    array1.includes(item) && array2.includes(item)
  ).length > 0;
};
