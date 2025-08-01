import { Cliente, PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import {
  ClienteFilter,
  ClientResponseGetAllModel,
  CreateCliente,
  UpdateClient,
} from '../types/cliente.types';

@Service()
export class ClienteModel {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(cliente: CreateCliente): Promise<Cliente> {
    return this.prisma.cliente.create({
      data: { ...cliente },
    });
  }

  public async findById(id: number): Promise<Cliente | null> {
    return this.prisma.cliente.findUnique({
      where: { id },
    });
  }

  public async findByEmail(email: string): Promise<Cliente | null> {
    return this.prisma.cliente.findUnique({
      where: { email },
    });
  }

  public async update(id: number, data: UpdateClient): Promise<Cliente> {
    return this.prisma.cliente.update({
      where: { id },
      data: { ...data },
    });
  }

  public async delete(id: number): Promise<Cliente> {
    return this.prisma.cliente.delete({
      where: { id },
    });
  }

  public async findAll(
    page: number,
    limit: number,
    dates: { dataInicialMensalidade?: Date; dataFinalMensalidade?: Date },
    filter?: ClienteFilter,
  ): Promise<ClientResponseGetAllModel> {
    const where: any = {};

    if (filter?.nome) {
      where.nome = { contains: filter.nome, mode: 'insensitive' };
    }
    if (filter?.email) {
      where.email = { contains: filter.email, mode: 'insensitive' };
    }

    if (filter?.telefone) {
      where.telefone = { contains: filter.telefone, mode: 'insensitive' };
    }

    if (filter?.dataNascimento) {
      const inputDate = new Date(filter.dataNascimento);

      const start = new Date(inputDate);
      start.setUTCHours(0, 0, 0, 0);

      const end = new Date(inputDate);
      end.setUTCHours(23, 59, 59, 999);

      where.dataNascimento = {
        gte: start,
        lte: end,
      };
    }

    if (filter?.planoId) {
      where.planoId = filter.planoId;
    }

    if (dates.dataInicialMensalidade || dates.dataFinalMensalidade) {
      where.Mensalidade = {
        some: {
          vencimento: {
            ...(dates.dataInicialMensalidade && { gte: dates.dataInicialMensalidade }),
            ...(dates.dataFinalMensalidade && { lte: dates.dataFinalMensalidade }),
          },
        },
      };
    }

    const [data, total] = await Promise.all([
      this.prisma.cliente.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: 'desc' },
        include: {
          Mensalidade: {
            where: {
              ...(dates.dataInicialMensalidade && { vencimento: { gte: dates.dataInicialMensalidade } }),
              ...(dates.dataFinalMensalidade && { vencimento: { lte: dates.dataFinalMensalidade } }),
            },
            orderBy: { vencimento: 'asc' },
          },
        },
      }),
      this.prisma.cliente.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
    };
  }
}
