import { PrismaClient, Usuario } from '@prisma/client';
import { Service } from 'typedi';
import { generateHashBcrypt } from '../utils/bcrypt';

@Service()
export class UsuarioModel {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(usuario: Omit<Usuario, 'id' | 'createdAt' | 'updatedAt' | 'ativo'>): Promise<Usuario> {
    return this.prisma.usuario.create({
      data: { ...usuario, senha: await generateHashBcrypt(usuario.senha) },
    });
  }

  public async findByEmail(email: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { email },
    });
  }

  public async findById(id: number): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { id },
    });
  }

  public async update(
    id: number,
    usuario: Partial<Omit<Usuario, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Usuario> {
    if (usuario.senha) usuario.senha = await generateHashBcrypt(usuario.senha);

    return this.prisma.usuario.update({
      where: { id },
      data: usuario,
    });
  }

  public async disable(id: number): Promise<Usuario> {
    return this.prisma.usuario.update({
      where: { id },
      data: { ativo: false },
    });
  }
}
