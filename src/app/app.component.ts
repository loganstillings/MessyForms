import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { IConditionType } from 'src/model/interfaces/condition-type';
import { ConditionTypes } from 'src/model/static-lists/condition-types';
import { IQuestionType } from 'src/model/interfaces/question-type';
import { QuestionTypes } from 'src/model/static-lists/question-types';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'MessyForms';
  customBuiltForm: FormArray;
  conditionTypes: IConditionType[] = ConditionTypes;
  questionTypes: IQuestionType[] = QuestionTypes;

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
  ) {}

  ngOnInit(): void {
    this.customBuiltForm = this.formBuilder.array([]);
  }

  addInput(): void {
    this.customBuiltForm.push(
      this.formBuilder.group({
        Question: '',
        Type: 0,
        SubInputs: this.formBuilder.array([]),
      }),
    );
  }

  createForm(): void {
    console.log(this.customBuiltForm);
  }

  hasSubInputs(group: FormGroup): boolean {
    return this.commonService.hasSubInputs(group);
  }

  getSubInputs(group: FormGroup): FormArray {
    return this.commonService.getSubInputs(group);
  }
}
