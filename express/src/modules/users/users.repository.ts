import userModel, { IUser } from '../../models/user.entity';
import { SingUpUserCredentials } from '../auth/types/auth.types';

class UserRepository {
  public getAllUsers(): Promise<IUser[]> {
    return userModel.find().select('-password');
  }

  public getUserById(id: string): Promise<IUser | null> {
    return userModel.findById(id);
  }

  public getRolesById(id: string): Promise<IUser | null> {
    return userModel.findById(id).select('role');
  }

  public getUserByEmail(email: string): Promise<IUser | null> {
    return userModel.findOne({ email: email });
  }

  public getUserByConfirmationToken(token: string): Promise<IUser | null> {
    return userModel.findOne({ confirmationToken: token });
  }

  public createUser(userData: SingUpUserCredentials): Promise<IUser> {
    return userModel.create(userData);
  }

  public updateUser(id: string, userData: IUser): Promise<IUser | null> {
    userData.updatedAt = new Date();
    return userModel.findByIdAndUpdate(id, userData, { new: true });
  }

  public async deleteUser(id: string): Promise<void> {
    await userModel.findByIdAndDelete(id);
  }
}

export default new UserRepository();
