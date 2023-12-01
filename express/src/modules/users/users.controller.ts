// user.controller.ts
import { Request, Response } from 'express';
import UserService from './users.service';
import jwt from 'jsonwebtoken';
import { UserSchemaValidation } from '../../models/user.entity';

class UserController {
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async createUser(req: Request, res: Response) {
    try {
      const { error, value } = UserSchemaValidation.validate(req.body);

      if (error !== undefined) {
        res.status(400).json({ error: error.details[0].message });
      }

      const user = await UserService.createUser(value);

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 3600 }, // 3600 = 1 hour
        (err, token) => {
          if (err) throw err;

          res.json({
            message: 'Usuário criado com sucesso!',
            acess_token: token,
            user: user
          });
        }
      );
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ error: 'Email already in use' });
      }
    }
  }
}

export default new UserController();
