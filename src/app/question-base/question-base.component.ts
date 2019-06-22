import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormService } from '../../services/form.service';
import { IQuestionType } from '../../model/interfaces/question-type';
import { QuestionTypes } from '../../model/static-lists/question-types';

@Component({
  selector: 'app-question-base',
  templateUrl: './question-base.component.html',
})
export class QuestionBaseComponent {
  @Input() index: number;
  @Input() formGroup: FormGroup;
  questionTypes: IQuestionType[] = QuestionTypes;

  constructor(private formService: FormService) {}

  delete(): void {
    this.formService.delete(this.index, this.formGroup);
  }

  addSubInput(): void {
    this.formService.addSubInput(this.formGroup);
  }
}
