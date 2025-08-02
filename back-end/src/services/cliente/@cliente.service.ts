import { Cliente } from '@prisma/client';
import { Service } from 'typedi';
import { ClienteModel } from '../../models/cliente.model';
import {
  ClienteFilter,
  ClienteGetAllWithMensalidade,
  ClientResponseGetAllModel,
  CreateCliente,
  UpdateClient,
} from '../../types/cliente.types';

@Service()
export class ClienteService {
  constructor(private readonly clienteModel: ClienteModel) {}

  async createCliente(data: CreateCliente): Promise<Cliente> {
    const formatedData: CreateCliente = {
      ...data,
      nome: data.nome.trim().toUpperCase(),
      email: data.email.trim().toLowerCase(),
      telefone: data.telefone ? data.telefone.trim() : null,
    };

    return this.clienteModel.create(formatedData);
  }

  async getClienteById(id: number): Promise<Cliente | null> {
    return this.clienteModel.findById(id);
  }

  async getClienteByEmail(email: string): Promise<Cliente | null> {
    return this.clienteModel.findByEmail(email);
  }

  async updateCliente(id: number, data: UpdateClient): Promise<Cliente> {
    return this.clienteModel.update(id, data);
  }

  async deleteCliente(id: number): Promise<Cliente> {
    return this.clienteModel.delete(id);
  }

  async getAllClientes(
    page: number,
    limit: number,
    dates: { dataInicialMensalidade?: Date; dataFinalMensalidade?: Date },
    filter?: ClienteFilter,
  ): Promise<ClientResponseGetAllModel> {
    return this.clienteModel.findAll(page, limit, dates, filter);
  }

  async findAllClientesByName(name: string): Promise<ClienteGetAllWithMensalidade[]> {
    return this.clienteModel.findAllByName(name);
  }
}
