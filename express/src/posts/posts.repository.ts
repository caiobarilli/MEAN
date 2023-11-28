import PostModel, { IPost } from './entities/posts.entity';

class PostRepository {
  public async getAllPosts(): Promise<IPost[]> {
    return await PostModel.find();
  }

  public async getPostById(id: string): Promise<IPost | null> {
    return await PostModel.findById(id);
  }

  public async createPost(postData: IPost): Promise<IPost> {
    return await PostModel.create(postData);
  }

  public async updatePost(id: string, postData: IPost): Promise<IPost | null> {
    return await PostModel.findByIdAndUpdate(id, postData, { new: true });
  }

  public async deletePost(id: string): Promise<void> {
    await PostModel.findByIdAndDelete(id);
  }
}

export default new PostRepository();
