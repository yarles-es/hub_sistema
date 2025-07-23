import { Usuario } from '@prisma/client';
import { Service } from 'typedi';
import { NotFoundError } from '../../errors/NotFoundError';
import { validateEmail } from '../../utils/validate-email';
import { UsuarioService } from './@usuario.service';

@Service()
export class FindUsuarioByEmailService {
  constructor(private readonly usuarioService: UsuarioService) {}

  public async execute(email: string): Promise<Usuario> {
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
