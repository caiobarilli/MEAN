import { Component } from '@angular/core';
import { Post } from './models/post.model';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <main>
      <post-create (postCreated)="onPostAdded($event)"></post-create>
      <post-list [posts]="savedPosts"></post-list>
    </main>
  `,
})
export class AppComponent {
  savedPosts: Post[] = [];

  onPostAdded(post: Post) {
    this.savedPosts.push(post);
  }
}
