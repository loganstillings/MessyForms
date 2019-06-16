import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  AbstractControl,
} from '@angular/forms';

@Injectable()
export class CommonService {
  constructor(private formBuilder: FormBuilder) {}

  delete(index: number, formGroup: FormGroup): void {
    if (formGroup.parent) {
      (<FormArray>formGroup.parent)['controls'].splice(index, 1);
    }
  }

  addSubInput(formGroup: FormGroup): void {
    formGroup.get('SubInputs')['controls'].push(
      this.formBuilder.group({
        Question: null,
        QuestionTypeId: null,
        SubInputs: this.formBuilder.array([]),
        ConditionTypeId: null,
        ConditionValue: null,
      }),
    );
  }

  hasSubInputs(group: FormGroup): boolean {
    let subInputs = group.get('SubInputs');
    let hasSubInputs =
      subInputs && subInputs['controls'] && subInputs['controls'].length;
    return hasSubInputs;
  }

  getSubInputs(group: FormGroup): AbstractControl {
    return group.get('SubInputs');
  }
}
