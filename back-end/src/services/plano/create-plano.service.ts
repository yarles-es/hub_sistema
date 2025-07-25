import { Plano } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { CreatePlano } from '../../types/plano.types';
import { PlanoService } from './@plano.service';

@Service()
export class CreatePlanoService {
  constructor(private readonly planoService: PlanoService) {}

  async execute(data: CreatePlano): Promise<Plano> {
    await this.validate(data);
    return this.planoService.createPlano(data);
  }

  async validate(data: CreatePlano): Promise<void> {
    if (!data.nome || data.nome.trim() === '') {
      throw new BadRequestError('Nome do plano é obrigatório');
    }

    if (data.descricao && data.descricao.length > 255) {
      throw new BadRequestError('Descrição não pode exceder 255 caracteres');
    }

    if (!data.valor || isNaN(data.valor)) {
      throw new BadRequestError('Preço do plano é obrigatório');
    }

    if (data.valor < 0) {
      throw new BadRequestError('Preço não pode ser negativo');
    }
  }
}
