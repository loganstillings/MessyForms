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
export class FormService {
  private formGroupSource = new BehaviorSubject<FormGroup>(new FormGroup({}));
  formGroup$ = this.formGroupSource.asObservable();

  constructor(private formBuilder: FormBuilder) {}

  delete(index: number, formGroup: FormGroup): void {
    const parent: FormArray = formGroup.parent as FormArray;
    if (parent) {
      parent.controls.splice(index, 1);
    }
  }

  addSubInput(formGroup: FormGroup): void {
    (this.getSubInputs(formGroup) as FormArray).controls.push(
      this.formBuilder.group({
        Question: null,
        QuestionTypeId: null,
        SubInputs: this.formBuilder.array([]),
        ConditionTypeId: null,
        ConditionValue: null,
      }),
    );
    this.formGroupSource.next(formGroup);
  }

  hasSubInputs(group: FormGroup): boolean {
    const subInputs = this.getSubInputs(group) as FormArray;
    const hasSubInputs =
      subInputs && subInputs.controls && subInputs.controls.length > 0;
    return hasSubInputs;
  }

  getSubInputs(group: FormGroup): AbstractControl {
    return group.get('SubInputs');
  }

  getSubInputsValue(subInputFormGroup: FormGroup): ISubInput {
    const subInput: ISubInput = {
      Id: null,
      Question: subInputFormGroup.get('Question').value,
      QuestionTypeId: subInputFormGroup.get('QuestionTypeId').value,
      ConditionTypeId: subInputFormGroup.get('ConditionTypeId').value,
      ConditionValue: subInputFormGroup.get('ConditionValue').value,
      SubInputs: (subInputFormGroup.get('SubInputs') as FormArray).controls.map(
        (sifg: FormGroup) => {
          return this.getSubInputsValue(sifg);
        },
      ),
    };
    return subInput;
  }

  getFormGroupValue(formGroup: FormGroup) {
    const question: IQuestion = {
      Id: formGroup.get('Id').value,
      Question: formGroup.get('Question').value,
      QuestionTypeId: formGroup.get('QuestionTypeId').value,
      SubInputs: (formGroup.get('SubInputs') as FormArray).controls.map(
        (subInputFormGroup: FormGroup) => {
          return this.getSubInputsValue(subInputFormGroup);
        },
      ),
    };
    return question;
  }
}
