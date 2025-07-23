import { Usuario } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { NotFoundError } from '../../errors/NotFoundError';
import { UsuarioService } from './@usuario.service';

@Service()
export class DisableUsuarioService {
  constructor(private readonly usuarioService: UsuarioService) {}

  async execute(id: number): Promise<Usuario> {
    if (!id || isNaN(id) || id <= 0) throw new BadRequestError('ID inválido.');

    const existingUser = await this.usuarioService.findById(id);
    if (!existingUser) throw new NotFoundError('Usuário não encontrado.');

    return await this.usuarioService.disable(id);
  }
}
