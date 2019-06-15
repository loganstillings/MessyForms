import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IConditionType } from 'src/model/interfaces/condition-type';
import { ConditionTypes } from 'src/model/static-lists/condition-types';

@Component({
  selector: 'app-sub-input',
  templateUrl: './sub-input.component.html',
})
export class SubInputComponent implements OnInit {
  @Input('index') index: number;
  @Input('formGroup') formGroup: FormGroup;
  conditionTypes: IConditionType[] = ConditionTypes;
  constructor() {}

  ngOnInit() {}
}
