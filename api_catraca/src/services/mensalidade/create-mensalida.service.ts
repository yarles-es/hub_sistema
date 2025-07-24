import { Mensalidade, StatusMensalidade } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { ClienteService } from '../cliente/@cliente.service';
import { PlanoService } from '../plano/@plano.service';
import { MensalidadeService } from './@mensalidade.service';

@Service()
export class CreateMensalidadeService {
  constructor(
    private readonly mensalidadeService: MensalidadeService,
    private readonly clienteService: ClienteService,
    private readonly planoService: PlanoService,
  ) {}

  public async execute(clienteId: number, nextMonth: boolean = false): Promise<Mensalidade> {
    const cliente = await this.clienteService.getClienteById(clienteId);
    if (!cliente) {
      throw new BadRequestError('Cliente não encontrado.');
    }

    const mensalidades = await this.mensalidadeService.findMensalidadesByClienteId(clienteId);
    const mensalidadePendente = mensalidades.find(
      (mensalidade) => mensalidade.status === StatusMensalidade.PENDENTE,
    );

    const plano = await this.planoService.getPlanoById(cliente.planoId);

    if (!plano) {
      throw new BadRequestError('Plano não encontrado para o cliente.');
    }

    if (mensalidadePendente) {
      throw new BadRequestError('Já existe uma mensalidade pendente para este cliente.');
    }
    const diaAtualDoMes = nextMonth ? cliente.diaMensalidade : new Date().getDate();

    await this.clienteService.updateCliente(clienteId, {
      diaMensalidade: diaAtualDoMes,
    });

    const mensalidade = await this.mensalidadeService.createMensalidade({
      clienteId: cliente.id,
      valor: plano.valor,
      vencimento: new Date(new Date().setMonth(new Date().getMonth() + (nextMonth ? 1 : 0))),
    });

    if (!mensalidade) {
      throw new BadRequestError('Erro ao criar mensalidade.');
    }

    return mensalidade;
  }
}
