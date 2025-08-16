import { Service } from 'typedi';
import { LogSistemaModel } from '../../models/log-sistema.model';
import { Prisma } from '@prisma/client';
import { GetLog, GetLogResponseModel } from '../../types/log-sistema.types';

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

  public async getLogs(
    page: number,
    limitNumber: number,
    data?: GetLog,
    transaction?: Prisma.TransactionClient,
  ): Promise<GetLogResponseModel> {
    return await this.logSistemaModel.getLogs(page, limitNumber, data, transaction);
  }
}
