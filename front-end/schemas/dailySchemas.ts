import { z } from "zod";

import { PaymentType } from "@/types/Daily";

const createDailySchema = z.object({
  nomeCliente: z.string().optional(),
  valor: z.string().refine(
    (value) => {
      const parsedValue = parseFloat(value);
      return !isNaN(parsedValue) && parsedValue >= 0;
    },
    {
      message: "Valor deve ser um número positivo",
    }
  ),
  formaPagamento: z.nativeEnum(PaymentType, {
    message: "Forma de pagamento inválida",
  }),
  observacao: z.string().optional(),
});

const updateDailySchema = createDailySchema.extend({
  id: z.number().int().positive(),
});

export { createDailySchema, updateDailySchema };
