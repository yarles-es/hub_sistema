import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function withTransaction<T>(callback: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
  return prisma.$transaction(async (tx) => {
    try {
      const result = await callback(tx);
      return result;
    } catch (error) {
      console.error('[Transação Prisma] Erro:', error);
      throw error;
    }
  });
}
