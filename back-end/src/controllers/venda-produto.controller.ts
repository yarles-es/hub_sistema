import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/Request.types';
import { Service } from 'typedi';
import { CreateVendaProdutoService } from '../services/venda-produto/create-venda-produto.service';
import { DeleteVendaProdutoByIdService } from '../services/venda-produto/delete-venda-produto-by-id.service';
import { GetAllVendaProdutoService } from '../services/venda-produto/get-all-venda-produto.service';
import { GetByIdVendaProdutoService } from '../services/venda-produto/get-by-id-venda-produto.service';
import { CreateLogService } from '../services/log-sistema/create-log.service';
import { GetVendaProdutosByProdutoIdService } from '../services/venda-produto/get-venda-produtos-by-produto-id.service';
import { safeParseInt } from '../utils/safeTypes';
import { buildUtcRange } from '../utils/date-range';

@Service()
export class VendaProdutoController {
  constructor(
    private readonly createVendaProdutoService: CreateVendaProdutoService,
    private readonly deleteVendaProdutoService: DeleteVendaProdutoByIdService,
    private readonly getAllVendaProdutoService: GetAllVendaProdutoService,
    private readonly getByIdVendaProdutoService: GetByIdVendaProdutoService,
    private readonly getVendaProdutosByProdutoIdService: GetVendaProdutosByProdutoIdService,
    private readonly log: CreateLogService,
  ) {}

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user!;
      const vendaProduto = await this.createVendaProdutoService.execute(req.body);
      await this.log.execute(user.id, `Criou uma venda de produto com ID ${vendaProduto.id}`);
      res.status(201).json(vendaProduto);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user!;
      const { id } = req.params;
      const response = await this.deleteVendaProdutoService.execute(Number(id));
      await this.log.execute(user.id, `Deletou uma venda de produto com ID ${id}`);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { numberPage, limit, initialDate, finalDate, productId } = req.query;

      console.log({ numberPage, limit, initialDate, finalDate, productId });

      const pageNumber = safeParseInt(numberPage) || 1;
      const limitNumber = safeParseInt(limit) || 30;
      const productIdNumber = safeParseInt(productId);

      const { startAtUtc, endAtUtc } = buildUtcRange(
        initialDate as string | undefined,
        finalDate as string | undefined,
      );

      const vendaProdutos = await this.getAllVendaProdutoService.execute(pageNumber, limitNumber, {
        productId: productIdNumber,
        initialDate: startAtUtc,
        finalDate: endAtUtc,
      });

      res.status(200).json(vendaProdutos);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const vendaProduto = await this.getByIdVendaProdutoService.execute(Number(id));
      res.status(200).json(vendaProduto);
    } catch (error) {
      next(error);
    }
  }

  async getByProdutoId(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { produtoId } = req.params;
      const vendaProdutos = await this.getVendaProdutosByProdutoIdService.execute(Number(produtoId));
      res.status(200).json(vendaProdutos);
    } catch (error) {
      next(error);
    }
  }
}
