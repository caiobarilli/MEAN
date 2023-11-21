import { Component } from '@angular/core';

@Component({
  selector: 'post-list',
  styles: [
    `
      .wrap-accordion {
        max-width: 80%;
        margin: 1rem auto;
      }
      mat-card {
        margin-bottom: 1rem;
      }
      :host {
        display: block;
        margin-top: 1rem;
      }
      mat-expansion-panel {
        margin: 1rem 0;
      }
    `,
  ],
  template: `
    <div class="wrap-accordion" *ngIf="posts.length >= 1">
      <mat-card>
        <mat-card-content>
          <h2>List of posts</h2>
        </mat-card-content>
      </mat-card>
      <mat-accordion multi="true" *ngFor="let post of posts">
        <mat-expansion-panel
          (opened)="(panelOpenState)"
          (closed)="(!panelOpenState)"
        >
          <mat-expansion-panel-header>
            <mat-panel-title> {{ post.title }} </mat-panel-title>
          </mat-expansion-panel-header>
          <p>{{ post.content }}</p>
        </mat-expansion-panel>
      </mat-accordion>
    </div>
  `,
})
export class PostListComponent {
  panelOpenState: boolean = false;
  posts = [
    { title: 'First Post', content: "This is the first post's content" },
    { title: 'Second Post', content: "This is the second post's content" },
    { title: 'Third Post', content: "This is the third post's content" },
  ];
}
