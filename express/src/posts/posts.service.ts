import PostRepository from './posts.repository';
import { IPost } from './entities/posts.entity';

class PostService {
  public async getAllPosts(): Promise<IPost[]> {
    return await PostRepository.getAllPosts();
  }

  public async getPostById(id: string): Promise<IPost | null> {
    return await PostRepository.getPostById(id);
  }

  public async createPost(postData: IPost): Promise<IPost> {
    return await PostRepository.createPost(postData);
  }

  public async updatePost(id: string, postData: IPost): Promise<IPost | null> {
    return await PostRepository.updatePost(id, postData);
  }

  public async deletePost(id: string): Promise<void> {
    return await PostRepository.deletePost(id);
  }
}

export default new PostService();
