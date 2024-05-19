export const isValidDate = (date: Date): boolean => {
  return Number.isNaN(date.getTime()) === false;
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
