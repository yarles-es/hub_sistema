import { Plano, PrismaClient } from '@prisma/client';
import { Service } from 'typedi';

@Service()
export class PlanoModel {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: Omit<Plano, 'id' | 'createdAt' | 'updatedAt'>): Promise<Plano> {
    return this.prisma.plano.create({
      data,
    });
  }

  async findById(id: number): Promise<Plano | null> {
    return this.prisma.plano.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Partial<Plano>): Promise<Plano> {
    return this.prisma.plano.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Plano> {
    return this.prisma.plano.delete({
      where: { id },
    });
  }

  async findAll(): Promise<Plano[]> {
    return this.prisma.plano.findMany();
  }
}
