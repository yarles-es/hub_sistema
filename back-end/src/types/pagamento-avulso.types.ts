import { FormPagamento, PagamentoAvulso } from '@prisma/client';

export type CreatePagamentoAvulso = Omit<PagamentoAvulso, 'id' | 'createdAt' | 'updatedAt' | 'dataHora'>;

export type UpdatePagamentoAvulso = Partial<CreatePagamentoAvulso>;

export type PagamentoAvulsoFilter = {
  nomeCliente?: string;
  observacao?: string;
  initialDate?: Date;
  finalDate?: Date;
  formaPagamento?: FormPagamento[];
};
export type PagamentoAvulsoResponse = {
  data: PagamentoAvulso[];
  total: number;
  page: number;
  limit: number;
};
