import { Service } from 'typedi';
import { VendaProdutoModel } from '../../models/venda-produtos.model';
import {
  CreateVendaProduto,
  CreateVendaProdutoModel,
  CreateVendaProdutoResponse,
  DeleteVendaProdutoResponse,
  GetAllVendaProdutoResponse,
  GetVendaProdutoByIdResponse,
  UpdateVendaProduto,
  UpdateVendaProdutoResponse,
} from '../../types/venda-produto.types';

@Service()
export class VendaProdutoService {
  constructor(private readonly vendaProdutoModel: VendaProdutoModel) {}

  async create(data: CreateVendaProdutoModel): Promise<CreateVendaProdutoResponse> {
    return await this.vendaProdutoModel.create(data);
  }

  async getById(id: number): Promise<GetVendaProdutoByIdResponse | null> {
    return await this.vendaProdutoModel.getById(id);
  }

  async getAll(): Promise<GetAllVendaProdutoResponse> {
    return await this.vendaProdutoModel.getAll();
  }

  async deleteById(id: number): Promise<DeleteVendaProdutoResponse> {
    return await this.vendaProdutoModel.deleteById(id);
  }

  async update(data: UpdateVendaProduto): Promise<UpdateVendaProdutoResponse> {
    return await this.vendaProdutoModel.update(data);
  }
}
