import { Cliente } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { CreateCliente, CreateClienteRequest } from '../../types/cliente.types';
import { validateCel } from '../../utils/validate-cel';
import { CreateMensalidadeService } from '../mensalidade/create-mensalida.service';
import { PlanoService } from '../plano/@plano.service';
import { ClienteService } from './@cliente.service';

@Service()
export class CreateClienteService {
  constructor(
    private readonly clienteService: ClienteService,
    private readonly planoService: PlanoService,
    private readonly createMensalidadeService: CreateMensalidadeService,
  ) {}

  async execute(data: CreateClienteRequest): Promise<Cliente> {
    const transformedData: CreateCliente = this._transformData(data);
    await this.validate(transformedData);
    const result = await this.clienteService.createCliente(transformedData);
    await this.createMensalidadeService.execute({ clienteId: result.id });
    return result;
  }

  private async validate(data: CreateCliente): Promise<void> {
    if (!data.nome || data.nome.trim() === '') {
      throw new BadRequestError('Nome é obrigatório.');
    }

    if (!data.email || data.email.trim() === '') {
      throw new BadRequestError('E-mail é obrigatório.');
    }

    if (!data.planoId) {
      throw new BadRequestError('Plano é obrigatório.');
    }

    const plano = await this.planoService.getPlanoById(data.planoId);
    if (!plano) {
      throw new BadRequestError('Plano não encontrado.');
    }

    const existingCliente = await this.clienteService.getClienteByEmail(data.email);

    if (existingCliente) {
      throw new BadRequestError('Já existe um cliente com este e-mail.');
    }

    if (data.telefone && !validateCel(data.telefone)) {
      throw new BadRequestError('Número de celular inválido.');
    }

    if (data.diaMensalidade && (data.diaMensalidade < 1 || data.diaMensalidade > 31)) {
      throw new BadRequestError('Dia da mensalidade deve ser entre 1 e 31.');
    }
  }

  private _transformData(data: CreateClienteRequest): CreateCliente {
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
      diaMensalidade: data.diaMensalidade ?? undefined,
    };
  }
}
