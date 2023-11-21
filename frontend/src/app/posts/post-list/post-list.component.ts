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
    `,
  ],
  template: `
    <div class="wrap-accordion">
      <mat-card>
        <mat-card-content>
          <h2>List of posts</h2>
        </mat-card-content>
      </mat-card>

      <mat-accordion>
        <mat-expansion-panel
          (opened)="panelOpenState = true"
          (closed)="panelOpenState = false"
        >
          <mat-expansion-panel-header>
            <mat-panel-title> Self aware panel </mat-panel-title>
          </mat-expansion-panel-header>
          <p>I'm visible because I am open</p>
        </mat-expansion-panel>
      </mat-accordion>
    </div>
  `,
})
export class PostListComponent {
  panelOpenState: boolean = false;
}
