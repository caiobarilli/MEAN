import { Request, Response, NextFunction } from 'express';
import extractUserFromToken from '../utils/user.token';

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

    // check if user has the required role

    let hasPermission = false;

    userRoles.forEach((role) => {
      console.log(role);

      if (roles.includes(role)) {
        hasPermission = true;
      }
    });

    if (hasPermission) {
      next();
    } else {
      return res.status(403).json({ message: 'Access Forbidden' });
    }
  };
};
