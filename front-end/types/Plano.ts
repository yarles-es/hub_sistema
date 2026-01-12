export const typePlanos = {
  MENSAL: "MENSAL",
  SEMANAL: "SEMANAL",
  QUINZENAL: "QUINZENAL",
} as const;

export type TypePlano = keyof typeof typePlanos;

export type Plano = {
  id: number;
  tipo: TypePlano | "";
  nome: string;
  createdAt: Date;
  updatedAt: Date;
  ativo: boolean;
  valor: number;
  descricao: string | null;
};

export type CreatePlano = Pick<Plano, "nome" | "descricao" | "tipo"> & {
  valor: string;
};

export type UpdatePlano = {
  id: number;
  nome?: string;
  descricao?: string | null;
  valor?: string;
  tipo?: TypePlano | "";
};
