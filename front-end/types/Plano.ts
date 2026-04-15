export const typePlanos = {
  MENSAL: "MENSAL",
  SEMANAL: "SEMANAL",
  QUINZENAL: "QUINZENAL",
  SEMESTRAL: "SEMESTRAL",
  ANUAL: "ANUAL",
} as const;

export const MAX_DIAS_VALIDOS_SEMANA = 6;

export type TypePlano = (typeof typePlanos)[keyof typeof typePlanos];

export type Plano = {
  id: number;
  tipo: TypePlano | "";
  nome: string;
  createdAt: Date;
  updatedAt: Date;
  ativo: boolean;
  valor: number;
  descricao: string | null;
  validarDiasSemana: boolean;
  diasValidosSemana: number | null;
};

export type CreatePlano = Pick<
  Plano,
  "nome" | "descricao" | "tipo" | "validarDiasSemana" | "diasValidosSemana"
> & {
  valor: string;
};

export type UpdatePlano = {
  id: number;
  nome?: string;
  descricao?: string | null;
  valor?: string;
  tipo?: TypePlano | "";
  validarDiasSemana?: boolean;
  diasValidosSemana?: number | null;
};
