import { Component } from '@angular/core';

@Component({
  selector: 'post-create',
  styles: [
    `
      .mat-card {
        max-width: 80%;
        margin: 1rem auto;
      }
    `,
  ],
  templateUrl: './post-create.component.html',
})
export class PostCreateComponent {
  textAreaValue = '';
  title = 'Create new post!';

  savePost() {
    this.title = this.textAreaValue;
    return;
  }
}
