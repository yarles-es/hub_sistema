import { Prisma, Usuario } from '@prisma/client';
import { Service } from 'typedi';
import { UsuarioModel } from '../../models/usuario.model';
import { CreateUsuario, UpdateUsuario, UsuarioResponse } from '../../types/usuario.types';

@Service()
export class UsuarioService {
  private usuarioModel: UsuarioModel;

  constructor() {
    this.usuarioModel = new UsuarioModel();
  }

  public async create(
    usuario: CreateUsuario,
    transaction?: Prisma.TransactionClient,
  ): Promise<UsuarioResponse> {
    const userFormated = {
      ...usuario,
      nome: usuario.nome.trim(),
      email: usuario.email.trim(),
      senha: usuario.senha.trim(),
    };
    return await this.usuarioModel.create(userFormated, transaction);
  }

  public async findByEmail(
    email: string,
    transaction?: Prisma.TransactionClient,
  ): Promise<UsuarioResponse | null> {
    return await this.usuarioModel.findByEmail(email, transaction);
  }

  public async findAll(transaction?: Prisma.TransactionClient): Promise<UsuarioResponse[]> {
    return await this.usuarioModel.findAll(transaction);
  }

  public async findByEmailWithPassword(
    email: string,
    transaction?: Prisma.TransactionClient,
  ): Promise<Usuario | null> {
    return await this.usuarioModel.findByEmailWithPassword(email, transaction);
  }

  public async findById(id: number, transaction?: Prisma.TransactionClient): Promise<UsuarioResponse | null> {
    return await this.usuarioModel.findById(id, transaction);
  }

  public async update(
    id: number,
    usuario: UpdateUsuario,
    transaction?: Prisma.TransactionClient,
  ): Promise<Omit<Usuario, 'senha'>> {
    const userFormated = {
      ...usuario,
      nome: usuario.nome?.trim(),
      email: usuario.email?.trim(),
      senha: usuario.senha?.trim(),
    };
    return await this.usuarioModel.update(id, userFormated, transaction);
  }

  public async editStatus(
    id: number,
    status: boolean,
    transaction?: Prisma.TransactionClient,
  ): Promise<UsuarioResponse> {
    return await this.usuarioModel.editStatus(id, status, transaction);
  }
}
