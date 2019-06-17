import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { DexieService } from './dexie.service';
import { Dexie } from 'dexie';
import { IQuestion } from 'src/model/interfaces/question';

@Injectable()
export class CommonService {
  private _formGroupSource = new BehaviorSubject<FormGroup>(new FormGroup({}));
  formGroup$ = this._formGroupSource.asObservable();
  table: Dexie.Table<IQuestion, number>;

  constructor(
    private formBuilder: FormBuilder,
    private dexieService: DexieService,
  ) {
    this.table = this.dexieService.table('questions');
  }

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

  saveForm(arr: IQuestion[]): void {
    this.table
      .bulkPut(arr)
      .then(function(lastKey) {
        console.log(lastKey);
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  getAll(): Dexie.Promise<IQuestion[]> {
    return this.table.orderBy(':id').toArray();
  }
}
