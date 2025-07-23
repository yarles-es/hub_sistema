import { RegistroAcesso } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { RegistroAcessoService } from './@registro-acesso.service';

@Service()
export class FindRegistroAcessoByIdService {
  constructor(private readonly registroAcessoService: RegistroAcessoService) {}

  public async execute(id: number): Promise<RegistroAcesso> {
    if (!id || isNaN(id) || id <= 0) {
      throw new BadRequestError('ID inválido fornecido para busca do registro de acesso.');
    }

    const registro = await this.registroAcessoService.findRegistroAcessoById(id);
    if (!registro) {
      throw new BadRequestError('Registro de acesso não encontrado.');
    }
    return registro;
  }
}
