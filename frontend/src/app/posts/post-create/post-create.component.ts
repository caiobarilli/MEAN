import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '@/models/post.model';

@Component({
  selector: 'post-create',
  styles: [
    `
      .field-full-width {
        display: block;
      }
      mat-card {
        max-width: 80%;
        margin: 1rem auto 0;
      }
    `,
  ],
  template: `
    <mat-card>
      <mat-card-content><h1>Create new post!</h1></mat-card-content>
    </mat-card>

    <mat-card>
      <mat-card-content>
        <form (submit)="savePost(postForm)" #postForm="ngForm">
          <mat-form-field class="field-full-width">
            <mat-label>Title</mat-label>
            <input
              matInput
              placeholder="Add a title"
              name="title"
              ngModel
              required
              #title="ngModel"
            />

            <mat-error *ngIf="title.invalid"> Please enter a title </mat-error>
          </mat-form-field>

          <mat-form-field class="field-full-width">
            <mat-label>Content</mat-label>
            <textarea
              matInput
              placeholder="Add your text here"
              name="content"
              ngModel
              required
              #content="ngModel"
            ></textarea>

            <mat-error *ngIf="content.invalid">
              Please enter a text content
            </mat-error>
          </mat-form-field>
          <br />
          <button mat-stroked-button>SAVE</button>
        </form>
      </mat-card-content>
    </mat-card>
  `,
})
export class PostCreateComponent {
  textValue = '';
  textAreaValue = '';

  @Output() postCreated = new EventEmitter<Post>();

  savePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post = {
      title: form.value.title,
      content: form.value.content,
    };
    this.postCreated.emit(post);
  }
}
