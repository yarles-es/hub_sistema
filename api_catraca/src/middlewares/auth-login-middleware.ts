import { NextFunction, Request, Response } from 'express';

import { Usuario } from '@prisma/client';
import jwt from 'jsonwebtoken';

type UserWithLogin = Omit<Usuario, 'senha' | 'createdAt' | 'updatedAt'>;

interface AuthenticatedRequest extends Request {
  user?: UserWithLogin;
}

const PUBLIC_KEY = process.env.KEY_ACADEMIA || 'ACADEMIA_SECRET';

export function validateJWT(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, PUBLIC_KEY, { algorithms: ['HS256'] }, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido ou expirado' });
    }

    if (typeof decoded === 'object' && decoded.data !== null && 'login' in decoded.data) {
      req.user = decoded.data as UserWithLogin;
      next();
    } else {
      return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
  });
}
