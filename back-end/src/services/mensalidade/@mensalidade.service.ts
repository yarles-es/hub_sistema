import { Mensalidade, StatusMensalidade } from '@prisma/client';
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

  public async createMensalidade(mensalidade: CreateMensalidade): Promise<Mensalidade> {
    return await this.mensalidadeModel.create(mensalidade);
  }

  public async findMensalidadeById(id: number): Promise<Mensalidade | null> {
    return await this.mensalidadeModel.findById(id);
  }

  public async findMensalidadesByClienteId(clienteId: number): Promise<Mensalidade[]> {
    return await this.mensalidadeModel.findByClienteId(clienteId);
  }

  public async findMensalidadesByClienteIdAndStatus(
    clienteId: number,
    status: StatusMensalidade,
  ): Promise<Mensalidade[]> {
    return await this.mensalidadeModel.findByClienteIdAndStatus(clienteId, status);
  }

  public async updateMensalidade(id: number, data: UpdateMensalidade): Promise<Mensalidade> {
    return await this.mensalidadeModel.update(id, data);
  }

  public async deleteMensalidade(id: number): Promise<Mensalidade> {
    return await this.mensalidadeModel.delete(id);
  }

  public async findAllMensalidades(
    page: number,
    limit: number,
    filter?: MensalidadeFilter,
  ): Promise<MensalidadeResponseGetAll> {
    return await this.mensalidadeModel.findAll(page, limit, filter);
  }
}
