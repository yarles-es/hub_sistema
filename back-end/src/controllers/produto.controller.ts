import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';
import { CreateProduto, UpdateProduto } from '../types/produto.types';
import { CreateProdutoService } from '../services/produto/create-produto.service';
import { GetAllProdutosService } from '../services/produto/get-all-produtos.service';
import { GetProdutoByIdService } from '../services/produto/get-produto-by-id.service';
import { UpdateProdutoService } from '../services/produto/update-produto.service';
import { CreateLogService } from '../services/log-sistema/create-log.service';
import { AuthenticatedRequest } from '../types/Request.types';

@Service()
export class ProdutoController {
  constructor(
    private createProdutoService: CreateProdutoService,
    private getAllProdutosService: GetAllProdutosService,
    private getProdutoByIdService: GetProdutoByIdService,
    private updateProdutoService: UpdateProdutoService,
    private readonly log: CreateLogService,
  ) {}

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const data: CreateProduto = req.body;
      const produto = await this.createProdutoService.execute(data);
      await this.log.execute(user.id, `Criou produto ${produto.nome}`);
      res.status(201).json(produto);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const ativo = req.query.ativo === 'false' ? false : true;
      const produtos = await this.getAllProdutosService.execute(ativo);
      res.status(200).json(produtos);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10);
      const produto = await this.getProdutoByIdService.execute(id);
      res.status(200).json(produto);
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const id = parseInt(req.params.id, 10);
      const data: UpdateProduto = req.body;
      const produto = await this.updateProdutoService.execute(id, data);
      await this.log.execute(user.id, `Atualizou produto ${produto.nome}`);
      res.status(200).json(produto);
    } catch (error) {
      next(error);
    }
  }
}
