import { Cliente } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { NotFoundError } from '../../errors/NotFoundError';
import { validateEmail } from '../../utils/validate-email';
import { ClienteService } from './@cliente.service';

@Service()
export class GetClienteByEmailService {
  constructor(private readonly clienteService: ClienteService) {}

  async execute(email: string): Promise<Cliente> {
    console.log('GetClienteByEmailService.execute', { email });
    if (!email || !validateEmail(email) || email.trim() === '') {
      throw new BadRequestError('Email inválido.');
    }

    const cliente = await this.clienteService.getClienteByEmail(email);

    if (!cliente) throw new NotFoundError('Cliente não encontrado.');

    return cliente;
  }
}
