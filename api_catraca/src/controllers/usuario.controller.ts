import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { CreateUsuarioService } from '../services/usuario/create-usuario.service';
import { DisableUsuarioService } from '../services/usuario/disable-usuario.service';
import { FindUsuarioByEmailService } from '../services/usuario/find-usuario-by-email.service';
import { FindUsuarioByIdService } from '../services/usuario/find-usuario-by-id.service';
import { UpdateUsuarioService } from '../services/usuario/update-usuario.service';
import { CreateUsuario, UpdateUsuario } from '../types/usuario.types';

@Service()
export class UsuarioController {
  constructor(
    private readonly createUsuarioService: CreateUsuarioService,
    private readonly findUsuarioByIdService: FindUsuarioByIdService,
    private readonly findUsuarioByEmailService: FindUsuarioByEmailService,
    private readonly updateUsuarioService: UpdateUsuarioService,
    private readonly disableUsuarioService: DisableUsuarioService,
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const usuario = await this.createUsuarioService.execute(req.body as CreateUsuario);
      res.status(201).json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const usuario = await this.findUsuarioByIdService.execute(Number(req.params.id));
      res.status(200).json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async getByEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const usuario = await this.findUsuarioByEmailService.execute(req.params.email as string);
      res.status(200).json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updatedUsuario = await this.updateUsuarioService.execute(
        Number(req.params.id),
        req.body as UpdateUsuario,
      );
      res.status(200).json(updatedUsuario);
    } catch (error) {
      next(error);
    }
  }

  async disable(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.disableUsuarioService.execute(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
