import postRepository from './posts.repository';
import { IPost } from '../../models/post.entity';

class PostService {
  public async getAllPosts(): Promise<IPost[]> {
    return postRepository.getAllPosts();
  }

  public getPostById(id: string): Promise<IPost | null> {
    return postRepository.getPostById(id);
  }

  public createPost(postData: IPost): Promise<IPost> {
    return postRepository.createPost(postData);
  }

  public updatePost(id: string, postData: IPost): Promise<IPost | null> {
    return postRepository.updatePost(id, postData);
  }

  public deletePost(id: string): Promise<void> {
    return postRepository.deletePost(id);
  }
}

export default new PostService();
