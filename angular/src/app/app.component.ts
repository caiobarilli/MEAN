import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <main>
      <!-- <post-create (postCreated)="onPostAdded($event)"></post-create> -->
      <!-- <post-list [posts]="savedPosts"></post-list> -->
      <post-create></post-create>
      <post-list></post-list>
    </main>
  `,
})
export class AppComponent {}
