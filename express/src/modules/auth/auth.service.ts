import { IUser } from '../../models/user.entity';
import UserService from '../users/users.service';
import jwt from 'jsonwebtoken';

class AuthService {
  public async signUp(userData: IUser): Promise<{
    message: string;
    access_token: string;
    user: { id: string; fullname: string; email: string };
  }> {
    const { id } = userData;

    const payload = {
      user: {
        id: id
      }
    };

    const accessToken = await new Promise<string>((resolve, reject) => {
      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) reject(err);
          resolve(token);
        }
      );
    });

    const user = await UserService.createUser(userData);

    const createdUser = {
      id: user.id,
      fullname: user.fullname,
      email: user.email
    };

    return {
      message: 'User created successfully',
      access_token: accessToken,
      user: createdUser
    };
  }
}

export default new AuthService();
