import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { BadRequestError } from '../errors/BadRequestError';
import { UsuarioService } from '../services/usuario/@usuario.service';
import { compareHashBcrypt } from '../utils/bcrypt';

@Service()
export class LoginMiddleware {
  constructor(private readonly usuarioService: UsuarioService) {}

  async execute(req: Request, _res: Response, next: NextFunction) {
    try {
      const { login, password } = this.validate(req);

      const user = await this.usuarioService.findByEmail(login.toLowerCase());

      if (!user) {
        throw new BadRequestError('Usuário ou senha inválida');
      }

      if (!(await compareHashBcrypt(password, user.senha))) {
        throw new BadRequestError('Usuário ou senha inválida');
      }

      const { senha, ...userWithoutPassword } = user;

      req.body.user = userWithoutPassword;

      next();
    } catch (error) {
      next(error);
    }
  }

  private validate(req: Request): { login: string; password: string } {
    const { login, password } = req.body;
    if (!login || !password) {
      throw new BadRequestError('Login and password are required');
    }
    return { login, password };
  }
}
