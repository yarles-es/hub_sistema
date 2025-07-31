import { Cliente, StatusMensalidade } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { NotFoundError } from '../../errors/NotFoundError';
import { MensalidadeService } from '../mensalidade/@mensalidade.service';
import { ClienteService } from './@cliente.service';

@Service()
export class DisableClienteService {
  constructor(
    private readonly clienteService: ClienteService,
    private readonly mensalidadeService: MensalidadeService,
  ) {}

  async execute(id: number): Promise<Cliente> {
    const clienteExists = await this.clienteService.getClienteById(id);

    if (!clienteExists) {
      throw new NotFoundError('Cliente não encontrado');
    }

    if (!clienteExists.ativo) {
      throw new BadRequestError('Cliente já está desativado');
    }

    const [mensalidade] = await this.mensalidadeService.findMensalidadesByClienteIdAndStatus(
      id,
      StatusMensalidade.PENDENTE,
    );

    if (mensalidade) {
      await this.mensalidadeService.updateMensalidade(mensalidade.id, {
        status: StatusMensalidade.CANCELADO,
      });
    }

    const cliente = await this.clienteService.updateCliente(id, { ativo: false });

    return cliente;
  }
}
