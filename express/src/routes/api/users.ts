import express, { Router } from 'express';
import UserController from '../../modules/users/users.controller';

const router: Router = express.Router();

/**
 * Get all users
 * @route GET /api/users
 * @access Public
 */
router.get('/', UserController.getAllUsers);

/**
 * Create a new user
 * @route POST /api/users
 * @access Public
 */
router.post('/', UserController.createUser);

export default router;
