import {
  SignInResult,
  SignUpResult,
  SingUpUserCredentials,
  UserCredentials
} from './types/auth.types';
import UserService from '../users/users.service';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class AuthService {
  public async signUp(userData: SingUpUserCredentials): Promise<SignUpResult> {
    const user = await UserService.createUser(userData);

    const { id } = user;

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

    const createdUser = {
      fullname: user.fullname,
      email: user.email
    };

    return {
      message: 'User created successfully',
      access_token: accessToken,
      user: createdUser
    };
  }

  public async signIn(credentials: UserCredentials): Promise<SignInResult> {
    const { email, password } = credentials;

    const userID = await UserService.getUserByEmail(email);

    if (!userID) {
      throw new Error('User not found');
    }

    const user = await UserService.getUserById(userID._id);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    return {
      message: 'User logged in successfully',
      access_token: ''
    };
  }
}

export default new AuthService();
