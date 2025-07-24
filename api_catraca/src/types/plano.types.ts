import { Plano } from '@prisma/client';

export type CreatePlano = Omit<Plano, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdatePlano = Partial<Omit<Plano, 'id' | 'createdAt' | 'updatedAt'>>;
