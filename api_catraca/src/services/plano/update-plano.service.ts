import { Plano } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { UpdatePlano } from '../../types/plano.types';
import { PlanoService } from './@plano.service';

@Service()
export class UpdatePlanoService {
  constructor(private readonly planoService: PlanoService) {}

  async execute(id: number, data: UpdatePlano): Promise<Plano> {
    await this.validate(id, data);
    return this.planoService.updatePlano(id, data);
  }

  async validate(id: number, data: UpdatePlano): Promise<void> {
    if (!id || id <= 0 || isNaN(id)) {
      throw new BadRequestError('ID inválido');
    }

    if (data.nome && data.nome.trim() === '') {
      throw new BadRequestError('Nome é obrigatório');
    }

    if (data.descricao && data.descricao.length > 255) {
      throw new BadRequestError('Descrição não pode exceder 255 caracteres');
    }

    if (data.valor && data.valor < 0) {
      throw new BadRequestError('Preço não pode ser negativo');
    }

    if (data.ativo !== undefined && typeof data.ativo !== 'boolean') {
      throw new BadRequestError('Ativo deve ser um valor booleano');
    }
  }
}
