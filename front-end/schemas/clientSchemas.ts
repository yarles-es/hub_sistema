import { z } from "zod";

const createClientSchema = z.object({
  nome: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome muito longo")
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, "Nome deve conter apenas letras"),
  email: z.string().email("Email inválido").max(100, "Email muito longo"),
  telefone: z.preprocess((val) => {
    if (typeof val === "string") {
      return val.replace(/\D/g, "");
    }
    return val;
  }, z.string().regex(/^\d{10,11}$/, "Telefone deve conter 10 ou 11 dígitos numéricos")),
  dataNascimento: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Data de nascimento deve estar no formato YYYY-MM-DD"
    ),
  planoId: z
    .number()
    .int("Plano deve ser um número inteiro")
    .min(1, "Plano é obrigatório"),
});

export { createClientSchema };
