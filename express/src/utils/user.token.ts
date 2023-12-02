import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user.entity';
import usersRepository from '../modules/users/users.repository';

const extractUserFromToken = async (token: string): Promise<IUser | null> => {
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

export default extractUserFromToken;
