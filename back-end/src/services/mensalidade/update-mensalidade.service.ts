import { FormPagamento, Mensalidade, Prisma, StatusMensalidade } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { MensalidadeService } from './@mensalidade.service';

@Service()
export class UpdateMensalidadeService {
  constructor(private readonly mensalidadeService: MensalidadeService) {}

  public async execute(
    id: number,
    data: Partial<Pick<Mensalidade, 'formaPagamento' | 'status' | 'valorPago' | 'dataPagamento'>>,
    transaction?: Prisma.TransactionClient,
  ): Promise<Mensalidade> {
    if (!id || isNaN(id) || id <= 0) {
      throw new BadRequestError('ID inválido.');
    }

    await this._validate(
      id,
      data.formaPagamento === null ? undefined : data.formaPagamento,
      data.status === null ? undefined : data.status,
    );

    if (data.valorPago === undefined) {
      data.valorPago = null;
    }

    return await this.mensalidadeService.updateMensalidade(id, data, transaction);
  }

  private async _validate(
    id: number,
    formaPagamento?: FormPagamento,
    status?: StatusMensalidade,
  ): Promise<void> {
    if (!id || isNaN(id) || id <= 0) {
      throw new BadRequestError('ID inválido');
    }

    const mensalidade = await this.mensalidadeService.findMensalidadeById(id);
    if (!mensalidade) {
      throw new BadRequestError('Mensalidade não encontrada');
    }

    if (formaPagamento && !Object.values(FormPagamento).includes(formaPagamento)) {
      throw new BadRequestError('Forma de pagamento inválida');
    }

    if (status && !Object.values(StatusMensalidade).includes(status)) {
      throw new BadRequestError('Status inválido');
    }
  }
}
