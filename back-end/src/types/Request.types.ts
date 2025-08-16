import { Request } from 'express';
import { UserWithLogin } from './usuario.types';

export interface AuthenticatedRequest extends Request {
  user?: UserWithLogin;
}
