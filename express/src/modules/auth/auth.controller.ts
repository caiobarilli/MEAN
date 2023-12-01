import { Request, Response } from 'express';
import AuthService from './auth.service';
import { SignUpResult } from './types/auth.types';

class AuthController {
  public async register(
    req: Request,
    res: Response
  ): Promise<SignUpResult | void> {
    try {
      const result = await AuthService.signUp(req.body);
      res.json(result);
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ error: 'Email already in use' });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const result = await AuthService.signIn(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AuthController();
