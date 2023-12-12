import jwt, { JwtPayload } from 'jsonwebtoken';
import tokenRepository from './token.repository';
import userRepository from '../users/users.repository';
import { UserRole } from '../../middlewares/roles';

interface TokenPayload {
  id: string;
  role: UserRole[];
}

class TokenService {
  /**
   * Create a new token for the user
   * @param {string} userId
   * @param {string} token
   * @returns {Promise<void>}
   */
  public async createToken(userId: string, token: string): Promise<void> {
    try {
      await tokenRepository.createToken(userId, token);
    } catch (error) {
      throw new Error(`Erro ao criar token: ${error.message}`);
    }
  }

  /**
   * Get the user token by id
   * @param {string} userId
   * @returns {Promise<string>}
   */
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

  /**
   * Validate confirmation token
   *
   */
  public async validateConfirmationToken(token: string) {
    try {
      const user = await userRepository.getUserByConfirmationToken(token);
      if (!user) {
        throw new Error('Invalid token');
      }
      if (user.status) {
        throw new Error('User already confirmed');
      }
      if (user.updatedAt) {
        if (user.updatedAt.getTime() + 30 * 60 * 1000 < Date.now()) {
          throw new Error('Token expired');
        }
      } else {
        if (user.createdAt.getTime() + 30 * 60 * 1000 < Date.now()) {
          throw new Error('Token expired');
        }
      }
      user.status = true;
      user.confirmationToken = null;
      await user.save();
      const tokenData = await tokenRepository.getTokenById(user.id);
      if (tokenData === undefined) {
        const token = this.generateAccessToken(user.id, user.role);
        await tokenRepository.createToken(user.id, token);
        return token;
      } else {
        return tokenData;
      }
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  /**
   * Generate a new access token
   * @param {string} userId
   * @param {UserRole[]} userRole
   * @returns {string}
   */
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

  /**
   * Generate a new confirmation token
   * @param {string} userId
   * @returns {string}
   */
  public generateConfirmationToken(userId: string): string {
    const payload = {
      id: userId
    };
    return jwt.sign(payload, process.env.jwtSecret, {
      expiresIn: '30m',
      algorithm: 'HS256'
    });
  }

  /**
   * Extract data from token
   * @param {string} token
   * @param {string} payloadValue
   * @returns {Promise<UserRole[] | string>}
   */
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
