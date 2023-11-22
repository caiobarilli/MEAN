import { Component, EventEmitter, Output } from '@angular/core';

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
      <mat-card-content
        ><h1>{{ title }}</h1></mat-card-content
      >
    </mat-card>

    <mat-card>
      <mat-card-content>
        <form (submit)="savePost()">
          <mat-form-field class="field-full-width">
            <mat-label>Title</mat-label>
            <input
              matInput
              placeholder="Add a title"
              [(ngModel)]="textValue"
              [ngModelOptions]="{ standalone: true }"
            />
          </mat-form-field>

          <mat-form-field class="field-full-width">
            <mat-label>Text</mat-label>
            <textarea
              matInput
              placeholder="Add your text here"
              [(ngModel)]="textAreaValue"
              [ngModelOptions]="{ standalone: true }"
            ></textarea>
          </mat-form-field>
          <br />
          <button mat-stroked-button>SAVE</button>
        </form>
      </mat-card-content>
    </mat-card>
  `,
})
export class PostCreateComponent {
  title = 'Create new post!';

  textValue = '';
  textAreaValue = '';

  @Output() postCreated = new EventEmitter();

  savePost() {
    const post = {
      title: this.textValue,
      text: this.textAreaValue,
    };
    this.postCreated.emit(post);
  }
}
