import {
  SignInResult,
  SignUpResult,
  SingUpUserCredentials,
  UserCredentials
} from './types/auth.types';
import userRepository from '../users/users.repository';
import userService from '../users/users.service';
import { generateAccessToken } from '../../utils/jwt';
import bcrypt from 'bcrypt';

class AuthService {
  public async register(
    userData: SingUpUserCredentials
  ): Promise<SignUpResult> {
    const user = await userService.createUser(userData);
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

  public async login(credentials: UserCredentials): Promise<SignInResult> {
    const { email, password } = credentials;
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    await userRepository.getUserById(user._id);
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
