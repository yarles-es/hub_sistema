import { z } from "zod";

const dateRegex = /^(19|20)\d{2}-\d{2}-\d{2}$/;

export const validDate = z.string().refine(
  (val) => {
    return (
      dateRegex.test(val) &&
      !isNaN(Date.parse(val)) &&
      new Date(val).toISOString().slice(0, 10) === val
    );
  },
  {
    message: "Data inválida, a mesma deve representar uma data real.",
  }
);
