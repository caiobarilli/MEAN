import { Request, Response } from 'express';
import { IPost, PostSchemaValidation } from '../../models/post.entity';
import PostService from './posts.service';

class PostsController {
  public async getAllPosts(req: Request, res: Response): Promise<void> {
    try {
      const posts = await PostService.getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async getPostById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const post = await PostService.getPostById(id);
      if (!post) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }
      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async createPost(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = PostSchemaValidation.validate(req.body);

      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }

      const postData: IPost = value;
      const newPost = await PostService.createPost(postData);
      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async updatePost(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const postData: IPost = req.body;
      const updatedPost = await PostService.updatePost(id, postData);
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async deletePost(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await PostService.deletePost(id);
      res.status(200).send('Post deleted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new PostsController();
