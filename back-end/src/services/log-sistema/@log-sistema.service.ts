import { Service } from 'typedi';
import { LogSistemaModel } from '../../models/log-sistema.model';

@Service()
export class LogSistemaService {
  constructor(private logSistemaModel: LogSistemaModel) {}

  public async createLog(usuarioId: number, acao: string, clienteId?: number) {
    return await this.logSistemaModel.createLog(usuarioId, acao.trim(), clienteId);
  }

  public async getLogs() {
    return await this.logSistemaModel.getLogs();
  }
}
