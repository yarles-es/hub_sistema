import { Cliente, Prisma, PrismaClient, StatusMensalidade } from '@prisma/client';
import { Service } from 'typedi';
import {
  ClienteFilter,
  ClienteGetAllWithMensalidade,
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

  public async create(cliente: CreateCliente, transaction?: Prisma.TransactionClient): Promise<Cliente> {
    const client = transaction || this.prisma;
    return client.cliente.create({
      data: { ...cliente },
    });
  }

  public async findById(id: number, transaction?: Prisma.TransactionClient): Promise<Cliente | null> {
    const client = transaction || this.prisma;
    return client.cliente.findUnique({
      where: { id },
    });
  }

  public async findByEmail(email: string, transaction?: Prisma.TransactionClient): Promise<Cliente | null> {
    const client = transaction || this.prisma;
    return client.cliente.findUnique({
      where: { email },
    });
  }

  public async update(
    id: number,
    data: UpdateClient,
    transaction?: Prisma.TransactionClient,
  ): Promise<Cliente> {
    const client = transaction || this.prisma;
    return client.cliente.update({
      where: { id },
      data: { ...data },
    });
  }

  public async delete(id: number, transaction?: Prisma.TransactionClient): Promise<Cliente> {
    const client = transaction || this.prisma;
    return client.cliente.delete({
      where: { id },
    });
  }

  public async findAllByName(
    name: string,
    transaction?: Prisma.TransactionClient,
  ): Promise<ClienteGetAllWithMensalidade[]> {
    const client = transaction || this.prisma;
    return client.cliente.findMany({
      where: { nome: { contains: name, mode: 'insensitive' } },
      orderBy: { id: 'desc' },
      include: {
        Mensalidade: true,
        plano: {
          select: {
            id: true,
            nome: true,
            valor: true,
          },
        },
      },
    });
  }

  public async findAll(
    page: number,
    limit: number,
    dates: { dataInicialMensalidade?: Date; dataFinalMensalidade?: Date },
    filter?: ClienteFilter,
    transaction?: Prisma.TransactionClient,
  ): Promise<ClientResponseGetAllModel> {
    const client = transaction || this.prisma;

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
      client.cliente.findMany({
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
          plano: {
            select: {
              id: true,
              nome: true,
              valor: true,
            },
          },
        },
      }),
      client.cliente.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async getAllWithMensalidadeByPlanId(
    planoId: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<ClienteGetAllWithMensalidade[]> {
    const client = transaction || this.prisma;
    return client.cliente.findMany({
      where: {
        planoId,
      },
      include: {
        Mensalidade: {
          where: {
            status: StatusMensalidade.PENDENTE,
          },
        },
        plano: {
          select: {
            id: true,
            nome: true,
            valor: true,
          },
        },
      },
      orderBy: { id: 'desc' },
    });
  }
}
