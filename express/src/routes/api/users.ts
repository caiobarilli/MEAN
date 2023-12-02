import express, { Router } from 'express';
import UserController from '../../modules/users/users.controller';
import passport from 'passport';
import { checkRole, UserRole } from '../../middlewares/roles';

const router: Router = express.Router();

/**
 * @route GET /api/users
 * @access Private
 * @description Get all users
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRole([UserRole.ADMIN]),
  UserController.getAllUsers
);

export default router;
