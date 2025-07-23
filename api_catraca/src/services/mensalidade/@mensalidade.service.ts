import { Mensalidade } from '@prisma/client';
import { Service } from 'typedi';
import { MensalidadeModel } from '../../models/mensalidade.model';

@Service()
export class MensalidadeService {
  constructor(private mensalidadeModel: MensalidadeModel) {}

  public async createMensalidade(
    mensalidade: Omit<Mensalidade, 'id' | 'createdAt' | 'updatedAt' | 'status'>,
  ): Promise<Mensalidade> {
    return await this.mensalidadeModel.create(mensalidade);
  }

  public async findMensalidadeById(id: number): Promise<Mensalidade | null> {
    return await this.mensalidadeModel.findById(id);
  }

  public async findMensalidadesByClienteId(clienteId: number): Promise<Mensalidade[]> {
    return await this.mensalidadeModel.findByClienteId(clienteId);
  }

  public async updateMensalidade(
    id: number,
    data: Partial<Pick<Mensalidade, 'formaPagamento' | 'status'>>,
  ): Promise<Mensalidade> {
    return await this.mensalidadeModel.update(id, data);
  }

  public async deleteMensalidade(id: number): Promise<Mensalidade> {
    return await this.mensalidadeModel.delete(id);
  }
}
