import { Post } from '@/models/post.model';

export class PostsService {
  private posts: Post[] = [];

  /**
   * Get all posts
   * @returns {Post[]}
   */
  getPosts() {
    return [...this.posts];
  }

  /**
   * Add a post
   * @param title
   * @param content
   */
  addPost(title: string, content: string) {
    const post: Post = { title: title, content: content };
    this.posts.push(post);
  }
}
