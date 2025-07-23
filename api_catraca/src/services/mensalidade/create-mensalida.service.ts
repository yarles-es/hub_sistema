import { Mensalidade } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { validateDateGreaterThanToday } from '../../utils/validate-date';
import { ClienteService } from '../cliente/@cliente.service';
import { MensalidadeService } from './@mensalidade.service';

@Service()
export class CreateMensalidadeService {
  constructor(
    private readonly mensalidadeService: MensalidadeService,
    private readonly clienteService: ClienteService,
  ) {}

  public async execute(
    mensalidadeData: Omit<Mensalidade, 'id' | 'createdAt' | 'updatedAt' | 'status'>,
  ): Promise<Mensalidade> {
    await this.validate(mensalidadeData);
    const result = await this.mensalidadeService.createMensalidade(mensalidadeData);
    return result;
  }

  private async validate(
    mensalidadeData: Omit<Mensalidade, 'id' | 'createdAt' | 'updatedAt' | 'status'>,
  ): Promise<void> {
    if (
      !mensalidadeData.clienteId ||
      !(await this.clienteService.getClienteById(mensalidadeData.clienteId))
    ) {
      throw new BadRequestError('Cliente não encontrado');
    }

    if (!mensalidadeData.valor || mensalidadeData.valor <= 0) {
      throw new BadRequestError('Valor da mensalidade deve ser maior que zero');
    }

    if (!mensalidadeData.vencimento) {
      throw new BadRequestError('Data de vencimento é obrigatória');
    }

    if (!validateDateGreaterThanToday(mensalidadeData.vencimento)) {
      throw new BadRequestError('Data de vencimento deve ser maior que a data atual');
    }
  }
}
