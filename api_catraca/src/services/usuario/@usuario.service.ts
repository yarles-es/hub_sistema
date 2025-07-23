import { Usuario } from '@prisma/client';
import { Service } from 'typedi';
import { UsuarioModel } from '../../models/usuario.model';

@Service()
export class UsuarioService {
  private usuarioModel: UsuarioModel;

  constructor() {
    this.usuarioModel = new UsuarioModel();
  }

  public async create(usuario: Omit<Usuario, 'id' | 'createdAt' | 'updatedAt' | 'ativo'>): Promise<Usuario> {
    const userFormated = {
      ...usuario,
      nome: usuario.nome.trim(),
      email: usuario.email.trim(),
      senha: usuario.senha.trim(),
    };
    return await this.usuarioModel.create(userFormated);
  }

  public async findByEmail(email: string): Promise<Usuario | null> {
    return await this.usuarioModel.findByEmail(email);
  }

  public async findById(id: number): Promise<Usuario | null> {
    return await this.usuarioModel.findById(id);
  }

  public async update(
    id: number,
    usuario: Partial<Omit<Usuario, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Usuario> {
    const userFormated = {
      ...usuario,
      nome: usuario.nome?.trim(),
      email: usuario.email?.trim(),
      senha: usuario.senha?.trim(),
    };
    return await this.usuarioModel.update(id, userFormated);
  }

  public async disable(id: number): Promise<Usuario> {
    return await this.usuarioModel.disable(id);
  }
}
