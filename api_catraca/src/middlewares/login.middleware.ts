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
      const { login, senha } = this.validate(req);

      const user = await this.usuarioService.findByEmailWithPassword(login.toLowerCase());

      if (!user) {
        throw new BadRequestError('Usuário ou senha inválida');
      }

      if (!(await compareHashBcrypt(senha, user.senha))) {
        throw new BadRequestError('Usuário ou senha inválida');
      }

      const { senha: senhaHash, createdAt, updatedAt, ...userWithoutPassword } = user;

      req.body.user = userWithoutPassword;

      next();
    } catch (error) {
      next(error);
    }
  }

  private validate(req: Request): { login: string; senha: string } {
    const { login, senha } = req.body;
    if (!login || !senha) {
      throw new BadRequestError('Login e senha são obrigatórios');
    }
    return { login, senha };
  }
}
