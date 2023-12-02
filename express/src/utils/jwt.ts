import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../models/user.entity';
import usersRepository from '../modules/users/users.repository';

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
interface TokenPayload {
  id: string;
  role: string;
}

export const extractUserFromToken = async (
  token: string
): Promise<IUser | null> => {
  if (token) {
    try {
      const decodedToken = jwt.verify(
        token,
        process.env.jwtSecret as string
      ) as TokenPayload;
      const roles = await usersRepository.getRolesById(decodedToken.id);
      return roles;
    } catch {
      return;
    }
  }

  return null;
};
