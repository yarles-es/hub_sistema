import { Usuario } from '@prisma/client';
import { Service } from 'typedi';
import { JwtToken } from '../../auth/jwt-token.auth';

@Service()
export class LoginService {
  constructor(private readonly jwtToken: JwtToken<Omit<Usuario, 'senha' | 'createdAt' | 'updatedAt'>>) {}

  public login(user: Omit<Usuario, 'senha' | 'createdAt' | 'updatedAt'>): string {
    return this.jwtToken.createTokenUser(user);
  }
}
