import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { NotFoundError } from '../../errors/NotFoundError';
import { UpdateUsuario, UsuarioResponse } from '../../types/usuario.types';
import { validateEmail } from '../../utils/validate-email';
import { UsuarioService } from './@usuario.service';

@Service()
export class UpdateUsuarioService {
  constructor(private readonly usuarioService: UsuarioService) {}

  async execute(id: number, usuario: UpdateUsuario): Promise<UsuarioResponse> {
    if (!id || isNaN(id) || id <= 0) throw new BadRequestError('ID inválido.');

    await this.validate(usuario);

    const existingUser = await this.usuarioService.findById(id);
    if (!existingUser) throw new NotFoundError('Usuário não encontrado.');

    return await this.usuarioService.update(id, usuario);
  }

  async validate(usuario: UpdateUsuario): Promise<void> {
    if (usuario.email && !validateEmail(usuario.email)) throw new BadRequestError('Email inválido.');
    if (usuario.nome && usuario.nome.trim() === '') throw new BadRequestError('Nome não pode ser vazio.');
    if (usuario.senha && usuario.senha.trim() === '') throw new BadRequestError('Senha não pode ser vazia.');
    if (usuario.senha && usuario.senha.length < 6)
      throw new BadRequestError('Senha deve ter pelo menos 6 caracteres.');

    if (usuario.ativo && typeof usuario.ativo !== 'boolean') {
      throw new BadRequestError('O campo "ativo" deve ser um booleano.');
    }
    if (usuario.administrador && typeof usuario.administrador !== 'boolean') {
      throw new BadRequestError('O campo "administrador" deve ser um booleano.');
    }
  }
}
