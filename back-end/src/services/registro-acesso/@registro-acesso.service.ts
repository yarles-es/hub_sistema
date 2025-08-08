import { Prisma, RegistroAcesso } from '@prisma/client';
import { Service } from 'typedi';
import { RegistroAcessoModel } from '../../models/registro-acesso.model';
import { CreateRegistroAcesso } from '../../types/registro-acesso.types';

@Service()
export class RegistroAcessoService {
  constructor(private readonly registroAcessoModel: RegistroAcessoModel) {}

  public async createRegistroAcesso(
    registro: CreateRegistroAcesso,
    transaction?: Prisma.TransactionClient,
  ): Promise<RegistroAcesso> {
    return await this.registroAcessoModel.create(registro, transaction);
  }

  public async findAllRegistrosAcesso(transaction?: Prisma.TransactionClient): Promise<RegistroAcesso[]> {
    return await this.registroAcessoModel.findAll(transaction);
  }

  public async findAllRegistrosByClienteId(
    clienteId: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<RegistroAcesso[]> {
    return await this.registroAcessoModel.findAllByClienteId(clienteId, transaction);
  }
}
