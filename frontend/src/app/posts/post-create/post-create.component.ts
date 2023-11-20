import { Component } from '@angular/core';

@Component({
  selector: 'post-create',
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
