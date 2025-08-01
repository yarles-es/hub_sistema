import { Cliente, FormPagamento, Mensalidade, StatusMensalidade } from '@prisma/client';

export type CreateMensalidade = Pick<Mensalidade, 'clienteId' | 'valor' | 'vencimento'>;

export type UpdateMensalidade = Partial<Pick<Mensalidade, 'formaPagamento' | 'status' | 'valor'>>;

export type MensalidadeFilter = {
  initialDate?: Date;
  finalDate?: Date;
  status?: StatusMensalidade[];
  clienteId?: number;
  formaPagamento?: FormPagamento[];
};

export type MensalidadeResponseGetAll = {
  data: (Mensalidade & { cliente: Pick<Cliente, 'nome' | 'email'> })[];
  total: number;
  page: number;
  limit: number;
};
