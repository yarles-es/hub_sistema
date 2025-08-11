import { Prisma } from '@prisma/client';
import { Service } from 'typedi';
import { CadastroBiometriaModel } from '../../models/cadastro-biometria.model';
import {
  CreateCadastroBiometria,
  GetCadastroBiometria,
  UpdateCadastroBiometria,
} from '../../types/cadastro-biometria.types';

@Service()
export class CadastroBiometriaService {
  constructor(private readonly cadastroBiometriaModel: CadastroBiometriaModel) {}

  async create(data: CreateCadastroBiometria, transaction?: Prisma.TransactionClient) {
    return await this.cadastroBiometriaModel.create(data, transaction);
  }

  async findFirst(transaction?: Prisma.TransactionClient): Promise<GetCadastroBiometria | null> {
    return await this.cadastroBiometriaModel.findFirst(transaction);
  }

  async update(id: number, data: UpdateCadastroBiometria, transaction?: Prisma.TransactionClient) {
    return await this.cadastroBiometriaModel.update(id, data, transaction);
  }

  async delete(id: number, transaction?: Prisma.TransactionClient) {
    return await this.cadastroBiometriaModel.delete(id, transaction);
  }
}
