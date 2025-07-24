import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { CreatePlanoService } from '../services/plano/create-plano.service';
import { DeletePlanoService } from '../services/plano/delete-plano.service';
import { GetAllPlanosService } from '../services/plano/get-all-planos.service';
import { GetPlanoByIdService } from '../services/plano/get-plano-bi-id.service';
import { UpdatePlanoService } from '../services/plano/update-plano.service';
import { CreatePlano, UpdatePlano } from '../types/plano.types';

@Service()
export class PlanoController {
  constructor(
    private readonly getPlanoByIdService: GetPlanoByIdService,
    private readonly updatePlanoService: UpdatePlanoService,
    private readonly deletePlanoService: DeletePlanoService,
    private readonly createPlanoService: CreatePlanoService,
    private readonly getAllPlanosService: GetAllPlanosService,
  ) {}

  async createPlano(req: Request, res: Response, next: NextFunction) {
    try {
      const plano = await this.createPlanoService.execute(req.body as CreatePlano);
      res.status(201).json(plano);
    } catch (error) {
      next(error);
    }
  }

  async getPlanoById(req: Request, res: Response, next: NextFunction) {
    try {
      const plano = await this.getPlanoByIdService.execute(Number(req.params.id));
      res.json(plano);
    } catch (error) {
      next(error);
    }
  }

  async updatePlano(req: Request, res: Response, next: NextFunction) {
    try {
      const plano = await this.updatePlanoService.execute(Number(req.params.id), req.body as UpdatePlano);
      res.json(plano);
    } catch (error) {
      next(error);
    }
  }

  async deletePlano(req: Request, res: Response, next: NextFunction) {
    try {
      const plano = await this.deletePlanoService.execute(Number(req.params.id));
      res.json(plano);
    } catch (error) {
      next(error);
    }
  }

  async getAllPlanos(req: Request, res: Response, next: NextFunction) {
    try {
      const planos = await this.getAllPlanosService.execute();
      res.json(planos);
    } catch (error) {
      next(error);
    }
  }
}
