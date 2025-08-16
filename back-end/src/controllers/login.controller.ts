import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { setAuthHeaders } from '../auth/headers.auth';
import { LoginService } from '../services/login/login.service';
import { CreateLogService } from '../services/log-sistema/create-log.service';

@Service()
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly log: CreateLogService,
  ) {}

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req.body;

      const token = this.loginService.login(user);

      setAuthHeaders(res, token);

      await this.log.execute(user.id, 'Usuário logado');

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}
