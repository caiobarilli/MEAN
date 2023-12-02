import jwt from 'jsonwebtoken';
import { IUser } from '../models/user.entity';
import usersRepository from '../modules/users/users.repository';

export const generateAccessToken = (userId: string, userRole): string => {
  const payload = {
    id: userId,
    role: userRole
  };

  const accessToken = jwt.sign(payload, process.env.jwtSecret, {
    expiresIn: '1h'
  });
  return accessToken;
};

export const extractUserFromToken = async (
  token: string
): Promise<IUser | null> => {
  if (token) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decodedToken: any = jwt.verify(token, process.env.jwtSecret);
      const roles = await usersRepository.getRolesById(decodedToken.id);
      return roles;
    } catch {
      return;
    }
  }

  return null;
};
