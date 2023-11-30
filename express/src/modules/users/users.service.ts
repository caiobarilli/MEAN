import { IUser } from './entities/user.entity';
import UserRepository from './users.repository';

class UserService {
  public async getAllUsers(): Promise<IUser[]> {
    return UserRepository.getAllUsers();
  }

  public getUserById(id: string): Promise<IUser | null> {
    return UserRepository.getUserById(id);
  }

  public createUser(userData: IUser): Promise<IUser> {
    return UserRepository.createUser(userData);
  }

  public updateUser(id: string, userData: IUser): Promise<IUser | null> {
    return UserRepository.updateUser(id, userData);
  }

  public deleteUser(id: string): Promise<void> {
    return UserRepository.deleteUser(id);
  }
}

export default new UserService();
