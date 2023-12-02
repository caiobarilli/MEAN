import express, { Router } from 'express';
import { UserRole, checkRole } from '../../middlewares/roles';
import PostsController from '../../modules/posts/posts.controller';
import passport from 'passport';

const router: Router = express.Router();

/**
 * Get all posts
 * @route GET /api/posts
 * @access Public
 */
router.get('/', PostsController.getAllPosts);

/**
 * Get post by id
 * @route GET /api/posts/:id
 * @access Public
 */
router.get('/:id', PostsController.getPostById);

/**
 * Create new post
 * @route POST /api/posts
 * @access Private
 * @role admin
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRole([UserRole.ADMIN]),
  PostsController.createPost
);

/**
 * Update post
 * @route PUT /api/posts/:id
 * @access Private
 * @role admin
 */
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole([UserRole.ADMIN]),
  PostsController.updatePost
);

/**
 * Delete post
 * @route DELETE /api/posts/:id
 * @access Private
 * @role admin
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole([UserRole.ADMIN]),
  PostsController.deletePost
);

export default router;
