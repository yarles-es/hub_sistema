import { Service } from 'typedi';
import { ClienteService } from '../cliente/@cliente.service';
import { limparTemplateBiometriaPorId } from '../../api/biometria/limpar-id-catraca-vinculada';
import { Cliente } from '@prisma/client';
import { BadRequestError } from '../../errors/BadRequestError';
import { NotFoundError } from '../../errors/NotFoundError';

@Service()
export class LimparTemplatePorIdService {
  constructor(private readonly clienteService: ClienteService) {}

  async execute(idCatraca: number): Promise<Cliente> {
    if (!idCatraca || isNaN(idCatraca)) {
      throw new BadRequestError('ID inválido');
    }

    const cliente = await this.clienteService.findByIdRegistro(idCatraca);

    if (!cliente) {
      throw new NotFoundError('Cliente não encontrado');
    }

    await limparTemplateBiometriaPorId(cliente.catracaId!);

    const result = await this.clienteService.updateCliente(cliente.id, { catracaId: null });
    return result;
  }
}
