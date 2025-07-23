import { LogSistema, PrismaClient } from '@prisma/client';
import { Service } from 'typedi';

@Service()
export class LogSistemaModel {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  public async createLog(usuarioId: number, acao: string, clienteId?: number): Promise<LogSistema> {
    return await this.prisma.logSistema.create({
      data: {
        usuarioId,
        acao,
        clienteId,
      },
    });
  }

  public async getLogs(): Promise<LogSistema[]> {
    return this.prisma.logSistema.findMany({
      include: {
        usuario: true,
        cliente: true,
      },
    });
  }
}
