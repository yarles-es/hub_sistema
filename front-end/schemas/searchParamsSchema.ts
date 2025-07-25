import { z } from "zod";

import { LIMIT_WITH_PAGE, NUMBER_PAGE } from "./paginationSchemas";
import { validDate } from "./validateDateSchema";

export const searchParamsSchemaRelease = z
  .object({
    numberPage: z.number().int().positive().default(NUMBER_PAGE),
    limit: z.number().int().positive().default(LIMIT_WITH_PAGE),
    description: z.string().or(z.literal("")),
    documentNumber: z.string().or(z.literal("")),
    status: z.string().or(z.literal("")),
    emissionDateStart: validDate.or(z.literal("")),
    emissionDateEnd: validDate.or(z.literal("")),
    supplier: z.string().or(z.literal("")),
    total: z.string().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (data.emissionDateStart && data.emissionDateEnd) {
      const dateStart = new Date(data.emissionDateStart);
      const dateEnd = new Date(data.emissionDateEnd);
      if (dateStart > dateEnd) {
        ctx.addIssue({
          path: ["emissionDateStart"],
          message: "A data de início deve ser anterior à data final.",
          code: z.ZodIssueCode.custom,
        });
        ctx.addIssue({
          path: ["emissionDateEnd"],
          message: "A data final deve ser após a data de início.",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

export const searchParamensSchemasInstallment = z
  .object({
    numberPage: z.number().int().positive().default(NUMBER_PAGE),
    limit: z.number().int().positive().default(LIMIT_WITH_PAGE),
    description: z.string().or(z.literal("")),
    documentNumber: z.string().or(z.literal("")),
    status: z.string().or(z.literal("")),
    dueDateStart: validDate.or(z.literal("")),
    dueDateEnd: validDate.or(z.literal("")),
    paymentDateStart: validDate.or(z.literal("")),
    paymentDateEnd: validDate.or(z.literal("")),
    price: z.string().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (data.dueDateStart && data.dueDateEnd) {
      const dateStart = new Date(data.dueDateStart);
      const dateEnd = new Date(data.dueDateEnd);
      if (dateStart > dateEnd) {
        ctx.addIssue({
          path: ["dueDateStart"],
          message: "A data de início deve ser anterior à data final.",
          code: z.ZodIssueCode.custom,
        });
        ctx.addIssue({
          path: ["dueDateEnd"],
          message: "A data final deve ser após a data de início.",
          code: z.ZodIssueCode.custom,
        });
      }
    }
    if (data.paymentDateStart && data.paymentDateEnd) {
      const dateStart = new Date(data.paymentDateStart);
      const dateEnd = new Date(data.paymentDateEnd);
      if (dateStart > dateEnd) {
        ctx.addIssue({
          path: ["paymentDateStart"],
          message: "A data de início deve ser anterior à data final.",
          code: z.ZodIssueCode.custom,
        });
        ctx.addIssue({
          path: ["paymentDateEnd"],
          message: "A data final deve ser após a data de início.",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });
