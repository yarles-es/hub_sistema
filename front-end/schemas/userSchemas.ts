import { z } from "zod";

const createUserSchema = z.object({
  nome: z.string().min(3, "O nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  administrador: z.boolean().optional(),
});

const updateUserSchema = z.object({
  id: z.number().min(1, "ID inválido"),
  nome: z.string().min(1, "O nome é obrigatório").optional(),
  email: z.string().email("E-mail inválido").optional(),
  senha: z.string().optional(),
  administrador: z.boolean().optional(),
});

const updatePasswordSchema = z
  .object({
    userId: z.number().min(1, "ID inválido"),
    currentPassword: z.string().min(6, "A senha atual é obrigatória"),
    newPassword: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "A confirmação de senha deve ter pelo menos 6 caracteres"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem",
  });

export { createUserSchema, updatePasswordSchema, updateUserSchema };
