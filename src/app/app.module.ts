import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SubInputsComponent } from './sub-inputs/sub-inputs.component';
import { SubInputComponent } from './sub-input/sub-input.component';
import { QuestionBaseComponent } from './question-base/question-base.component';
import { CommonService } from '../services/common.service';
import { DexieService } from '../services/dexie.service';
import { QuestionService } from '../services/question.service';

@NgModule({
  declarations: [
    AppComponent,
    SubInputsComponent,
    SubInputComponent,
    QuestionBaseComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [CommonService, DexieService, QuestionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
