import PostRepository from './posts.repository';
import { IPost } from './entities/posts.entity';

class PostService {
  public async getAllPosts(): Promise<IPost[]> {
    return PostRepository.getAllPosts();
  }

  public getPostById(id: string): Promise<IPost | null> {
    return PostRepository.getPostById(id);
  }

  public createPost(postData: IPost): Promise<IPost> {
    return PostRepository.createPost(postData);
  }

  public updatePost(id: string, postData: IPost): Promise<IPost | null> {
    return PostRepository.updatePost(id, postData);
  }

  public deletePost(id: string): Promise<void> {
    return PostRepository.deletePost(id);
  }
}

export default new PostService();
