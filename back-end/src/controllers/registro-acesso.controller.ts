import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { GetAllRegistroAcessoService } from '../services/registro-acesso/get-all-registro-acesso.service';

@Service()
export class RegistroAcessoController {
  constructor(private readonly getAllRegistroAcessoService: GetAllRegistroAcessoService) {}

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const registros = await this.getAllRegistroAcessoService.execute();
      res.status(200).json(registros);
    } catch (error) {
      next(error);
    }
  }
}
