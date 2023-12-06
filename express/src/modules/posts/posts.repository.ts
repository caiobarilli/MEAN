import postModel, { IPost } from '../../models/post.entity';

class PostRepository {
  public getAllPosts(): Promise<IPost[]> {
    return postModel.find();
  }

  public getPostById(id: string): Promise<IPost | null> {
    return postModel.findById(id);
  }

  public createPost(postData: IPost): Promise<IPost> {
    return postModel.create(postData);
  }

  public updatePost(id: string, postData: IPost): Promise<IPost | null> {
    return postModel.findByIdAndUpdate(id, postData, { new: true });
  }

  public async deletePost(id: string): Promise<void> {
    await postModel.findByIdAndDelete(id);
  }
}

export default new PostRepository();
