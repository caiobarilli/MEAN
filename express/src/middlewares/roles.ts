import { Request, Response, NextFunction } from 'express';
import tokenService from '../modules/token/token.service';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export const restricted_roles = (roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userRoles: UserRole[] = (await tokenService.extractTokenData(
      req.headers.authorization?.replace('Bearer ', ''),
      'user__role'
    )) as UserRole[];
    const hasPermission = userRoles.some((role) => roles.includes(role));
    if (hasPermission) {
      next();
    } else {
      return res.status(403).json({ message: 'Access Forbidden' });
    }
  };
};
