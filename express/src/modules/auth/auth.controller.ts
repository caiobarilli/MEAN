import { Request, Response } from 'express';
import AuthService from './auth.service';

class AuthController {
  public async signUp(req: Request, res: Response) {
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

  public async signIn(req: Request, res: Response) {}
}

export default new AuthController();
