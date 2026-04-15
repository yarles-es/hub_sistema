import { z } from "zod";

import { MAX_DIAS_VALIDOS_SEMANA, typePlanos } from "@/types/Plano";

const diasValidosSemanaSchema = z.number({
  invalid_type_error: "diasValidosSemana deve ser um número inteiro maior que zero",
});

const basePlanSchema = z.object({
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
  validarDiasSemana: z.boolean().optional(),
  diasValidosSemana: diasValidosSemanaSchema
    .int("diasValidosSemana deve ser um número inteiro maior que zero")
    .positive("diasValidosSemana deve ser um número inteiro maior que zero")
    .max(
      MAX_DIAS_VALIDOS_SEMANA,
      `diasValidosSemana não pode ser maior que ${MAX_DIAS_VALIDOS_SEMANA} em uma semana`
    )
    .nullable()
    .optional(),
});

const validateWeeklyDays = (
  data: z.infer<typeof basePlanSchema>,
  ctx: z.RefinementCtx
) => {
  if (!data.validarDiasSemana) {
    return;
  }

  if (data.diasValidosSemana === null || data.diasValidosSemana === undefined) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["diasValidosSemana"],
      message:
        "diasValidosSemana é obrigatório quando validarDiasSemana estiver ativo",
    });
  }
};

const createPlanSchema = basePlanSchema.superRefine(validateWeeklyDays);

const updatePlanSchema = basePlanSchema.extend({
  id: z.number().int().positive(),
}).superRefine(validateWeeklyDays);

export { createPlanSchema, updatePlanSchema };
