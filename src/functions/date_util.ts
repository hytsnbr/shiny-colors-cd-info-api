export const isValidDate = (date: Date) => {
  return Number.isNaN(date.getTime()) == false;
};

export const getIsDuplicate = (array1: string[], array2: string[]): boolean => {
  return [...array1, ...array2].filter((item) =>
    array1.includes(item) && array2.includes(item)
  ).length > 0;
};

export const formatDate = (date: Date | null): string => {
  if (date === null) {
    return "";
  }

  const yyyy = String(date.getFullYear());
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
};
