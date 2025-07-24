import { Usuario } from '@prisma/client';

export type CreateUsuario = Omit<Usuario, 'id' | 'createdAt' | 'updatedAt' | 'ativo' | 'administrador'>;

export type UpdateUsuario = Partial<Omit<Usuario, 'id' | 'createdAt' | 'updatedAt'>>;

export type UsuarioResponse = Omit<Usuario, 'senha'>;
