import { UserRole } from '../../middlewares/roles';
import { IUser, UserSchemaValidation } from '../../models/user.entity';
import { SingUpUserCredentials } from '../auth/types/auth.types';
import tokenService from '../token/token.service';
import userRepository from './users.repository';
import bcrypt from 'bcrypt';

class UserService {
  /**
   * Create new user
   * @param {SingUpUserCredentials} userData
   * @returns {Promise<IUser>}
   */
  public async createUser(userData: SingUpUserCredentials): Promise<IUser> {
    const { error, value } = UserSchemaValidation.validate(userData);
    if (error !== undefined) {
      throw new Error(error.details[0].message);
    }
    if (value.password !== value.confirmPassword) {
      throw new Error('Password does not match with Confirm Password');
    }
    userData.salt = await bcrypt.genSalt();
    userData.password = await bcrypt.hash(
      value.password + userData.salt,
      userData.salt
    );
    userData.role = UserRole.USER;
    const user = await userRepository.createUser(userData);
    user.confirmationToken = await tokenService.generateConfirmationToken(
      user.id
    );
    user.save();
    return user;
  }

  /**
   * Show user by id
   * @param {string} userID
   * @returns {Promise<{message: string, user: IUser}>}
   */
  public async showUser(userID: string): Promise<{
    message: string;
    user: { _id: string; fullname: string; email: string; role: string[] };
  }> {
    const userData = await userRepository.getUserById(userID);
    if (!userData) {
      throw new Error('User not found');
    }
    const filteredUser = {
      _id: userData._id,
      fullname: userData.fullname,
      email: userData.email,
      role: userData.role
    };
    return {
      message: 'User found',
      user: filteredUser
    };
  }

  /**
   * Set role to user by id
   * @param {string} userID
   * @param {UserRole} userRole
   * @returns {Promise<{message: string, user: IUser}>}
   */
  public async setRoleById(userID: string, userRole: UserRole) {
    const userData = await userRepository.getUserById(userID);
    if (!userData) {
      throw new Error('User not found');
    }
    if (userData.role.includes(userRole)) {
      throw new Error(`This user already has ${userRole} role`);
    }
    userData.role.push(userRole);
    const user = await userRepository.updateUser(userID, userData);
    const filteredUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role
    };
    const accessToken = tokenService.generateAccessToken(user.id, user.role);
    return {
      message: 'User upgraded to admin role successfully',
      accessToken: accessToken,
      user: filteredUser
    };
  }
}

export default new UserService();
