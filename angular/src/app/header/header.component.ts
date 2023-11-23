import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  styles: [
    `
      mat-toolbar span {
        text-transform: uppercase;
      }
    `,
  ],
  template: `
    <mat-toolbar>
      <span>Messages</span>
    </mat-toolbar>
  `,
})
export class HeaderComponent {}
