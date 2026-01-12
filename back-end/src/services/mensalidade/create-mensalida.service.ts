import { Mensalidade, Plano, Prisma, StatusMensalidade, TipoPlano } from '@prisma/client';
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

  public async execute(
    data: CreateMensalidadeServiceParams,
    transaction?: Prisma.TransactionClient,
  ): Promise<Mensalidade | undefined> {
    const { clienteId, dataVencimentoAnterior } = data;
    const cliente = await this.clienteService.getClienteById(clienteId, transaction);

    if (!cliente) {
      throw new BadRequestError('Cliente não encontrado.');
    }

    if (cliente.isento) return;

    const mensalidades = await this.mensalidadeService.findMensalidadesByClienteIdAndStatus(
      clienteId,
      StatusMensalidade.PENDENTE,
      transaction,
    );

    const mensalidadePendente = mensalidades.length > 0;

    if (mensalidadePendente) {
      throw new BadRequestError('Já existe uma mensalidade pendente para este cliente.');
    }

    const plano = await this.planoService.getPlanoById(cliente.planoId, transaction);

    if (!plano) {
      throw new BadRequestError('Plano não encontrado para o cliente.');
    }

    if (!plano.ativo) {
      throw new BadRequestError('Plano atual do cliente está inativo, não é possível criar mensalidade.');
    }

    if (!dataVencimentoAnterior) {
      await this.clienteService.updateCliente(
        clienteId,
        {
          diaMensalidade: cliente.diaMensalidade ?? new Date().getDate(),
        },
        transaction,
      );
    }

    let vencimento: Date;

    if (dataVencimentoAnterior) {
      vencimento = new Date(dataVencimentoAnterior);
      vencimento = this.calculateTypePlanDate(vencimento, plano);
      vencimento.setHours(3, 0, 0, 0);
    } else {
      const now = new Date();
      vencimento = new Date(
        Date.UTC(now.getFullYear(), now.getMonth(), cliente.diaMensalidade ?? now.getDate(), 3, 0, 0, 0),
      );
    }
    const mensalidade = await this.mensalidadeService.createMensalidade(
      {
        clienteId: cliente.id,
        valor: plano.valor,
        vencimento,
      },
      transaction,
    );

    if (!mensalidade) {
      throw new BadRequestError('Erro ao criar mensalidade.');
    }

    return mensalidade;
  }

  calculateTypePlanDate(vencimento: Date, plano: Plano): Date {
    const novaData = new Date(vencimento);

    switch (plano.tipo) {
      case TipoPlano.MENSAL:
        novaData.setMonth(novaData.getMonth() + 1);
        break;
      case TipoPlano.QUINZENAL:
        novaData.setDate(novaData.getDate() + 15);
        break;
      case TipoPlano.SEMANAL:
        novaData.setDate(novaData.getDate() + 7);
        break;
    }
    return novaData;
  }
}
