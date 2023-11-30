import express, { Router } from 'express';
import PostsController from '../../posts/posts.controller';

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
 * @access Public
 */
router.post('/', PostsController.createPost);

/**
 * Update post
 * @route PUT /api/posts/:id
 * @access Public
 */
router.put('/:id', PostsController.updatePost);

/**
 * Delete post
 * @route DELETE /api/posts/:id
 * @access Public
 */
router.delete('/:id', PostsController.deletePost);

export default router;
