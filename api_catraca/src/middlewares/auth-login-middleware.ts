import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';
import { JwtToken } from '../auth/jwt-token.auth';

import { Usuario } from '@prisma/client';
import { UnauthorizedError } from '../errors/UnauthorizedError';

type UserWithLogin = Omit<Usuario, 'senha' | 'createdAt' | 'updatedAt'>;

interface AuthenticatedRequest extends Request {
  user?: UserWithLogin;
}

const jwt = Container.get(JwtToken<UserWithLogin>);

export function validateJWT(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  const user = jwt.verifyToken(token).data;

  if (!user) {
    throw new UnauthorizedError('Token inválido ou expirado');
  }
  req.user = user;

  next();
}
