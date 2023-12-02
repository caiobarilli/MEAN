import {
  SignInResult,
  SignUpResult,
  SingUpUserCredentials,
  UserCredentials
} from './types/auth.types';
import UserService from '../users/users.service';
import { generateAccessToken } from '../../utils/jwt';
import bcrypt from 'bcrypt';

class AuthService {
  public async signUp(userData: SingUpUserCredentials): Promise<SignUpResult> {
    const user = await UserService.createUser(userData);

    const accessToken = generateAccessToken(user.id, user.role);

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

    const accessToken = generateAccessToken(user.id, user.role);

    return {
      message: 'User logged in successfully',
      access_token: accessToken
    };
  }
}

export default new AuthService();
