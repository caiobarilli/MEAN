import { Request, Response, NextFunction } from 'express';
import { extractUserFromToken } from '../utils/jwt';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export const checkRole = (roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = await extractUserFromToken(
      req.headers.authorization?.replace('Bearer ', '')
    );

    const userRoles: UserRole[] = user.role as UserRole[];

    const hasPermission = userRoles.some((role) => roles.includes(role));

    if (hasPermission) {
      next();
    } else {
      return res.status(403).json({ message: 'Access Forbidden' });
    }
  };
};
