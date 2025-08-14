import { Prisma, RegistroAcesso } from '@prisma/client';

export type CreateRegistroAcesso = Omit<RegistroAcesso, 'id' | 'createdAt' | 'updatedAt' | 'clienteId'> & {
  clienteId?: number;
};

type RegistroAcessoWithCliente = Prisma.RegistroAcessoGetPayload<{
  include: { cliente: { select: { nome: true } } };
}>;

export type FindAllForDayItem = Omit<RegistroAcessoWithCliente, 'cliente'> & {
  nomeCliente: string;
};
export type FindAllForDay = FindAllForDayItem[];
