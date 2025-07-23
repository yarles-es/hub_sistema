import { Usuario } from '@prisma/client';
import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { NotFoundError } from '../../errors/NotFoundError';
import { validateEmail } from '../../utils/validate-email';
import { UsuarioService } from './@usuario.service';

@Service()
export class UpdateUsuarioService {
  constructor(private readonly usuarioService: UsuarioService) {}

  async execute(
    id: number,
    usuario: Partial<Omit<Usuario, 'id' | 'createdAt' | 'updatedAt' | 'ativo'>>,
  ): Promise<Usuario> {
    if (!id || isNaN(id) || id <= 0) throw new BadRequestError('ID inválido.');

    await this.validate(usuario);

    const existingUser = await this.usuarioService.findById(id);
    if (!existingUser) throw new NotFoundError('Usuário não encontrado.');

    return await this.usuarioService.update(id, usuario);
  }

  async validate(usuario: Partial<Omit<Usuario, 'id' | 'createdAt' | 'updatedAt' | 'ativo'>>): Promise<void> {
    if (usuario.email && !validateEmail(usuario.email)) throw new BadRequestError('Email inválido.');
    if (usuario.nome && usuario.nome.trim() === '') throw new BadRequestError('Nome não pode ser vazio.');
    if (usuario.senha && usuario.senha.trim() === '') throw new BadRequestError('Senha não pode ser vazia.');
    if (usuario.senha && usuario.senha.length < 6)
      throw new BadRequestError('Senha deve ter pelo menos 6 caracteres.');
  }
}
