import { Mensalidade, Prisma, StatusMensalidade } from '@prisma/client';
import { Service } from 'typedi';
import { MensalidadeModel } from '../../models/mensalidade.model';
import {
  CreateMensalidade,
  MensalidadeFilter,
  MensalidadeResponseGetAll,
  UpdateMensalidade,
} from '../../types/mensalidade.types';

@Service()
export class MensalidadeService {
  constructor(private mensalidadeModel: MensalidadeModel) {}

  public async createMensalidade(
    mensalidade: CreateMensalidade,
    transaction?: Prisma.TransactionClient,
  ): Promise<Mensalidade> {
    return await this.mensalidadeModel.create(mensalidade, transaction);
  }

  public async findMensalidadeById(
    id: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<Mensalidade | null> {
    return await this.mensalidadeModel.findById(id, transaction);
  }

  public async findMensalidadesByClienteId(
    clienteId: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<Mensalidade[]> {
    return await this.mensalidadeModel.findByClienteId(clienteId, transaction);
  }

  public async findMensalidadesByClienteIdAndStatus(
    clienteId: number,
    status: StatusMensalidade,
    transaction?: Prisma.TransactionClient,
  ): Promise<Mensalidade[]> {
    return await this.mensalidadeModel.findByClienteIdAndStatus(clienteId, status, transaction);
  }

  public async updateMensalidade(
    id: number,
    data: UpdateMensalidade,
    transaction?: Prisma.TransactionClient,
  ): Promise<Mensalidade> {
    return await this.mensalidadeModel.update(id, data, transaction);
  }

  public async deleteMensalidade(id: number, transaction?: Prisma.TransactionClient): Promise<Mensalidade> {
    return await this.mensalidadeModel.delete(id, transaction);
  }

  public async findAllMensalidades(
    page: number,
    limit: number,
    filter?: MensalidadeFilter,
    transaction?: Prisma.TransactionClient,
  ): Promise<MensalidadeResponseGetAll> {
    return await this.mensalidadeModel.findAll(page, limit, filter, transaction);
  }
}
