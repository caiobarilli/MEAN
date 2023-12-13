import { Request, Response } from 'express';
import { SignInResult, SignUpResult } from './types/auth.types';
import AuthService from './auth.service';
import tokenService from '../token/token.service';

class AuthController {
  /**
   * Register a new user
   * @param req
   * @param res
   * @returns {Promise<SignUpResult | void>}
   */
  public async register(
    req: Request,
    res: Response
  ): Promise<SignUpResult | void> {
    try {
      const result = await AuthService.register(req.body);
      res.json(result);
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ error: 'Email already in use' });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  /**
   * Login user
   * @param req
   * @param res
   * @returns {Promise<SignInResult | void>}
   */
  public async login(
    req: Request,
    res: Response
  ): Promise<SignInResult | void> {
    try {
      const result = await AuthService.login(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Validate confirmation token
   * @param req
   * @param res
   * @returns {Promise<string>}
   */
  public async validate(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.params;
      const result = await tokenService.validateConfirmationToken(token);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Refresh confirmation token
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  public async refreshConfirmationToken(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { email } = req.params;
      const result = await tokenService.refreshConfirmationToken(email);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AuthController();
