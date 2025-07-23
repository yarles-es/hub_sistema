import { Cliente } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { validateCel } from '../../utils/validate-cel';
import { ClienteService } from './@cliente.service';

@Service()
export class CreateClienteService {
  constructor(private readonly clienteService: ClienteService) {}

  async execute(data: Omit<Cliente, 'id'>): Promise<Cliente> {
    await this.validate(data);
    const result = await this.clienteService.createCliente(data);
    return result;
  }

  private async validate(data: Omit<Cliente, 'id'>): Promise<void> {
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
  }
}
