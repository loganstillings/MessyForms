import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';

import { FormService } from '../../../services/form.service';
import { QuestionService } from '../../../services/question.service';
import { IQuestion } from '../../../model/interfaces/question';
import { ISubInput } from '../../../model/interfaces/sub-input';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
})
export class FormBuilderComponent implements OnInit {
  title = 'MessyForms';
  customBuiltForm: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
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

  buildFormArray(questions: IQuestion[]): void {
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

  showSaveButton(): boolean {
    return this.customBuiltForm && this.customBuiltForm.controls.length > 0;
  }

  getQuestionFormGroups(questions: IQuestion[]): FormGroup[] {
    return questions.map((q: IQuestion) => {
      return this.formBuilder.group({
        Id: q.Id,
        Question: q.Question,
        QuestionTypeId: q.QuestionTypeId,
        SubInputs: this.getSubInPutsFormArray(q.SubInputs),
      });
    });
  }

  getSubInPutsFormArray(subInputs: ISubInput[]): FormArray {
    const formGroups = subInputs.map((si: ISubInput) => {
      return this.formBuilder.group({
        Question: si.Question,
        QuestionTypeId: si.QuestionTypeId,
        ConditionValue: si.ConditionValue,
        ConditionTypeId: si.ConditionTypeId,
        SubInputs: this.getSubInPutsFormArray(si.SubInputs),
      });
    });
    return this.formBuilder.array(formGroups);
  }

  getFormValue(): IQuestion[] {
    return this.customBuiltForm.controls.map((question: FormGroup) => {
      return this.formService.getFormGroupValue(question);
    });
  }
}
