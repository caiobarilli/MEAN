import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserRole } from 'src/middlewares/roles';

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
    expiresIn: '1h'
  });
  return accessToken;
};

export const extractRoleFromToken = async (
  token: string
): Promise<UserRole[]> => {
  if (token) {
    try {
      const decodedToken = jwt.verify(
        token,
        process.env.jwtSecret as string
      ) as TokenPayload;
      return decodedToken.role;
    } catch {
      return;
    }
  }

  return null;
};
