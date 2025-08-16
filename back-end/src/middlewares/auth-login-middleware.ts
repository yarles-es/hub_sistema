import { NextFunction, Response } from 'express';
import Container from 'typedi';
import { JwtToken } from '../auth/jwt-token.auth';

import { UnauthorizedError } from '../errors/UnauthorizedError';
import { UserWithLogin } from '../types/usuario.types';
import { AuthenticatedRequest } from '../types/Request.types';

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
