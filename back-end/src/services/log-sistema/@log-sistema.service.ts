import { Service } from 'typedi';
import { LogSistemaModel } from '../../models/log-sistema.model';
import { Prisma } from '@prisma/client';

@Service()
export class LogSistemaService {
  constructor(private logSistemaModel: LogSistemaModel) {}

  public async createLog(
    usuarioId: number,
    acao: string,
    clienteId?: number,
    transaction?: Prisma.TransactionClient,
  ) {
    return await this.logSistemaModel.createLog(usuarioId, acao.trim(), clienteId, transaction);
  }

  public async getLogs(transaction?: Prisma.TransactionClient) {
    return await this.logSistemaModel.getLogs(transaction);
  }
}
