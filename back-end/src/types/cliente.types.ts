import { Cliente } from '@prisma/client';

export type CreateClienteRequest = Omit<
  Cliente,
  'id' | 'createdAt' | 'updatedAt' | 'dataNascimento' | 'diaMensalidade'
> & {
  dataNascimento: string;
};

export type CreateCliente = Omit<Cliente, 'id' | 'createdAt' | 'updatedAt' | 'diaMensalidade'>;

export type UpdateClientRequest = Partial<
  Omit<Cliente, 'id' | 'createdAt' | 'updatedAt' | 'dataNascimento'>
> & {
  dataNascimento?: string;
};

export type UpdateClient = Partial<Omit<Cliente, 'id' | 'createdAt' | 'updatedAt'>>;
