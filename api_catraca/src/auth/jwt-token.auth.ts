import * as jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { PayloadUserJWT } from './types/jwt.types';

export class JwtToken<T> {
  private secret: string;
  private jwtConfig: jwt.SignOptions;

  constructor() {
    this.jwtConfig = {
      algorithm: 'HS256',
      expiresIn: '2h',
    };
    this.secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'ACADEMIA_SECRET';
  }

  public createTokenUser(userData: T): string {
    const token = jwt.sign({ data: userData }, this.secret, this.jwtConfig);
    return token;
  }

  public verifyToken(token: string): PayloadUserJWT<T> {
    try {
      return jwt.verify(token, this.secret) as PayloadUserJWT<T>;
    } catch (error) {
      throw new UnauthorizedError('Invalid token');
    }
  }

  public decodeToken(token: string): PayloadUserJWT<T> {
    const result = jwt.decode(token);
    if (!result) throw new UnauthorizedError('Invalid token');
    return result as PayloadUserJWT<T>;
  }
}
