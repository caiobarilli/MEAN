import jwt, { JwtPayload } from 'jsonwebtoken';
import tokenRepository from './token.repository';
import userRepository from '../users/users.repository';
import { UserRole } from '../../middlewares/roles';

interface TokenPayload {
  id: string;
  role: UserRole[];
}

class TokenService {
  public async createToken(userId: string, token: string): Promise<void> {
    try {
      await tokenRepository.createToken(userId, token);
    } catch (error) {
      throw new Error(`Erro ao criar token: ${error.message}`);
    }
  }

  public async getUserToken(userId: string): Promise<string> {
    try {
      const token = await tokenRepository.getTokenById(userId);
      if (token === undefined) {
        const role = await userRepository.getRolesById(userId);
        const token = this.generateAccessToken(userId, role);
        await tokenRepository.createToken(userId, token);
        return token;
      } else {
        return token;
      }
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  public generateAccessToken(userId: string, userRole): string {
    const payload: JwtPayload = {
      id: userId,
      role: userRole
    };
    return jwt.sign(payload, process.env.jwtSecret, {
      expiresIn: '1h',
      algorithm: 'HS256'
    });
  }

  public generateConfirmationToken(userId: string): string {
    const payload = {
      id: userId
    };
    return jwt.sign(payload, process.env.jwtSecret, {
      expiresIn: '30m',
      algorithm: 'HS256'
    });
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
