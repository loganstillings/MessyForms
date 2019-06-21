import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CommonService } from '../../services/common.service';
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

  constructor(private commonService: CommonService) {}

  delete(): void {
    this.commonService.delete(this.index, this.formGroup);
  }

  addSubInput(): void {
    this.commonService.addSubInput(this.formGroup);
  }
}
