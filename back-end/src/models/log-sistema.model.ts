import { LogSistema, Prisma, PrismaClient } from '@prisma/client';
import { Service } from 'typedi';

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

  public async getLogs(transaction?: Prisma.TransactionClient): Promise<LogSistema[]> {
    const client = transaction || this.prisma;
    return client.logSistema.findMany({
      include: {
        usuario: true,
        cliente: true,
      },
    });
  }
}
