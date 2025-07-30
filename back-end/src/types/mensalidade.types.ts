import { Mensalidade } from '@prisma/client';

export type CreateMensalidade = Omit<
  Mensalidade,
  'id' | 'createdAt' | 'updatedAt' | 'status' | 'formaPagamento'
>;

export type UpdateMensalidade = Partial<Pick<Mensalidade, 'formaPagamento' | 'status' | 'valor'>>;
