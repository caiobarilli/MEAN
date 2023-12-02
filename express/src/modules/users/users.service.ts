import { IUser, UserSchemaValidation } from '../../models/user.entity';
import { SingUpUserCredentials } from '../auth/types/auth.types';
import { UserRole } from '../../middlewares/roles';
import UserRepository from './users.repository';
import bcrypt from 'bcrypt';

class UserService {
  public async getAllUsers(): Promise<IUser[]> {
    return UserRepository.getAllUsers();
  }

  public getUserById(id: string): Promise<IUser | null> {
    return UserRepository.getUserById(id);
  }

  public getUserByEmail(email: string): Promise<IUser | null> {
    return UserRepository.getUserByEmail(email);
  }

  public async createUser(userData: SingUpUserCredentials): Promise<IUser> {
    const { error, value } = UserSchemaValidation.validate(userData);

    if (error !== undefined) {
      throw new Error(error.details[0].message);
    }

    if (value.password !== value.confirmPassword) {
      throw new Error('Password does not match with Confirm Password');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(value.password, salt);

    userData.password = hashedPassword;
    userData.role = UserRole.USER;

    const createdUser = await UserRepository.createUser(userData);

    return createdUser;
  }

  public updateUser(id: string, userData: IUser): Promise<IUser | null> {
    return UserRepository.updateUser(id, userData);
  }

  public deleteUser(id: string): Promise<void> {
    return UserRepository.deleteUser(id);
  }
}

export default new UserService();
