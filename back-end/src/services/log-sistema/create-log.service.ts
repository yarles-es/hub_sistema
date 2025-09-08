import { Service } from 'typedi';
import { ClienteService } from '../cliente/@cliente.service';
import { LogSistemaService } from './@log-sistema.service';

@Service()
export class CreateLogService {
  constructor(
    private readonly logSistemaService: LogSistemaService,
    private readonly clienteService: ClienteService,
  ) {}

  public async execute(usuarioId: number, acao: string, clienteId?: number) {
    await this._validate(usuarioId, acao, clienteId);
    const result = await this.logSistemaService.createLog(usuarioId, acao, clienteId);
    return result;
  }

  private async _validate(usuarioId: number, acao: string, clienteId?: number): Promise<void> {
    if (clienteId && !(await this.clienteService.getClienteById(clienteId))) {
      console.error('erro ao registrar log, cliente não encontrado');
      return;
    }

    if (!usuarioId || !acao) {
      console.error('erro ao registrar log, usuário ID e ação são obrigatórios');
      return;
    }
  }
}
