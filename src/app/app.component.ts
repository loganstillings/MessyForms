import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { CommonService } from './common.service';
import { ISubInput } from '../model/interfaces/sub-input';
import { IQuestion } from '../model/interfaces/question';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'MessyForms';
  customBuiltForm: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private questionService: QuestionService,
  ) {}

  ngOnInit(): void {
    this.getQuestionsFromIndexedDb();
  }

  getQuestionsFromIndexedDb(): void {
    this.questionService.getAll().then((questions: IQuestion[]) => {
      this.buildFormArray(questions);
    });
  }

  buildFormArray(questions): void {
    if (questions && questions.length) {
      this.customBuiltForm = this.formBuilder.array(
        this.getQuestionFormGroups(questions),
      );
    } else {
      this.customBuiltForm = this.formBuilder.array([]);
    }
  }

  addInput(): void {
    this.customBuiltForm.push(
      this.formBuilder.group({
        Id: this.customBuiltForm.length + 1,
        Question: null,
        QuestionTypeId: null,
        SubInputs: this.formBuilder.array([]),
      }),
    );
  }

  save(): void {
    this.questionService.saveForm(this.getFormValue());
  }

  hasSubInputs(group: FormGroup): boolean {
    return this.commonService.hasSubInputs(group);
  }

  showSaveButton(): boolean {
    return this.customBuiltForm.controls.length > 0;
  }

  getQuestionFormGroups(questions): FormGroup[] {
    let questionFormGroups: FormGroup[] = [];
    questions.forEach((q) => {
      let group = this.formBuilder.group({
        Id: q.Id,
        Question: q.Question,
        QuestionTypeId: q.QuestionTypeId,
        SubInputs: this.getSubInPutsFormArray(q.SubInputs),
      });
      questionFormGroups.push(group);
    });
    return questionFormGroups;
  }

  getSubInPutsFormArray(subInputs: ISubInput[]): FormArray {
    let formGroups: FormGroup[] = [];
    subInputs.forEach((si: ISubInput) => {
      let group = this.formBuilder.group({
        Question: si.Question,
        QuestionTypeId: si.QuestionTypeId,
        ConditionValue: si.ConditionValue,
        ConditionTypeId: si.ConditionTypeId,
        SubInputs: this.getSubInPutsFormArray(si.SubInputs),
      });
      formGroups.push(group);
    });
    return this.formBuilder.array(formGroups);
  }

  getFormValue(): any {
    let value = [];
    this.customBuiltForm.controls.forEach((question: FormGroup) => {
      value.push(this.commonService.getFormGroupValue(question));
    });
    return value;
  }
}
