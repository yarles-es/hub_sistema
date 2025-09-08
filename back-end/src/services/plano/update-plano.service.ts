import { Plano, Prisma, StatusMensalidade } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { UpdatePlano } from '../../types/plano.types';
import { PlanoService } from './@plano.service';
import { ClienteService } from '../cliente/@cliente.service';
import { MensalidadeService } from '../mensalidade/@mensalidade.service';
import { withTransaction } from '../../utils/withTransaction';

@Service()
export class UpdatePlanoService {
  constructor(
    private readonly planoService: PlanoService,
    private readonly clienteService: ClienteService,
    private readonly mensalidadeService: MensalidadeService,
  ) {}

  async execute(id: number, data: UpdatePlano): Promise<Plano> {
    this._validate(id, data);

    const plan = await withTransaction(async (tx) => {
      const existingPlan = await this.planoService.getPlanoById(id, tx);

      if (!existingPlan) {
        throw new BadRequestError('Plano não encontrado');
      }

      const plan = await this.planoService.updatePlano(id, data);

      if (data.valor && plan.valor !== existingPlan.valor) {
        await this._modifyValorExistingMonthlyFeePending(id, data.valor, tx);
      }
      return plan;
    });

    return plan;
  }

  private async _modifyValorExistingMonthlyFeePending(
    idPlano: number,
    newValor: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<void> {
    const clientes = await this.clienteService.getAllClientesWithMensalidadeByPlanId(idPlano, transaction);

    await Promise.all(
      clientes.map(async (cliente) => {
        const mensalidade = cliente.Mensalidade.find((m) => m.status === StatusMensalidade.PENDENTE);
        if (mensalidade) {
          await this.mensalidadeService.updateMensalidade(mensalidade.id, { valor: newValor }, transaction);
        }
      }),
    );
  }

  private _validate(id: number, data: UpdatePlano): void {
    if (!id || id <= 0 || isNaN(id)) {
      throw new BadRequestError('ID inválido');
    }

    if (data.nome && data.nome.trim() === '') {
      throw new BadRequestError('Nome é obrigatório');
    }

    if (data.descricao && data.descricao.length > 255) {
      throw new BadRequestError('Descrição não pode exceder 255 caracteres');
    }

    if (data.valor && data.valor < 0) {
      throw new BadRequestError('Preço não pode ser negativo');
    }

    if (data.ativo !== undefined && typeof data.ativo !== 'boolean') {
      throw new BadRequestError('Ativo deve ser um valor booleano');
    }
  }
}
