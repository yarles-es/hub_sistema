import { Service } from 'typedi';
import { NotFoundError } from '../../errors/NotFoundError';
import { UsuarioResponse } from '../../types/usuario.types';
import { UsuarioService } from './@usuario.service';

@Service()
export class GetAllUsuarioService {
  private usuarioService: UsuarioService;

  constructor() {
    this.usuarioService = new UsuarioService();
  }

  public async execute(): Promise<UsuarioResponse[]> {
    const users = await this.usuarioService.findAll();
    if (!users || users.length === 0) {
      throw new NotFoundError('Nenhum usuário encontrado');
    }
    return users;
  }
}
