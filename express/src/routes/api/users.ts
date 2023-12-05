import passport from 'passport';
import express, { Router } from 'express';
import UserController from '../../modules/users/users.controller';
import { restricted_roles, UserRole } from '../../middlewares/roles';

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
  restricted_roles([UserRole.ADMIN]),
  UserController.getAllUsers
);

/**
 * Upgrade user to admin
 * @route PUT /api/users/create-admin/:id
 * @access Private
 */
router.put(
  '/create-admin-15ae01a77f271ab9a5ea9ae4dac1c782/:id',
  passport.authenticate('jwt', { session: false }),
  UserController.setAdminRole
);

export default router;
