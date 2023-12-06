import passport from 'passport';
import express, { Router } from 'express';
import UserController from '../../modules/users/users.controller';

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
  UserController.showUser
);

export default router;
