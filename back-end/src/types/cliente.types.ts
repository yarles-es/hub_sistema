import { Cliente, Mensalidade } from '@prisma/client';

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

export type StatusCliente = 'ATIVO' | 'DESATIVADO' | 'VENCIDO';

export type ClienteFilter = {
  nome?: string;
  email?: string;
  telefone?: string;
  dataNascimento?: Date;
  diaMensalidade?: number;
  status?: StatusCliente;
  planoId?: number;
};

export type ClienteResponseGetAll = {
  data: (Cliente & { status: StatusCliente })[];
  total: number;
  page: number;
  limit: number;
};

export type ClientResponseGetAllModel = {
  data: (Cliente & {
    Mensalidade: Mensalidade[];
  })[];
  total: number;
  page: number;
  limit: number;
};
