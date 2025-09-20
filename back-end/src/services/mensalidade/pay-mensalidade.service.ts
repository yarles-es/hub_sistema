import { FormPagamento, Mensalidade, Prisma, StatusMensalidade } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { MensalidadeService } from './@mensalidade.service';
import { CreateMensalidadeService } from './create-mensalida.service';
import { UpdateMensalidadeService } from './update-mensalidade.service';
import { PaymentMensalidade } from '../../types/mensalidade.types';
import { withTransaction } from '../../utils/withTransaction';

@Service()
export class PayMensalidadeService {
  constructor(
    private readonly mensalidadeService: MensalidadeService,
    private readonly createMensalidadeService: CreateMensalidadeService,
    private readonly updateMensalidadeService: UpdateMensalidadeService,
  ) {}

  public async execute({
    mensalidadeId,
    formaPagamento,
    valorPago,
  }: PaymentMensalidade): Promise<Mensalidade> {
    const mensalidade = await this.mensalidadeService.findMensalidadeById(mensalidadeId);
    if (!mensalidade) {
      throw new BadRequestError('Mensalidade não encontrada.');
    }

    if (mensalidade.status !== StatusMensalidade.PENDENTE) {
      throw new BadRequestError('Mensalidade não está pendente.');
    }

    const response = await withTransaction(async (tx) => {
      const mensalidade = await this.updateMensalidadeService.execute(
        mensalidadeId,
        {
          status: StatusMensalidade.PAGO,
          formaPagamento,
          valorPago,
          dataPagamento: new Date(),
        },
        tx,
      );

      await this.createMensalidadeService.execute(
        {
          clienteId: mensalidade.clienteId,
          dataVencimentoAnterior: mensalidade.vencimento,
        },
        tx,
      );

      return mensalidade;
    });

    return response;
  }
}
