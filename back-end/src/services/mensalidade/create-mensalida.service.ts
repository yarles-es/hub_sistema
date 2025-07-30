import { Mensalidade, StatusMensalidade } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { ClienteService } from '../cliente/@cliente.service';
import { PlanoService } from '../plano/@plano.service';
import { MensalidadeService } from './@mensalidade.service';

type CreateMensalidadeServiceParams = {
  clienteId: number;
  dataVencimentoAnterior?: Date;
};

@Service()
export class CreateMensalidadeService {
  constructor(
    private readonly mensalidadeService: MensalidadeService,
    private readonly clienteService: ClienteService,
    private readonly planoService: PlanoService,
  ) {}

  public async execute(data: CreateMensalidadeServiceParams): Promise<Mensalidade> {
    const { clienteId, dataVencimentoAnterior } = data;
    const cliente = await this.clienteService.getClienteById(clienteId);
    if (!cliente) {
      throw new BadRequestError('Cliente não encontrado.');
    }

    const mensalidades = await this.mensalidadeService.findMensalidadesByClienteIdAndStatus(
      clienteId,
      StatusMensalidade.PENDENTE,
    );
    const mensalidadePendente = mensalidades.length > 0;

    const plano = await this.planoService.getPlanoById(cliente.planoId);

    if (!plano) {
      throw new BadRequestError('Plano não encontrado para o cliente.');
    }

    if (mensalidadePendente) {
      throw new BadRequestError('Já existe uma mensalidade pendente para este cliente.');
    }

    if (!dataVencimentoAnterior) {
      await this.clienteService.updateCliente(clienteId, {
        diaMensalidade: new Date().getDate(),
      });
    }

    let vencimento: Date;

    if (dataVencimentoAnterior) {
      vencimento = new Date(dataVencimentoAnterior);
      vencimento.setMonth(vencimento.getMonth() + 1);
    } else {
      const now = new Date();
      vencimento = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 3, 0, 0, 0));
    }

    const mensalidade = await this.mensalidadeService.createMensalidade({
      clienteId: cliente.id,
      valor: plano.valor,
      vencimento,
    });

    if (!mensalidade) {
      throw new BadRequestError('Erro ao criar mensalidade.');
    }

    return mensalidade;
  }
}
