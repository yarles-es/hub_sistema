import { Cliente, StatusMensalidade } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { NotFoundError } from '../../errors/NotFoundError';
import { MensalidadeService } from '../mensalidade/@mensalidade.service';
import { CreateMensalidadeService } from '../mensalidade/create-mensalida.service';
import { ClienteService } from './@cliente.service';

@Service()
export class ActiveClienteService {
  constructor(
    private readonly clienteService: ClienteService,
    private readonly mensalidadeService: MensalidadeService,
    private readonly createMensalidadeService: CreateMensalidadeService,
  ) {}

  async execute(id: number): Promise<Cliente> {
    const clienteExists = await this.clienteService.getClienteById(id);

    if (!clienteExists) {
      throw new NotFoundError('Cliente não encontrado');
    }

    if (clienteExists.ativo) {
      throw new BadRequestError('Cliente já está ativado');
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

    await this.createMensalidadeService.execute({
      clienteId: id,
    });

    const cliente = await this.clienteService.updateCliente(id, { ativo: true });

    return cliente;
  }
}
