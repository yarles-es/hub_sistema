import { PagamentoAvulso, PrismaClient } from '@prisma/client';
import { Service } from 'typedi';

@Service()
export class PagamentoAvulsoModel {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: Omit<PagamentoAvulso, 'id'>): Promise<PagamentoAvulso> {
    return this.prisma.pagamentoAvulso.create({
      data,
    });
  }

  async findById(id: number): Promise<PagamentoAvulso | null> {
    return this.prisma.pagamentoAvulso.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Partial<PagamentoAvulso>): Promise<PagamentoAvulso> {
    return this.prisma.pagamentoAvulso.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<PagamentoAvulso> {
    return this.prisma.pagamentoAvulso.delete({
      where: { id },
    });
  }
}
