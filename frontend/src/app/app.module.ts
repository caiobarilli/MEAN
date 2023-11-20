import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, PostCreateComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
