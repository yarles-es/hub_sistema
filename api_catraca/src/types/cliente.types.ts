import { Cliente } from '@prisma/client';

export type CreateClienteRequest = Omit<Cliente, 'id' | 'createdAt' | 'updatedAt' | 'dataNascimento'> & {
  dataNascimento: string;
};

export type CreateCliente = Omit<Cliente, 'id' | 'createdAt' | 'updatedAt'>;
