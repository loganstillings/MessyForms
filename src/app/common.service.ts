import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Injectable()
export class CommonService {
  constructor(private formBuilder: FormBuilder) {}

  delete(index: number): void {
    console.log(index);
  }

  addSubInput(formGroup: FormGroup): void {
    let subInputs = formGroup.get('SubInputs');
    subInputs['controls'].push(
      this.formBuilder.group({
        Question: '',
        QuestionTypeId: 0,
        SubInputs: this.formBuilder.array([]),
        ConditionTypeId: 0,
      }),
    );
  }

  hasSubInputs(group: FormGroup): boolean {
    let subInputs = group.get('SubInputs');
    let hasSubInputs = subInputs['controls'] && subInputs['controls'].length;
    return hasSubInputs;
  }

  getSubInputs(group: FormGroup): FormArray {
    let subInputs = group.get('SubInputs');
    return subInputs['controls'];
  }
}
