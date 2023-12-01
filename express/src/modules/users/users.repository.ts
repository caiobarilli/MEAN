import UserModel, { IUser } from '../../models/user.entity';

class UserRepository {
  public getAllUsers(): Promise<IUser[]> {
    return UserModel.find();
  }

  public getUserById(id: string): Promise<IUser | null> {
    return UserModel.findById(id);
  }

  public createUser(userData: IUser): Promise<IUser> {
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
