import express, { Router } from 'express';
import AuthController from '../../modules/auth/auth.controller';

const router: Router = express.Router();

/**
 * Create a new user
 * @route POST /api/auth/register
 * @access Public
 */
router.post('/register', AuthController.register);

/**
 * Login user
 * @route POST /api/auth/login
 * @access Public
 */
router.post('/login', AuthController.login);

/**
 * Validate confirmation token
 * @route GET /api/auth/validate/:token
 * @access Public
 */
router.get('/validate/:token', AuthController.validate);

/**
 * Refresh confirmation token
 * @route GET /api/auth/token/:email
 * @access Public
 */
router.get(
  '/refresh/confirmation-token/:email',
  AuthController.refreshConfirmationToken
);

export default router;
