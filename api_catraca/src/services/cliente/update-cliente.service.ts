import { Cliente } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { NotFoundError } from '../../errors/NotFoundError';
import { ClienteService } from './@cliente.service';

@Service()
export class UpdateClienteService {
  constructor(private readonly clienteService: ClienteService) {}

  async execute(
    id: number,
    data: Partial<Omit<Cliente, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Cliente> {
    if (!id || isNaN(id)) throw new BadRequestError('ID inválido.');

    const cliente = await this.clienteService.getClienteById(id);
    if (!cliente) throw new NotFoundError('Cliente não encontrado.');

    const updatedData = {
      nome: data.nome ? data.nome.trim().toUpperCase() : undefined,
      email: data.email ? data.email.trim().toLowerCase() : undefined,
      telefone: data.telefone ? data.telefone.trim() : undefined,
      catracaId: data.catracaId ? Number(data.catracaId) : undefined,
      planoId: data.planoId ? Number(data.planoId) : undefined,
    };

    return this.clienteService.updateCliente(id, updatedData);
  }
}
