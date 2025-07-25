import { Cliente } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { NotFoundError } from '../../errors/NotFoundError';
import { ClienteService } from './@cliente.service';

@Service()
export class GetClienteByIdService {
  constructor(private readonly clienteService: ClienteService) {}

  async execute(id: number): Promise<Cliente> {
    if (!id || isNaN(id)) throw new BadRequestError('ID inválido.');

    const cliente = await this.clienteService.getClienteById(id);

    if (!cliente) throw new NotFoundError('Cliente não encontrado.');

    return cliente;
  }
}
