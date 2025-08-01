import { Mensalidade } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { NotFoundError } from '../../errors/NotFoundError';
import { ClienteService } from '../cliente/@cliente.service';
import { MensalidadeService } from './@mensalidade.service';

@Service()
export class GetMensalidadeByClienteIdService {
  constructor(
    private readonly mensalidadeService: MensalidadeService,
    private readonly clienteService: ClienteService,
  ) {}

  public async execute(clienteId: number): Promise<Mensalidade[]> {
    if (!clienteId || isNaN(clienteId)) {
      throw new BadRequestError('ID inválido fornecido para busca das mensalidades do cliente.');
    }

    const cliente = await this.clienteService.getClienteById(clienteId);

    if (!cliente) {
      throw new NotFoundError('Cliente não encontrado.');
    }

    const mensalidades = await this.mensalidadeService.findMensalidadesByClienteId(clienteId);

    if (!mensalidades || mensalidades.length === 0) {
      throw new BadRequestError('Nenhuma mensalidade encontrada para este cliente.');
    }

    return mensalidades;
  }
}
