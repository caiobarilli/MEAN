import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styles: [
    `
      mat-card {
        max-width: 80%;

        margin: 1rem auto 0;
      }
    `,
  ],
  template: `
    <app-header></app-header>
    <post-create></post-create>
    <post-list></post-list>
  `,
})
export class AppComponent {}
