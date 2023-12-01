import express, { Router } from 'express';
import AuthController from '../../modules/auth/auth.controller';

const router: Router = express.Router();

/**
 * Create a new user
 * @route POST /api/auth
 * @access Public
 */
router.post('/', AuthController.signUp);

export default router;
