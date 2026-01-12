import { z } from "zod";

import { TypePlano, typePlanos } from "@/types/Plano";

const createPlanSchema = z.object({
  nome: z.string().min(3, "O nome do plano é obrigatório"),
  descricao: z.string().optional(),
  valor: z.string().refine(
    (value) => {
      const parsedValue = parseFloat(value);
      return !isNaN(parsedValue) && parsedValue >= 0;
    },
    {
      message: "Valor deve ser um número positivo",
    }
  ),
  tipo: z.nativeEnum(typePlanos, {
    errorMap: () => ({ message: "Tipo do plano é obrigatório" }),
  }),
});

const updatePlanSchema = createPlanSchema.extend({
  id: z.number().int().positive(),
});

export { createPlanSchema, updatePlanSchema };
