import UserModel, { IUser } from '../../models/user.entity';
import { SingUpUserCredentials } from '../auth/types/auth.types';

class UserRepository {
  public getAllUsers(): Promise<IUser[]> {
    return UserModel.find().select('-password');
  }

  public getUserById(id: string): Promise<IUser | null> {
    return UserModel.findById(id);
  }

  public getUserByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email: email }).select('_id');
  }

  public async createUser(userData: SingUpUserCredentials): Promise<IUser> {
    return UserModel.create(userData);
  }

  public updateUser(id: string, userData: IUser): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(id, userData, { new: true });
  }

  public async deleteUser(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  }
}

export default new UserRepository();
