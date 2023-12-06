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

export const extractRoleFromToken = async (
  token: string
): Promise<UserRole[]> => {
  if (token) {
    const decodedToken = jwt.verify(
      token,
      process.env.jwtSecret as string
    ) as TokenPayload;
    return decodedToken.role;
  }
  return null;
};

export const extractUserIdFromToken = async (
  token: string
): Promise<string> => {
  if (token) {
    const decodedToken = jwt.verify(
      token,
      process.env.jwtSecret as string
    ) as TokenPayload;
    return decodedToken.id;
  }
  return null;
};
