import { Cliente, Mensalidade, Plano } from '@prisma/client';

export type CreateClienteRequest = Omit<
  Cliente,
  'id' | 'createdAt' | 'updatedAt' | 'dataNascimento' | 'diaMensalidade' | 'ativo' | 'catracaId'
> & {
  dataNascimento: string;
};

export type CreateCliente = Omit<
  Cliente,
  'id' | 'createdAt' | 'updatedAt' | 'diaMensalidade' | 'ativo' | 'catracaId'
>;

export type UpdateClientRequest = Partial<
  Omit<Cliente, 'id' | 'createdAt' | 'updatedAt' | 'dataNascimento'>
> & {
  dataNascimento?: string;
};

export type UpdateClient = Partial<Omit<Cliente, 'id' | 'createdAt' | 'updatedAt'>>;

export type StatusCliente = 'ATIVO' | 'DESATIVADO' | 'VENCIDO' | 'MENSALIDADE_AUSENTE';

export type ClienteFilter = {
  nome?: string;
  email?: string;
  telefone?: string;
  dataNascimento?: Date;
  diaMensalidade?: number;
  status?: StatusCliente;
  planoId?: number;
};

export type ClienteGetAll = Cliente & { status: StatusCliente; nomePlano: string; valorPlano: number };

export type ClienteGetAllWithMensalidade = Cliente & {
  Mensalidade: Mensalidade[];
  plano: Pick<Plano, 'id' | 'nome' | 'valor'>;
};

export type ClienteResponseGetAll = {
  data: ClienteGetAll[];
  total: number;
  page: number;
  limit: number;
};

export type ClientResponseGetAllModel = {
  data: ClienteGetAllWithMensalidade[];
  total: number;
  page: number;
  limit: number;
};
