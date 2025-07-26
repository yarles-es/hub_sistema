import { PagamentoAvulso, Prisma, PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import {
  CreatePagamentoAvulso,
  PagamentoAvulsoFilter,
  PagamentoAvulsoResponse,
  UpdatePagamentoAvulso,
} from '../types/pagamento-avulso.types';

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

  async getAll(
    pageNumber: number,
    limitNumber: number,
    filters?: PagamentoAvulsoFilter,
  ): Promise<PagamentoAvulsoResponse> {
    const where: Prisma.PagamentoAvulsoWhereInput = {};

    if (filters) {
      if (filters.initialDate) {
        where.dataHora = { gte: filters.initialDate };
      }
      if (filters.finalDate) {
        where.dataHora = { lte: filters.finalDate };
      }
      if (filters.nomeCliente) {
        where.nomeCliente = { contains: filters.nomeCliente, mode: 'insensitive' };
      }
      if (filters.observacao) {
        where.observacao = { contains: filters.observacao, mode: 'insensitive' };
      }
      if (filters.formaPagamento && filters.formaPagamento.length > 0) {
        where.formaPagamento = {
          in: filters.formaPagamento,
        };
      }
    }

    const [data, total] = await Promise.all([
      this.prisma.pagamentoAvulso.findMany({
        where,
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber,
        orderBy: {
          dataHora: 'desc',
        },
      }),
      this.prisma.pagamentoAvulso.count({ where }),
    ]);

    return {
      data,
      total,
      page: pageNumber,
      limit: limitNumber,
    };
  }
}
