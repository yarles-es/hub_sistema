import { NextFunction, Response } from 'express';
import { Service } from 'typedi';
import { CreatePlanoService } from '../services/plano/create-plano.service';
import { DeletePlanoService } from '../services/plano/delete-plano.service';
import { GetAllPlanosService } from '../services/plano/get-all-planos.service';
import { GetPlanoByIdService } from '../services/plano/get-plano-bi-id.service';
import { UpdatePlanoService } from '../services/plano/update-plano.service';
import { CreatePlano, UpdatePlano } from '../types/plano.types';
import { CreateLogService } from '../services/log-sistema/create-log.service';
import { AuthenticatedRequest } from '../types/Request.types';

@Service()
export class PlanoController {
  constructor(
    private readonly getPlanoByIdService: GetPlanoByIdService,
    private readonly updatePlanoService: UpdatePlanoService,
    private readonly deletePlanoService: DeletePlanoService,
    private readonly createPlanoService: CreatePlanoService,
    private readonly getAllPlanosService: GetAllPlanosService,
    private readonly log: CreateLogService,
  ) {}

  async createPlano(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user!;

      const plano = await this.createPlanoService.execute(req.body as CreatePlano);

      await this.log.execute(user.id, `Criou plano id: ${plano.id}`);

      res.status(201).json(plano);
    } catch (error) {
      next(error);
    }
  }

  async getPlanoById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user!;

      const plano = await this.getPlanoByIdService.execute(Number(req.params.id));

      if (plano) await this.log.execute(user.id, `Consultou plano id: ${plano.id}`);

      res.status(200).json(plano);
    } catch (error) {
      next(error);
    }
  }

  async updatePlano(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user!;

      const plano = await this.updatePlanoService.execute(Number(req.params.id), req.body as UpdatePlano);

      if (plano) await this.log.execute(user.id, `Atualizou plano id: ${plano.id}`);

      res.status(200).json(plano);
    } catch (error) {
      next(error);
    }
  }

  async deletePlano(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user!;

      const plano = await this.deletePlanoService.execute(Number(req.params.id));

      if (plano) await this.log.execute(user.id, `Deletou plano id: ${plano.id}`);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getAllPlanos(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const planos = await this.getAllPlanosService.execute();

      res.status(200).json(planos);
    } catch (error) {
      next(error);
    }
  }
}
