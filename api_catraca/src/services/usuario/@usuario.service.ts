import { Usuario } from '@prisma/client';
import { Service } from 'typedi';
import { UsuarioModel } from '../../models/usuario.model';
import { CreateUsuario, UpdateUsuario, UsuarioResponse } from '../../types/usuario.types';

@Service()
export class UsuarioService {
  private usuarioModel: UsuarioModel;

  constructor() {
    this.usuarioModel = new UsuarioModel();
  }

  public async create(usuario: CreateUsuario): Promise<UsuarioResponse> {
    const userFormated = {
      ...usuario,
      nome: usuario.nome.trim(),
      email: usuario.email.trim(),
      senha: usuario.senha.trim(),
    };
    return await this.usuarioModel.create(userFormated);
  }

  public async findByEmail(email: string): Promise<UsuarioResponse | null> {
    return await this.usuarioModel.findByEmail(email);
  }

  public async findByEmailWithPassword(email: string): Promise<Usuario | null> {
    return await this.usuarioModel.findByEmailWithPassword(email);
  }

  public async findById(id: number): Promise<UsuarioResponse | null> {
    return await this.usuarioModel.findById(id);
  }

  public async update(id: number, usuario: UpdateUsuario): Promise<Omit<Usuario, 'senha'>> {
    const userFormated = {
      ...usuario,
      nome: usuario.nome?.trim(),
      email: usuario.email?.trim(),
      senha: usuario.senha?.trim(),
    };
    return await this.usuarioModel.update(id, userFormated);
  }

  public async disable(id: number): Promise<UsuarioResponse> {
    return await this.usuarioModel.disable(id);
  }
}
