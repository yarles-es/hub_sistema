import { Cliente, Prisma } from '@prisma/client';
import { Service } from 'typedi';
import { ClienteModel } from '../../models/cliente.model';
import {
  ClienteFilter,
  ClienteGetAllWithMensalidade,
  ClientResponseGetAllModel,
  CountTypeClientes,
  CreateCliente,
  UpdateClient,
} from '../../types/cliente.types';

@Service()
export class ClienteService {
  constructor(private readonly clienteModel: ClienteModel) {}

  async createCliente(data: CreateCliente, transaction?: Prisma.TransactionClient): Promise<Cliente> {
    const formatedData: CreateCliente = {
      ...data,
      nome: data.nome.trim().toUpperCase(),
      email: data.email.trim().toLowerCase(),
      telefone: data.telefone ? data.telefone.trim() : null,
    };

    return this.clienteModel.create(formatedData, transaction);
  }

  async getClienteById(id: number, transaction?: Prisma.TransactionClient): Promise<Cliente | null> {
    return this.clienteModel.findById(id, transaction);
  }

  async getClienteByEmail(email: string, transaction?: Prisma.TransactionClient): Promise<Cliente | null> {
    return this.clienteModel.findByEmail(email, transaction);
  }

  async updateCliente(
    id: number,
    data: UpdateClient,
    transaction?: Prisma.TransactionClient,
  ): Promise<Cliente> {
    return this.clienteModel.update(id, data, transaction);
  }

  async deleteCliente(id: number, transaction?: Prisma.TransactionClient): Promise<Cliente> {
    return this.clienteModel.delete(id, transaction);
  }

  async getAllClientesFiltered(
    page: number,
    limit: number,
    filter?: ClienteFilter,
    transaction?: Prisma.TransactionClient,
  ): Promise<ClientResponseGetAllModel> {
    return this.clienteModel.findAllFiltered(page, limit, filter, transaction);
  }

  async countTypeClientes(transaction?: Prisma.TransactionClient): Promise<CountTypeClientes> {
    return this.clienteModel.countTypeClientes(transaction);
  }

  async findAllClientesByName(
    name: string,
    transaction?: Prisma.TransactionClient,
  ): Promise<ClienteGetAllWithMensalidade[]> {
    return this.clienteModel.findAllByName(name, transaction);
  }

  async getAllClientesWithMensalidadeByPlanId(
    planoId: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<ClienteGetAllWithMensalidade[]> {
    return this.clienteModel.getAllWithMensalidadeByPlanId(planoId, transaction);
  }

  async findByIdRegistro(
    idRegistro: number,
    transaction?: Prisma.TransactionClient,
  ): Promise<ClienteGetAllWithMensalidade | null> {
    return this.clienteModel.findByIdRegistro(idRegistro, transaction);
  }

  async findByDataNascimento(
    dataNascimento: string,
    transaction?: Prisma.TransactionClient,
  ): Promise<ClienteGetAllWithMensalidade | null> {
    return this.clienteModel.findByDataNascimento(dataNascimento, transaction);
  }

  async findByBirthdayPeopleMonth(
    transaction?: Prisma.TransactionClient,
  ): Promise<ClienteGetAllWithMensalidade[]> {
    return this.clienteModel.findByBirthdayPeopleMonth(transaction);
  }
}
