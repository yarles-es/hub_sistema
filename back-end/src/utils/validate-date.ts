export const validateDate = (date: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
  return dateRegex.test(date);
};

export const validateDateGreaterThanToday = (date: Date): boolean => {
  const today = new Date();
  return date > today;
};
