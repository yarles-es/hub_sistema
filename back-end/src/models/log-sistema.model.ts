import { LogSistema, Prisma, PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { GetLog, GetLogResponseModel } from '../types/log-sistema.types';

@Service()
export class LogSistemaModel {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  public async createLog(
    usuarioId: number,
    acao: string,
    clienteId?: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<LogSistema> {
    const client = transaction || this.prisma;
    return await client.logSistema.create({
      data: {
        usuarioId,
        acao,
        clienteId,
      },
    });
  }

  public async getLogs(
    page: number,
    limit: number,
    filter?: GetLog,
    transaction?: Prisma.TransactionClient,
  ): Promise<GetLogResponseModel> {
    const client = transaction || this.prisma;
    const where: Prisma.LogSistemaWhereInput = {};

    const dataHora: Prisma.DateTimeFilter = {};

    if (filter?.initialDate) dataHora.gte = filter.initialDate;
    if (filter?.finalDate) dataHora.lte = filter.finalDate;

    if (Object.keys(dataHora).length > 0) {
      where.dataHora = dataHora;
    }

    if (filter?.usuarioId) {
      where.usuarioId = filter.usuarioId;
    }

    if (filter?.clienteId) {
      where.clienteId = filter.clienteId;
    }

    const [data, total] = await Promise.all([
      client.logSistema.findMany({
        where,
        include: {
          usuario: {
            select: {
              nome: true,
            },
          },
          cliente: {
            select: {
              nome: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          dataHora: 'desc',
        },
      }),
      client.logSistema.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
    };
  }
}
