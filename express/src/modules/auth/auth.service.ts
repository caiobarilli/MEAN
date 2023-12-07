import {
  SignInResult,
  SignUpResult,
  SingUpUserCredentials,
  UserCredentials
} from './types/auth.types';
import userRepository from '../users/users.repository';
import userService from '../users/users.service';
import tokenService from '../token/token.service';
import { mailOptions, transport } from '../../config/mailer.config';
import bcrypt from 'bcrypt';

class AuthService {
  public async register(
    userData: SingUpUserCredentials
  ): Promise<SignUpResult> {
    const user = await userService.createUser(userData);
    const accessToken = tokenService.generateAccessToken(user.id, user.role);
    tokenService.createToken(user.id, accessToken);
    const createdUser = {
      fullname: user.fullname,
      email: user.email
    };
    transport().sendMail(
      mailOptions(
        {
          to: user.email,
          subject: 'Account verification'
        },
        {
          template: 'emails/email-confirmation',
          context: {
            url: `${process.env.FRONTEND_URL}/auth/verify?token=`,
            token: user.confirmationToken
          }
        }
      ),
      (error) => {
        if (error) {
          throw new Error(error.toString());
        }
      }
    );
    return {
      message: 'Email was sent please check your inbox to verify your account',
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
    const saltPass = password + user.salt;
    const isMatch = await bcrypt.compare(saltPass, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    const accessToken = await tokenService.getUserToken(user.id);
    return {
      message: 'User logged in successfully',
      access_token: accessToken
    };
  }
}

export default new AuthService();
