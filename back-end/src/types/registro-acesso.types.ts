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

export type RegistroAcessoFilter = {
  initialDate?: Date;
  finalDate?: Date;
  clienteId?: number;
};

export type GetAllRegistroAcessoResponse = Prisma.RegistroAcessoGetPayload<{
  select: {
    id: true;
    tipoCatraca: true;
    clienteId: true;
    dataHora: true;
    cliente: { select: { nome: true } };
  };
}>[];
