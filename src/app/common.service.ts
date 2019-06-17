import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ISubInput } from '../model/interfaces/sub-input';
import { IQuestion } from '../model/interfaces/question';

@Injectable()
export class CommonService {
  private _formGroupSource = new BehaviorSubject<FormGroup>(new FormGroup({}));
  formGroup$ = this._formGroupSource.asObservable();

  constructor(private formBuilder: FormBuilder) {}

  delete(index: number, formGroup: FormGroup): void {
    let parent: FormArray = formGroup.parent as FormArray;
    if (parent) {
      parent['controls'].splice(index, 1);
    }
  }

  addSubInput(formGroup: FormGroup): void {
    this.getSubInputs(formGroup)['controls'].push(
      this.formBuilder.group({
        Question: null,
        QuestionTypeId: null,
        SubInputs: this.formBuilder.array([]),
        ConditionTypeId: null,
        ConditionValue: null,
      }),
    );
    this._formGroupSource.next(formGroup);
  }

  hasSubInputs(group: FormGroup): boolean {
    let subInputs = this.getSubInputs(group);
    let hasSubInputs =
      subInputs && subInputs['controls'] && subInputs['controls'].length;
    return hasSubInputs;
  }

  getSubInputs(group: FormGroup): AbstractControl {
    return group.get('SubInputs');
  }

  getSubInputsValue(subInputFormGroup: FormGroup): any {
    let subInput: ISubInput = {
      Id: null,
      Question: subInputFormGroup.get('Question').value,
      QuestionTypeId: subInputFormGroup.get('QuestionTypeId').value,
      ConditionTypeId: subInputFormGroup.get('ConditionTypeId').value,
      ConditionValue: subInputFormGroup.get('ConditionValue').value,
      SubInputs: subInputFormGroup.get('SubInputs')['controls'].map((sifg) => {
        return this.getSubInputsValue(sifg);
      }),
    };
    return subInput;
  }

  getFormGroupValue(formGroup: FormGroup) {
    let question: IQuestion = {
      Id: formGroup.get('Id').value,
      Question: formGroup.get('Question').value,
      QuestionTypeId: formGroup.get('QuestionTypeId').value,
      SubInputs: formGroup
        .get('SubInputs')
        ['controls'].map((subInputFormGroup: FormGroup) => {
          return this.getSubInputsValue(subInputFormGroup);
        }),
    };
    return question;
  }
}
