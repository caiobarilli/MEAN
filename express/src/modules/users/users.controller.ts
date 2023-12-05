import { Request, Response } from 'express';
import usersRepository from './users.repository';
import usersService from './users.service';
import { UserRole } from '../../middlewares/roles';

class UserController {
  /**
   * Get all users
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await usersRepository.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  /**
   * Set role to user by id
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  public async setAdminRole(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await usersService.setRoleById(id, UserRole.ADMIN);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new UserController();
