export type Plano = {
  id: number;
  nome: string;
  createdAt: Date;
  updatedAt: Date;
  ativo: boolean;
  valor: number;
  descricao: string | null;
};
