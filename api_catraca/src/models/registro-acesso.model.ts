import { LogSistema, PrismaClient } from '@prisma/client';
import { Service } from 'typedi';

@Service()
export class LogSistemaModel {
  constructor(private prisma: PrismaClient) {}

  public async createLog(usuarioId: number, acao: string, clienteId?: number): Promise<LogSistema> {
    return await this.prisma.logSistema.create({
      data: {
        usuarioId,
        acao,
        clienteId,
        dataHora: new Date(),
      },
    });
  }

  public async getLogs(): Promise<any[]> {
    return this.prisma.logSistema.findMany({
      include: {
        usuario: true,
        cliente: true,
      },
    });
  }
}
