import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { setAuthHeaders } from '../auth/headers.auth';
import { LoginService } from '../services/login/login.service';

@Service()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req.body;
      const token = this.loginService.login(user);
      console.log('token login', token);
      setAuthHeaders(res, token);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}
