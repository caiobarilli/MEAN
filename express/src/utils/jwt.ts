import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserRole } from '../middlewares/roles';

interface TokenPayload {
  id: string;
  role: UserRole[];
}

export const generateAccessToken = (userId: string, userRole): string => {
  const payload: JwtPayload = {
    id: userId,
    role: userRole
  };
  const accessToken = jwt.sign(payload, process.env.jwtSecret, {
    expiresIn: '1h',
    algorithm: 'HS256'
  });
  return accessToken;
};

export const extractTokenData = async (
  token: string,
  payloadValue: string
): Promise<{ role?: UserRole[]; id?: string }> => {
  if (token) {
    const decodedToken = jwt.verify(
      token,
      process.env.jwtSecret as string
    ) as TokenPayload;

    switch (payloadValue) {
      case 'user__id':
        return { id: decodedToken.id };
        break;
      case 'user__role':
        return {
          role: decodedToken.role
        };
        break;
      default:
        return;
        break;
    }
  }
  return null;
};
