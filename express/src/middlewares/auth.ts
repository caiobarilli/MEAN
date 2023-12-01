import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user.entity';

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

const auth = function (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwtSecret) as { user: IUser };
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid', error: err.message });
  }
};

export default auth;
