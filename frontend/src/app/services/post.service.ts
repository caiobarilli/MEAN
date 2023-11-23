import { Post } from '@/models/post.model';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  /**
   * Get all posts
   * @returns {Post[]}
   */
  getPosts(): Post[] {
    return [...this.posts];
  }

  /**
   * Expose the postsUpdated Subject as an Observable
   * @returns {Observable<Post[]>}
   */
  getPostUpdateListener(): Observable<Post[]> {
    return this.postsUpdated.asObservable();
  }

  /**
   * Add a new post to the list and emit the updated list
   * @param {string} title
   * @param {string} content
   * @returns {void}
   */
  addPost(title: string, content: string): void {
    const post: Post = { title: title, content: content };

    if (!post) {
      return;
    }

    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
