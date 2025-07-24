import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { NotFoundError } from '../../errors/NotFoundError';
import { UsuarioResponse } from '../../types/usuario.types';
import { UsuarioService } from './@usuario.service';

@Service()
export class FindUsuarioByIdService {
  constructor(private readonly usuarioService: UsuarioService) {}

  async execute(id: number): Promise<UsuarioResponse> {
    if (!id || isNaN(id) || id <= 0) {
      throw new BadRequestError('ID inválido.');
    }

    const usuario = await this.usuarioService.findById(id);

    if (!usuario) {
      throw new NotFoundError('Usuário não encontrado.');
    }

    return usuario;
  }
}
