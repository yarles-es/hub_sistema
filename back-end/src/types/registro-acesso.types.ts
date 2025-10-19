import { Prisma, RegistroAcesso } from '@prisma/client';

export type CreateRegistroAcesso = Omit<RegistroAcesso, 'id' | 'createdAt' | 'updatedAt' | 'clienteId'> & {
  clienteId?: number;
};

type RegistroAcessoWithCliente = Prisma.RegistroAcessoGetPayload<{
  include: { cliente: { select: { nome: true } } };
}>;

export type FindAllRegisters = Omit<RegistroAcessoWithCliente, 'cliente'> & {
  nomeCliente: string;
};

export type RegistroAcessoFilter = {
  initialDate?: Date;
  finalDate?: Date;
  clienteId?: number;
};
