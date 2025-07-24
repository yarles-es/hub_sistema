import { Cliente } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { CreateCliente, CreateClienteRequest } from '../../types/cliente.types';
import { validateCel } from '../../utils/validate-cel';
import { ClienteService } from './@cliente.service';

@Service()
export class CreateClienteService {
  constructor(private readonly clienteService: ClienteService) {}

  async execute(data: CreateClienteRequest): Promise<Cliente> {
    const transformedData: CreateCliente = this.transformData(data);
    await this.validate(transformedData);
    const result = await this.clienteService.createCliente(transformedData);
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

    const existingCliente = await this.clienteService.getClienteByEmail(data.email);

    if (existingCliente) {
      throw new BadRequestError('Já existe um cliente com este e-mail.');
    }

    if (data.telefone && !validateCel(data.telefone)) {
      throw new BadRequestError('Número de celular inválido.');
    }

    if (data.diaMensalidade < 1 || data.diaMensalidade > 31) {
      throw new BadRequestError('Dia da mensalidade deve ser entre 1 e 31.');
    }
  }

  private transformData(data: CreateClienteRequest): CreateCliente {
    if (!data.dataNascimento) {
      throw new BadRequestError('Data de nascimento é obrigatória.');
    }
    if (isNaN(Date.parse(data.dataNascimento))) {
      throw new BadRequestError('Data de nascimento inválida.');
    }

    return {
      ...data,
      dataNascimento: new Date(data.dataNascimento),
    };
  }
}
