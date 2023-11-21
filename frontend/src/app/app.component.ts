import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <app-header></app-header>
      <post-create></post-create>
    </div>
  `,
})
export class AppComponent {}
