import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

/**
 * Profile API endpoint
 * @route GET /api/posts
 * @access Public
 */
router.get('/', (req: Request, res: Response) => res.send('Posts Route'));

export default router;
