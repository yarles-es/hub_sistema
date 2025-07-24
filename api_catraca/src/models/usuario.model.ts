import { PrismaClient, Usuario } from '@prisma/client';
import { Service } from 'typedi';
import { CreateUsuario, UpdateUsuario, UsuarioResponse } from '../types/usuario.types';
import { generateHashBcrypt } from '../utils/bcrypt';

@Service()
export class UsuarioModel {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(usuario: CreateUsuario): Promise<UsuarioResponse> {
    const user = await this.prisma.usuario.create({
      data: { ...usuario, senha: await generateHashBcrypt(usuario.senha) },
    });

    const { senha, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  public async findByEmail(email: string): Promise<UsuarioResponse | null> {
    const user = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) return null;
    const { senha, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  public async findByEmailWithPassword(email: string): Promise<Usuario | null> {
    return await this.prisma.usuario.findUnique({
      where: { email },
    });
  }

  public async findById(id: number): Promise<UsuarioResponse | null> {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
    });

    if (!user) return null;

    const { senha, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  public async update(id: number, usuario: UpdateUsuario): Promise<UsuarioResponse> {
    if (usuario.senha) usuario.senha = await generateHashBcrypt(usuario.senha);

    const user = await this.prisma.usuario.update({
      where: { id },
      data: usuario,
    });
    const { senha, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  public async disable(id: number): Promise<UsuarioResponse> {
    const user = await this.prisma.usuario.update({
      where: { id },
      data: { ativo: false },
    });

    const { senha, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
