import { Prisma, PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { CreateCadastroBiometria, UpdateCadastroBiometria } from '../types/cadastro-biometria.types';

@Service()
export class CadastroBiometriaModel {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: CreateCadastroBiometria, transaction?: Prisma.TransactionClient) {
    const prisma = transaction || this.prisma;
    return prisma.cadastroBiometria.create({
      data: {
        clienteId: data.clienteId,
        idCatraca: data.idCatraca,
      },
    });
  }

  async findFirst(transaction?: Prisma.TransactionClient) {
    const prisma = transaction || this.prisma;
    return prisma.cadastroBiometria.findFirst();
  }

  async update(id: number, data: UpdateCadastroBiometria, transaction?: Prisma.TransactionClient) {
    const prisma = transaction || this.prisma;
    await prisma.cadastroBiometria.update({
      where: { id },
      data,
    });
  }

  async delete(id: number, transaction?: Prisma.TransactionClient) {
    const prisma = transaction || this.prisma;
    await prisma.cadastroBiometria.delete({
      where: { id },
    });
  }
}
