import { PagamentoAvulso, PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { CreatePagamentoAvulso, UpdatePagamentoAvulso } from '../types/pagamento-avulso.types';

@Service()
export class PagamentoAvulsoModel {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: CreatePagamentoAvulso): Promise<PagamentoAvulso> {
    return this.prisma.pagamentoAvulso.create({
      data,
    });
  }

  async findById(id: number): Promise<PagamentoAvulso | null> {
    return this.prisma.pagamentoAvulso.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdatePagamentoAvulso): Promise<PagamentoAvulso> {
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
