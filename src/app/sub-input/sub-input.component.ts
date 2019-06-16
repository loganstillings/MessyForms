import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IConditionType } from 'src/model/interfaces/condition-type';
import { ConditionTypes } from 'src/model/static-lists/condition-types';
import { QuestionTypesEnum } from 'src/model/enums/QuestionTypes';
import { ConditionTypesEnum } from 'src/model/enums/ConditionTypes';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sub-input',
  templateUrl: './sub-input.component.html',
})
export class SubInputComponent implements OnInit, OnDestroy {
  @Input('index') index: number;
  @Input('formGroup') formGroup: FormGroup;
  conditionTypes: IConditionType[] = [];
  parentQuestionTypeId: number;
  questionTypesEnum = QuestionTypesEnum;
  subscriptions: Subscription = new Subscription();
  constructor() {}

  ngOnInit() {
    this.getParentQuestionTypeId();
    this.subscribeToParentQuestionTypeIdChange();
  }

  getParentQuestionTypeId() {
    this.parentQuestionTypeId = this.formGroup.parent.parent.get(
      'QuestionTypeId',
    ).value;
    if (this.parentQuestionTypeId != QuestionTypesEnum.Number) {
      this.conditionTypes = ConditionTypes.filter((ct) => {
        return ct.Id == ConditionTypesEnum.Equals;
      });
    } else {
      this.conditionTypes = ConditionTypes;
    }
  }

  subscribeToParentQuestionTypeIdChange(): void {
    this.subscriptions = this.formGroup.parent.parent
      .get('QuestionTypeId')
      .valueChanges.subscribe((change) => {
        this.getParentQuestionTypeId();
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
