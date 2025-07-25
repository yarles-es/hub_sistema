import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { FindAllRegistroAcessoService } from '../services/registro-acesso/find-all-registro-acesso.service';

@Service()
export class RegistroAcessoController {
  constructor(private readonly findAllRegistroAcessoService: FindAllRegistroAcessoService) {}

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const registros = await this.findAllRegistroAcessoService.execute();
      res.status(200).json(registros);
    } catch (error) {
      next(error);
    }
  }
}
