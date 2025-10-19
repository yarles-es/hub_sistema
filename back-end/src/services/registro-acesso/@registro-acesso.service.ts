import { Prisma, RegistroAcesso } from '@prisma/client';
import { Service } from 'typedi';
import { RegistroAcessoModel } from '../../models/registro-acesso.model';
import {
  CreateRegistroAcesso,
  GetAllRegistroAcessoResponse,
  RegistroAcessoFilter,
} from '../../types/registro-acesso.types';

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

  public async findAllRegistrosByFilter(
    filter: RegistroAcessoFilter,
    transaction?: Prisma.TransactionClient,
  ): Promise<GetAllRegistroAcessoResponse> {
    return await this.registroAcessoModel.findAllByFilter(filter, transaction);
  }

  public async findAllRegistrosForDay(
    id?: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<RegistroAcesso[]> {
    return await this.registroAcessoModel.findAllForDay(id, transaction);
  }

  public async findAllRegistrosByClienteId(
    clienteId: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<RegistroAcesso[]> {
    return await this.registroAcessoModel.findAllByClienteId(clienteId, transaction);
  }
}
