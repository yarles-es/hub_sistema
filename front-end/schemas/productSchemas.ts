import z from "zod";

export const createProductSchema = z.object({
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  descricao: z.string().optional(),
  valorCusto: z.string().refine(
    (value) => {
      const parsedValue = parseFloat(value);
      return !isNaN(parsedValue) && parsedValue >= 0;
    },
    {
      message: "Valor de custo deve ser um número positivo",
    }
  ),
  valorVenda: z.string().refine(
    (value) => {
      const parsedValue = parseFloat(value);
      return !isNaN(parsedValue) && parsedValue >= 0;
    },
    {
      message: "Valor de venda deve ser um número positivo",
    }
  ),
  estoque: z.string().refine(
    (value) => {
      const parsedValue = parseInt(value, 10);
      return !isNaN(parsedValue) && parsedValue >= 0;
    },
    {
      message: "Estoque deve ser um número positivo",
    }
  ),
  ativo: z.boolean().optional(),
});

export const updateProductSchema = z.object({
  id: z.number(),
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  descricao: z.string().optional(),
  valorCusto: z.string().refine(
    (value) => {
      const parsedValue = parseFloat(value);
      return !isNaN(parsedValue) && parsedValue >= 0;
    },
    {
      message: "Valor de custo deve ser um número positivo",
    }
  ),
  valorVenda: z.string().refine(
    (value) => {
      const parsedValue = parseFloat(value);
      return !isNaN(parsedValue) && parsedValue >= 0;
    },
    {
      message: "Valor de venda deve ser um número positivo",
    }
  ),
  estoque: z.string().refine(
    (value) => {
      const parsedValue = parseInt(value, 10);
      return !isNaN(parsedValue) && parsedValue >= 0;
    },
    {
      message: "Estoque deve ser um número positivo",
    }
  ),
});
