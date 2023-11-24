import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

/**
 * Profile API endpoint
 * @route GET /api/users
 * @access Public
 */
router.get('/', (req: Request, res: Response) => res.send('Profile Route'));

export default router;
