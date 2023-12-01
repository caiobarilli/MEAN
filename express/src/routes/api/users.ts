import express, { Router } from 'express';
import UserController from '../../modules/users/users.controller';
import auth from '../../middlewares/auth';

const router: Router = express.Router();

/**
 * @route GET /api/users
 * @access Private
 * @description Get all users
 */
router.get('/', auth, UserController.getAllUsers);

/**
 * Create a new user
 * @route POST /api/users
 * @access Public
 */
router.post('/', UserController.createUser);

export default router;
