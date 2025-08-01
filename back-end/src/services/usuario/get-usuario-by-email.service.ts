import { Service } from 'typedi';
import { NotFoundError } from '../../errors/NotFoundError';
import { UsuarioResponse } from '../../types/usuario.types';
import { validateEmail } from '../../utils/validate-email';
import { UsuarioService } from './@usuario.service';

@Service()
export class GetUsuarioByEmailService {
  constructor(private readonly usuarioService: UsuarioService) {}

  public async execute(email: string): Promise<UsuarioResponse> {
    if (!email || email.length < 5 || !validateEmail(email)) {
      throw new Error('Email inválido');
    }

    const usuario = await this.usuarioService.findByEmail(email);

    if (!usuario) {
      throw new NotFoundError('Usuário não encontrado');
    }

    return usuario;
  }
}
