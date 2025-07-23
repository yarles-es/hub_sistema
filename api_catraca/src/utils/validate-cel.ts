export const validateCel = (cel: string): boolean => {
  const regex = /^(?:\(?\d{2}\)?\s?)?(?:9\d{4}-?\d{4}|\d{4}-?\d{4})$/;
  return regex.test(cel);
};
