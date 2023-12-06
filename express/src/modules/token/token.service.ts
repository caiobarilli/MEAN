import jwt, { JwtPayload } from 'jsonwebtoken';
import TokenRepository from './token.repository';
import { UserRole } from '../../middlewares/roles';

interface TokenPayload {
  id: string;
  role: UserRole[];
}

class TokenService {
  public async createToken(userId: string, token: string): Promise<void> {
    try {
      await TokenRepository.createToken(userId, token);
    } catch (error) {
      throw new Error(`Erro ao criar token: ${error.message}`);
    }
  }

  public async validateToken(userId: string, token: string): Promise<boolean> {
    try {
      return await TokenRepository.validateToken(userId, token);
    } catch (error) {
      throw new Error(`Erro ao validar token: ${error.message}`);
    }
  }

  public generateAccessToken(userId: string, userRole): string {
    const payload: JwtPayload = {
      id: userId,
      role: userRole
    };
    const accessToken = jwt.sign(payload, process.env.jwtSecret, {
      expiresIn: '1h',
      algorithm: 'HS256'
    });
    return accessToken;
  }

  public async extractTokenData(
    token: string,
    payloadValue: string | UserRole[]
  ): Promise<UserRole[] | string> {
    if (token) {
      const decodedToken = jwt.verify(
        token,
        process.env.jwtSecret as string
      ) as TokenPayload;

      switch (payloadValue) {
        case 'user__id':
          return decodedToken.id;
          break;
        case 'user__role':
          return decodedToken.role;
          break;
        default:
          return;
          break;
      }
    }
    return null;
  }
}

export default new TokenService();
