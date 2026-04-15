import { Plano, TipoPlano } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { CreatePlano } from '../../types/plano.types';
import { MAX_DIAS_VALIDOS_SEMANA } from '../../utils/plano-periodo';
import { PlanoService } from './@plano.service';

@Service()
export class CreatePlanoService {
  constructor(private readonly planoService: PlanoService) {}

  async execute(data: CreatePlano): Promise<Plano> {
    await this._validate(data);
    return this.planoService.createPlano(this._normalize(data));
  }

  private async _validate(data: CreatePlano): Promise<void> {
    if (!data.nome || data.nome.trim() === '') {
      throw new BadRequestError('Nome do plano é obrigatório');
    }

    const planoExistente = await this.planoService.getPlanoByName(data.nome);

    if (planoExistente) {
      throw new BadRequestError('Já existe um plano com este nome');
    }

    if (data.descricao && data.descricao.length > 255) {
      throw new BadRequestError('Descrição não pode exceder 255 caracteres');
    }

    if (data.valor === undefined || isNaN(data.valor) || data.valor <= 0) {
      throw new BadRequestError('Preço do plano deve ser maior que zero');
    }

    if (data.tipo && !Object.values(TipoPlano).includes(data.tipo)) {
      throw new BadRequestError('Tipo de plano inválido');
    }

    const validarDias = data.validarDiasSemana ?? false;
    const diasValidos = data.diasValidosSemana;

    if (data.validarDiasSemana !== undefined && typeof data.validarDiasSemana !== 'boolean') {
      throw new BadRequestError('validarDiasSemana deve ser um valor booleano');
    }

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

  private _normalize(data: CreatePlano): CreatePlano {
    const deveValidarDias = data.validarDiasSemana ?? false;
    const diasPermitidos = data.diasValidosSemana ?? null;

    return {
      ...data,
      validarDiasSemana: deveValidarDias,
      diasValidosSemana: deveValidarDias ? diasPermitidos : null,
    };
  }
}
