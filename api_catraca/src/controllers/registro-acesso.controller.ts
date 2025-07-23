import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { CreateRegistroAcessoService } from '../services/registro-acesso/create-registro-acesso.service';
import { FindAllRegistroAcessoService } from '../services/registro-acesso/find-all-registro-acesso.service';
import { FindRegistroAcessoByIdService } from '../services/registro-acesso/find-registro-acesso-by-id.service';

@Service()
export class RegistroAcessoController {
  constructor(
    private readonly createRegistroAcessoService: CreateRegistroAcessoService,
    private readonly findAllRegistroAcessoService: FindAllRegistroAcessoService,
    private readonly findRegistroAcessoByIdService: FindRegistroAcessoByIdService,
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const registro = await this.createRegistroAcessoService.execute(req.body);
      res.status(201).json(registro);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const registros = await this.findAllRegistroAcessoService.execute();
      res.status(200).json(registros);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const registro = await this.findRegistroAcessoByIdService.execute(Number(req.params.id));
      res.status(200).json(registro);
    } catch (error) {
      next(error);
    }
  }
}
