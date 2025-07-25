import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { NotFoundError } from '../../errors/NotFoundError';
import { UsuarioResponse } from '../../types/usuario.types';
import { UsuarioService } from './@usuario.service';

@Service()
export class EditStatusUsuarioService {
  constructor(private readonly usuarioService: UsuarioService) {}

  async execute(id: number, status: boolean): Promise<UsuarioResponse> {
    if (!id || isNaN(id) || id <= 0) throw new BadRequestError('ID inválido.');

    const existingUser = await this.usuarioService.findById(id);
    if (!existingUser) throw new NotFoundError('Usuário não encontrado.');

    return await this.usuarioService.editStatus(id, status);
  }
}
