import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IConditionType } from 'src/model/interfaces/condition-type';
import { ConditionTypes } from 'src/model/static-lists/condition-types';
import { QuestionTypesEnum } from 'src/model/enums/QuestionTypes';
import { ConditionTypesEnum } from 'src/model/enums/ConditionTypes';

@Component({
  selector: 'app-sub-input',
  templateUrl: './sub-input.component.html',
})
export class SubInputComponent implements OnInit {
  @Input('index') index: number;
  @Input('formGroup') formGroup: FormGroup;
  conditionTypes: IConditionType[] = [];
  parentQuestionTypeId: number;
  constructor() {}

  ngOnInit() {
    this.getParentQuestionTypeId();
  }

  getParentQuestionTypeId() {
    console.log(this.formGroup);
    this.parentQuestionTypeId = this.formGroup.parent.parent.get(
      'QuestionTypeId',
    ).value;
    console.log(this.parentQuestionTypeId);
    if (this.parentQuestionTypeId != QuestionTypesEnum.Number) {
      this.conditionTypes = ConditionTypes.filter((ct) => {
        ct.Id == ConditionTypesEnum.Equals;
      });
    } else {
      this.conditionTypes = ConditionTypes;
    }
  }
}
