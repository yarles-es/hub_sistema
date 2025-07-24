import { Mensalidade, PrismaClient, StatusMensalidade } from '@prisma/client';
import { Service } from 'typedi';
import { CreateMensalidade, UpdateMensalidade } from '../types/mensalidade.types';

@Service()
export class MensalidadeModel {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(mensalidade: CreateMensalidade): Promise<Mensalidade> {
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

  public async findByClienteIdAndStatus(
    clienteId: number,
    status: StatusMensalidade,
  ): Promise<Mensalidade[]> {
    return this.prisma.mensalidade.findMany({
      where: { clienteId, status },
    });
  }

  public async update(id: number, data: UpdateMensalidade): Promise<Mensalidade> {
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
