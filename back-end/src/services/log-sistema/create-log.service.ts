import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { ClienteService } from '../cliente/@cliente.service';
import { LogSistemaService } from './@log-sistema.service';

@Service()
export class CreateLogService {
  constructor(
    private readonly logSistemaService: LogSistemaService,
    private readonly clienteService: ClienteService,
  ) {}

  public async execute(usuarioId: number, acao: string, clienteId?: number) {
    await this.validate(usuarioId, acao, clienteId);
    const result = await this.logSistemaService.createLog(usuarioId, acao, clienteId);
    return result;
  }

  private async validate(usuarioId: number, acao: string, clienteId?: number): Promise<void> {
    if (clienteId && !(await this.clienteService.getClienteById(clienteId))) {
      throw new BadRequestError('Cliente não encontrado');
    }

    if (!usuarioId || !acao) {
      throw new BadRequestError('Usuário ID e ação são obrigatórios');
    }
  }
}
