import { RegistroAcesso } from '@prisma/client';

export type CreateRegistroAcesso = Omit<RegistroAcesso, 'id' | 'createdAt' | 'updatedAt'>;
