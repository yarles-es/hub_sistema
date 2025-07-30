export type StatusClient = "ATIVO" | "DESATIVADO" | "VENCIDO";

export type Client = {
  id: number;
  email: string;
  nome: string;
  telefone: string;
  dataNascimento: Date;
  diaMensalidade: number;
  status: StatusClient;
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
  data: Client[];
  limit: number;
  page: number;
  total: number;
};

export type CreateClient = {
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  planoId: number;
};
