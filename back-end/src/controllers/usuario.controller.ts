import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { CreateUsuarioService } from '../services/usuario/create-usuario.service';
import { EditStatusUsuarioService } from '../services/usuario/disable-usuario.service';
import { GetAllUsuarioService } from '../services/usuario/get-all-usuario.service';
import { GetUsuarioByEmailService } from '../services/usuario/get-usuario-by-email.service';
import { GetUsuarioByIdService } from '../services/usuario/get-usuario-by-id.service';
import { UpdateUsuarioService } from '../services/usuario/update-usuario.service';
import { CreateUsuario, UpdateUsuario } from '../types/usuario.types';

@Service()
export class UsuarioController {
  constructor(
    private readonly createUsuarioService: CreateUsuarioService,
    private readonly getUsuarioByIdService: GetUsuarioByIdService,
    private readonly getUsuarioByEmailService: GetUsuarioByEmailService,
    private readonly updateUsuarioService: UpdateUsuarioService,
    private readonly editStatusUsuarioService: EditStatusUsuarioService,
    private readonly getAllUsuarioService: GetAllUsuarioService,
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const usuario = await this.createUsuarioService.execute(req.body as CreateUsuario);
      res.status(201).json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const usuarios = await this.getAllUsuarioService.execute();
      res.status(200).json(usuarios);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const usuario = await this.getUsuarioByIdService.execute(Number(req.params.id));
      res.status(200).json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async getByEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const usuario = await this.getUsuarioByEmailService.execute(req.params.email as string);
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

  async editStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.editStatusUsuarioService.execute(Number(req.params.id), req.body.status as boolean);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
