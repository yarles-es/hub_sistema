import { Cliente, StatusMensalidade } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { NotFoundError } from '../../errors/NotFoundError';
import { UpdateClient, UpdateClientRequest } from '../../types/cliente.types';
import { MensalidadeService } from '../mensalidade/@mensalidade.service';
import { PlanoService } from '../plano/@plano.service';
import { ClienteService } from './@cliente.service';

@Service()
export class UpdateClienteService {
  constructor(
    private readonly clienteService: ClienteService,
    private readonly mensalidadeService: MensalidadeService,
    private readonly planoService: PlanoService,
  ) {}

  async execute(id: number, data: UpdateClientRequest): Promise<Cliente> {
    if (!id || isNaN(id)) throw new BadRequestError('ID inválido.');

    const cliente = await this.clienteService.getClienteById(id);

    if (!cliente) throw new NotFoundError('Cliente não encontrado.');

    if (data.planoId && cliente.planoId !== data.planoId) {
      await this.editMonthlyFeeIfPlanIdIsChanged(id, data.planoId);
    }

    const transformedData: UpdateClient = this._transformData(data);

    if (transformedData.isento) {
      await this.cancelMonthlyFeeIfCustomerIsExempt(id);
    }

    const updatedData: UpdateClient = {
      nome: transformedData.nome ? transformedData.nome.trim().toUpperCase() : undefined,
      email: transformedData.email ? transformedData.email.trim().toLowerCase() : undefined,
      telefone: transformedData.telefone ? transformedData.telefone.trim() : undefined,
      catracaId: transformedData.catracaId ? Number(transformedData.catracaId) : undefined,
      planoId: transformedData.planoId ? Number(transformedData.planoId) : undefined,
      dataNascimento: transformedData.dataNascimento ? new Date(transformedData.dataNascimento) : undefined,
      diaMensalidade: transformedData.diaMensalidade ? Number(transformedData.diaMensalidade) : undefined,
      isento: typeof transformedData.isento === 'boolean' ? transformedData.isento : undefined,
    };

    return this.clienteService.updateCliente(id, updatedData);
  }

  private _transformData(data: UpdateClientRequest): UpdateClient {
    if (!data.dataNascimento) {
      throw new BadRequestError('Data de nascimento é obrigatória.');
    }
    if (isNaN(Date.parse(data.dataNascimento))) {
      throw new BadRequestError('Data de nascimento inválida.');
    }

    const date = new Date(data.dataNascimento);
    date.setHours(date.getHours() + 3);
    return {
      ...data,
      dataNascimento: date,
    };
  }

  private async cancelMonthlyFeeIfCustomerIsExempt(clienteId: number) {
    const [mensalidade] = await this.mensalidadeService.findMensalidadesByClienteIdAndStatus(
      clienteId,
      StatusMensalidade.PENDENTE,
    );

    if (!mensalidade) return;

    await this.mensalidadeService.updateMensalidade(mensalidade.id, {
      status: StatusMensalidade.CANCELADO,
    });
  }

  private async editMonthlyFeeIfPlanIdIsChanged(clienteId: number, newPlanoId: number): Promise<void> {
    const [mensalidade] = await this.mensalidadeService.findMensalidadesByClienteIdAndStatus(
      clienteId,
      StatusMensalidade.PENDENTE,
    );

    const plano = await this.planoService.getPlanoById(newPlanoId);

    if (!plano) throw new NotFoundError('Plano não encontrado.');
    if (!mensalidade) return;

    const { valor } = plano;

    await this.mensalidadeService.updateMensalidade(mensalidade.id, {
      valor,
    });
  }
}
