import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SubInputsComponent } from './sub-inputs/sub-inputs.component';
import { SubInputComponent } from './sub-input/sub-input.component';
import { QuestionBaseComponent } from './question-base/question-base.component';

@NgModule({
  declarations: [AppComponent, SubInputsComponent, SubInputComponent, QuestionBaseComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
