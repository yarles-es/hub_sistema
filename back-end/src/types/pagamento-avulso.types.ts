import { PagamentoAvulso } from '@prisma/client';

export type CreatePagamentoAvulso = Omit<PagamentoAvulso, 'id' | 'createdAt' | 'updatedAt' | 'dataHora'>;

export type UpdatePagamentoAvulso = Partial<CreatePagamentoAvulso>;
