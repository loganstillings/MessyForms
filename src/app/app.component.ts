import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { IConditionType } from 'src/model/interfaces/condition-type';
import { ConditionTypes } from 'src/model/static-lists/condition-types';
import { IQuestionType } from 'src/model/interfaces/question-type';
import { QuestionTypes } from 'src/model/static-lists/question-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'MessyForms';
  customBuiltForm: FormArray;
  conditionTypes: IConditionType[] = ConditionTypes;
  questionTypes: IQuestionType[] = QuestionTypes;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.customBuiltForm = this.formBuilder.array([]);
  }

  addInput(): void {
    this.customBuiltForm.push(
      this.formBuilder.group({
        Question: '',
        Type: 0,
      }),
    );
  }

  createForm(): void {
    console.log(this.customBuiltForm);
  }
}
