import { Prisma } from '@prisma/client';

export type GetLog = {
  clienteId?: number;
  usuarioId?: number;
  initialDate?: Date;
  finalDate?: Date;
};

export type GetLogResponseQuery = Prisma.LogSistemaGetPayload<{
  include: { cliente: { select: { nome: true } }; usuario: { select: { nome: true } } };
}>;

export type GetLogResponseModel = {
  data: GetLogResponseQuery[];
  total: number;
  page: number;
  limit: number;
};

export type GetLogResponse = {
  id: number;
  acao: string;
  dataHora: Date;
  usuarioId: number;
  nomeUsuario: string;
  clienteId?: number;
  nomeCliente?: string;
};

export type GetLogResponseWithPagination = {
  data: GetLogResponse[];
  total: number;
  page: number;
  limit: number;
};
