export type StatusClient = "ATIVO" | "INATIVO";

export type Client = {
  id: number;
  email: string;
  nome: string;
  telefone: string;
  dataNascimento: Date;
  diaMensalidade: number;
  catracaId: number | null;
  planoId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type GetAllClient = {
  numberPage: number;
  limit: number;
  nome?: string;
  email?: string;
  telefone?: string;
  dataNascimento?: string;
  status?: StatusClient;
};

export type ClientResponseGetAll = {
  data: (Client & { status: StatusClient })[];
  limit: number;
  page: number;
  total: number;
};
