import { Mensalidade, PrismaClient } from '@prisma/client';
import { Service } from 'typedi';

@Service()
export class MensalidadeModel {
  constructor(private prisma: PrismaClient) {}

  public async create(
    mensalidade: Omit<Mensalidade, 'id' | 'createdAt' | 'updatedAt' | 'status'>,
  ): Promise<Mensalidade> {
    return this.prisma.mensalidade.create({
      data: { ...mensalidade },
    });
  }

  public async findById(id: number): Promise<Mensalidade | null> {
    return this.prisma.mensalidade.findUnique({
      where: { id },
    });
  }

  public async findByClienteId(clienteId: number): Promise<Mensalidade[]> {
    return this.prisma.mensalidade.findMany({
      where: { clienteId },
    });
  }

  public async update(
    id: number,
    data: Partial<Omit<Mensalidade, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Mensalidade> {
    return this.prisma.mensalidade.update({
      where: { id },
      data: { ...data },
    });
  }

  public async delete(id: number): Promise<Mensalidade> {
    return this.prisma.mensalidade.delete({
      where: { id },
    });
  }
}
