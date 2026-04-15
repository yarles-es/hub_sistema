import { Plano, Prisma, StatusMensalidade, TipoPlano } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { UpdatePlano } from '../../types/plano.types';
import { PlanoService } from './@plano.service';
import { ClienteService } from '../cliente/@cliente.service';
import { MensalidadeService } from '../mensalidade/@mensalidade.service';
import { withTransaction } from '../../utils/withTransaction';
import { MAX_DIAS_VALIDOS_SEMANA } from '../../utils/plano-periodo';

@Service()
export class UpdatePlanoService {
  constructor(
    private readonly planoService: PlanoService,
    private readonly clienteService: ClienteService,
    private readonly mensalidadeService: MensalidadeService,
  ) {}

  async execute(id: number, data: UpdatePlano): Promise<Plano> {
    this._validateId(id);

    const plan = await withTransaction(async (tx) => {
      const existingPlan = await this.planoService.getPlanoById(id, tx);

      if (!existingPlan) {
        throw new BadRequestError('Plano não encontrado');
      }

      await this._validate(data, existingPlan);

      const normalizedData = this._normalize(data, existingPlan);
      const plan = await this.planoService.updatePlano(id, normalizedData, tx);

      if (data.valor !== undefined && plan.valor !== existingPlan.valor) {
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

  private _validateId(id: number): void {
    if (!id || id <= 0 || isNaN(id)) {
      throw new BadRequestError('ID inválido');
    }
  }

  private async _validate(data: UpdatePlano, existingPlan: Plano): Promise<void> {
    if (data.nome && data.nome.trim() === '') {
      throw new BadRequestError('Nome é obrigatório');
    }

    if (data.descricao && data.descricao.length > 255) {
      throw new BadRequestError('Descrição não pode exceder 255 caracteres');
    }

    if (data.valor !== undefined && (isNaN(data.valor) || data.valor <= 0)) {
      throw new BadRequestError('Preço do plano deve ser maior que zero');
    }

    if (data.ativo !== undefined && typeof data.ativo !== 'boolean') {
      throw new BadRequestError('Ativo deve ser um valor booleano');
    }

    if (data.tipo && !Object.values(TipoPlano).includes(data.tipo)) {
      throw new BadRequestError('Tipo de plano inválido');
    }

    if (data.validarDiasSemana !== undefined && typeof data.validarDiasSemana !== 'boolean') {
      throw new BadRequestError('validarDiasSemana deve ser um valor booleano');
    }

    const validarDias = data.validarDiasSemana ?? existingPlan.validarDiasSemana;
    const diasValidos =
      data.validarDiasSemana === false ? null : data.diasValidosSemana ?? existingPlan.diasValidosSemana;

    if (!validarDias) {
      return;
    }

    if (diasValidos === null || diasValidos === undefined) {
      throw new BadRequestError('diasValidosSemana é obrigatório quando validarDiasSemana estiver ativo');
    }

    if (!Number.isInteger(diasValidos) || diasValidos <= 0) {
      throw new BadRequestError('diasValidosSemana deve ser um número inteiro maior que zero');
    }

    if (diasValidos > MAX_DIAS_VALIDOS_SEMANA) {
      throw new BadRequestError(
        `diasValidosSemana não pode ser maior que ${MAX_DIAS_VALIDOS_SEMANA} em uma semana`,
      );
    }
  }

  private _normalize(data: UpdatePlano, existingPlan: Plano): UpdatePlano {
    const deveValidarDias = data.validarDiasSemana ?? existingPlan.validarDiasSemana;
    const diasPermitidos = data.diasValidosSemana ?? existingPlan.diasValidosSemana;

    return {
      ...data,
      diasValidosSemana: deveValidarDias ? diasPermitidos : null,
    };
  }
}
