import { Plano, Prisma, PrismaClient } from '@prisma/client';
import { Service } from 'typedi';

@Service()
export class PlanoModel {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(
    data: Omit<Plano, 'id' | 'createdAt' | 'updatedAt'>,
    transaction?: Prisma.TransactionClient,
  ): Promise<Plano> {
    const client = transaction || this.prisma;
    return client.plano.create({
      data,
    });
  }

  async findById(id: number, transaction?: Prisma.TransactionClient): Promise<Plano | null> {
    const client = transaction || this.prisma;
    return client.plano.findUnique({
      where: { id },
    });
  }

  async findByName(nome: string, transaction?: Prisma.TransactionClient): Promise<Plano | null> {
    const client = transaction || this.prisma;
    return client.plano.findFirst({
      where: { nome: nome.trim().toUpperCase() },
    });
  }

  async update(id: number, data: Partial<Plano>, transaction?: Prisma.TransactionClient): Promise<Plano> {
    const client = transaction || this.prisma;
    return client.plano.update({
      where: { id },
      data,
    });
  }

  async delete(id: number, transaction?: Prisma.TransactionClient): Promise<Plano> {
    const client = transaction || this.prisma;
    return client.plano.delete({
      where: { id },
    });
  }

  async findAll(transaction?: Prisma.TransactionClient): Promise<Plano[]> {
    const client = transaction || this.prisma;
    return client.plano.findMany({
      orderBy: { id: 'desc' },
    });
  }
}
