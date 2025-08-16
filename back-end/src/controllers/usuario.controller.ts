import { NextFunction, Response } from 'express';
import { Service } from 'typedi';
import { CreateUsuarioService } from '../services/usuario/create-usuario.service';
import { EditStatusUsuarioService } from '../services/usuario/disable-usuario.service';
import { GetAllUsuarioService } from '../services/usuario/get-all-usuario.service';
import { GetUsuarioByEmailService } from '../services/usuario/get-usuario-by-email.service';
import { GetUsuarioByIdService } from '../services/usuario/get-usuario-by-id.service';
import { UpdateUsuarioService } from '../services/usuario/update-usuario.service';
import { CreateUsuario, UpdateUsuario } from '../types/usuario.types';
import { CreateLogService } from '../services/log-sistema/create-log.service';
import { AuthenticatedRequest } from '../types/Request.types';

@Service()
export class UsuarioController {
  constructor(
    private readonly createUsuarioService: CreateUsuarioService,
    private readonly getUsuarioByIdService: GetUsuarioByIdService,
    private readonly getUsuarioByEmailService: GetUsuarioByEmailService,
    private readonly updateUsuarioService: UpdateUsuarioService,
    private readonly editStatusUsuarioService: EditStatusUsuarioService,
    private readonly getAllUsuarioService: GetAllUsuarioService,
    private readonly log: CreateLogService,
  ) {}

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user!;

      const usuario = await this.createUsuarioService.execute(req.body as CreateUsuario);

      await this.log.execute(user.id, `Criou usuário id: ${usuario.id}`);

      res.status(201).json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const usuarios = await this.getAllUsuarioService.execute();

      res.status(200).json(usuarios);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user!;

      const usuario = await this.getUsuarioByIdService.execute(Number(req.params.id));

      await this.log.execute(user.id, `Consultou usuário id: ${usuario.id}`);

      res.status(200).json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async getByEmail(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user!;

      const usuario = await this.getUsuarioByEmailService.execute(req.params.email as string);

      await this.log.execute(user.id, `Consultou usuário email: ${req.params.email}`);

      res.status(200).json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user!;

      const updatedUsuario = await this.updateUsuarioService.execute(
        Number(req.params.id),
        req.body as UpdateUsuario,
      );

      await this.log.execute(user.id, `Atualizou usuário id: ${updatedUsuario.id}`);

      res.status(200).json(updatedUsuario);
    } catch (error) {
      next(error);
    }
  }

  async editStatus(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user!;

      await this.editStatusUsuarioService.execute(Number(req.params.id), req.body.status as boolean);

      await this.log.execute(user.id, `Atualizou status do usuário id: ${req.params.id}`);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
