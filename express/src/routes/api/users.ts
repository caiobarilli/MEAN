import express, { Router } from 'express';
import UserController from '../../modules/users/users.controller';
import passport from 'passport';
import { checkRole, UserRole } from '../../middlewares/roles';

const router: Router = express.Router();

/**
 * Get all users
 * @route GET /api/users
 * @access Private
 * @role admin
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRole([UserRole.ADMIN]),
  UserController.getAllUsers
);

export default router;
