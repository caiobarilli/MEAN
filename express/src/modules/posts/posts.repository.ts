import PostModel, { IPost } from '../../models/post.entity';

class PostRepository {
  public getAllPosts(): Promise<IPost[]> {
    return PostModel.find();
  }

  public getPostById(id: string): Promise<IPost | null> {
    return PostModel.findById(id);
  }

  public createPost(postData: IPost): Promise<IPost> {
    return PostModel.create(postData);
  }

  public updatePost(id: string, postData: IPost): Promise<IPost | null> {
    return PostModel.findByIdAndUpdate(id, postData, { new: true });
  }

  public async deletePost(id: string): Promise<void> {
    await PostModel.findByIdAndDelete(id);
  }
}

export default new PostRepository();
