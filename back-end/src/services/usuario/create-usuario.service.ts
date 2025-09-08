import { Service } from 'typedi';
import { BadRequestError } from '../../errors/BadRequestError';
import { CreateUsuario, UsuarioResponse } from '../../types/usuario.types';
import { validateEmail } from '../../utils/validate-email';
import { UsuarioService } from './@usuario.service';

@Service()
export class CreateUsuarioService {
  constructor(private readonly usuarioService: UsuarioService) {}

  public async execute(usuario: CreateUsuario): Promise<UsuarioResponse> {
    await this._validate(usuario);

    return await this.usuarioService.create(usuario);
  }

  async _validate(usuario: CreateUsuario): Promise<void> {
    if (usuario.email.length < 5 || !validateEmail(usuario.email)) {
      throw new BadRequestError('Email inválido');
    }

    const userExists = await this.usuarioService.findByEmail(usuario.email);

    if (userExists) {
      throw new BadRequestError('Email já cadastrado');
    }

    if (!usuario.nome || !usuario.email || !usuario.senha) {
      throw new BadRequestError('Nome, email e senha são obrigatórios');
    }

    if (usuario.senha.length < 6) {
      throw new BadRequestError('Senha deve ter pelo menos 6 caracteres');
    }
  }
}
