import { Prisma, PrismaClient, Usuario } from '@prisma/client';
import { Service } from 'typedi';
import { CreateUsuario, UpdateUsuario, UsuarioResponse } from '../types/usuario.types';
import { generateHashBcrypt } from '../utils/bcrypt';

@Service()
export class UsuarioModel {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(
    usuario: CreateUsuario,
    transaction?: Prisma.TransactionClient,
  ): Promise<UsuarioResponse> {
    const client = transaction || this.prisma;
    const user = await client.usuario.create({
      data: { ...usuario, senha: await generateHashBcrypt(usuario.senha) },
    });

    const { senha, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  public async findAll(transaction?: Prisma.TransactionClient): Promise<UsuarioResponse[]> {
    const client = transaction || this.prisma;
    const users = await client.usuario.findMany({
      orderBy: { id: 'desc' },
    });
    return users.map((user) => {
      const { senha, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  public async findByEmail(
    email: string,
    transaction?: Prisma.TransactionClient,
  ): Promise<UsuarioResponse | null> {
    const client = transaction || this.prisma;
    const user = await client.usuario.findUnique({
      where: { email },
    });

    if (!user) return null;
    const { senha, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  public async findByEmailWithPassword(
    email: string,
    transaction?: Prisma.TransactionClient,
  ): Promise<Usuario | null> {
    const client = transaction || this.prisma;
    return await client.usuario.findUnique({
      where: { email },
    });
  }

  public async findById(id: number, transaction?: Prisma.TransactionClient): Promise<UsuarioResponse | null> {
    const client = transaction || this.prisma;
    const user = await client.usuario.findUnique({
      where: { id },
    });

    if (!user) return null;

    const { senha, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  public async update(
    id: number,
    usuario: UpdateUsuario,
    transaction?: Prisma.TransactionClient,
  ): Promise<UsuarioResponse> {
    if (usuario.senha) usuario.senha = await generateHashBcrypt(usuario.senha);

    const client = transaction || this.prisma;
    const user = await client.usuario.update({
      where: { id },
      data: usuario,
    });
    const { senha, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  public async editStatus(
    id: number,
    status: boolean,
    transaction?: Prisma.TransactionClient,
  ): Promise<UsuarioResponse> {
    const client = transaction || this.prisma;
    const user = await client.usuario.update({
      where: { id },
      data: { ativo: status },
    });

    const { senha, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
