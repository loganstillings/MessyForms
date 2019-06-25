import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SubInputsComponent } from './components/questions/sub-inputs/sub-inputs.component';
import { SubInputComponent } from './components/questions/sub-input/sub-input.component';
import { QuestionBaseComponent } from './components/questions/question-base/question-base.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { FormService } from '../services/form.service';
import { DexieService } from '../services/dexie.service';
import { QuestionService } from '../services/question.service';
import { QuestionsListComponent } from './components/questions/questions-list/questions-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SubInputsComponent,
    SubInputComponent,
    QuestionBaseComponent,
    FormBuilderComponent,
    QuestionsListComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [FormService, DexieService, QuestionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
