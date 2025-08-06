export type Plano = {
  id: number;
  nome: string;
  createdAt: Date;
  updatedAt: Date;
  ativo: boolean;
  valor: number;
  descricao: string | null;
};

export type CreatePlano = Pick<Plano, "nome" | "descricao"> & { valor: string };

export type UpdatePlano = {
  id: number;
  nome?: string;
  descricao?: string | null;
  valor?: string;
};
