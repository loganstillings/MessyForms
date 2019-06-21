import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { IConditionType } from '../../model/interfaces/condition-type';
import { ConditionTypes } from '../../model/static-lists/condition-types';
import { QuestionTypesEnum } from '../../model/enums/QuestionTypes';
import { ConditionTypesEnum } from '../../model/enums/ConditionTypes';

@Component({
  selector: 'app-sub-input',
  templateUrl: './sub-input.component.html',
})
export class SubInputComponent implements OnInit, OnDestroy {
  @Input() index: number;
  @Input() formGroup: FormGroup;
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
    if (this.parentQuestionTypeId !== QuestionTypesEnum.Number) {
      this.conditionTypes = ConditionTypes.filter((ct: IConditionType) => {
        return ct.Id === ConditionTypesEnum.Equals;
      });
    } else {
      this.conditionTypes = ConditionTypes;
    }
  }

  subscribeToParentQuestionTypeIdChange(): void {
    this.subscriptions = this.formGroup.parent.parent
      .get('QuestionTypeId')
      .valueChanges.subscribe(() => {
        this.getParentQuestionTypeId();
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
