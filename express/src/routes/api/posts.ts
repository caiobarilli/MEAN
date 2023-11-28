import express, { Router } from 'express';
import PostsController from '../../posts/posts.controller';

const router: Router = express.Router();

/**
 * Profile API endpoint
 * @route GET /api/posts
 * @access Public
 */
router.get('/', PostsController.getAllPosts);
router.get('/:id', PostsController.getPostById);
router.post('/', PostsController.createPost);
router.put('/:id', PostsController.updatePost);
router.delete('/:id', PostsController.deletePost);

export default router;
