export type GetLog = {
  numberPage: number;
  limit: number;
  clienteId?: number;
  userId?: number;
  initialDate?: string;
  finalDate?: string;
};

export type Log = {
  id: number;
  acao: string;
  dataHora: Date;
  usuarioId: number;
  nomeUsuario: string;
  clienteId?: number;
  nomeCliente?: string;
};

export type GetLogResponseWithPagination = {
  data: Log[];
  total: number;
  page: number;
  limit: number;
};
