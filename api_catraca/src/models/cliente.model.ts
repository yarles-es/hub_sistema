import { Cliente, PrismaClient } from '@prisma/client';
import { Service } from 'typedi';

@Service()
export class ClienteModel {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(cliente: Omit<Cliente, 'id' | 'createdAt' | 'updatedAt'>): Promise<Cliente> {
    return this.prisma.cliente.create({
      data: { ...cliente },
    });
  }

  public async findById(id: number): Promise<Cliente | null> {
    return this.prisma.cliente.findUnique({
      where: { id },
    });
  }

  public async findByEmail(email: string): Promise<Cliente | null> {
    return this.prisma.cliente.findUnique({
      where: { email },
    });
  }

  public async update(
    id: number,
    data: Partial<Omit<Cliente, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Cliente> {
    return this.prisma.cliente.update({
      where: { id },
      data: { ...data },
    });
  }

  public async delete(id: number): Promise<Cliente> {
    return this.prisma.cliente.delete({
      where: { id },
    });
  }
}
