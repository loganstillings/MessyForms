import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { Dexie } from 'dexie';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'MessyForms';
  customBuiltForm: FormArray;
  db: Dexie;

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
  ) {}

  ngOnInit(): void {
    this.commonService.getAll().then((questions) => {
      console.log(questions);
      if (questions && questions.length) {
        let questionFormGroups: FormGroup[] = [];
        questions.forEach((q) => {
          let group = this.formBuilder.group({
            Question: q.Question,
            QuestionTypeId: q.QuestionTypeId,
            SubInputs: this.getSubInPutsFormArray(q.SubInputs),
          });
          questionFormGroups.push(group);
        });
        this.customBuiltForm = this.formBuilder.array(questionFormGroups);
      } else {
        this.customBuiltForm = this.formBuilder.array([]);
      }
    });
  }

  addInput(): void {
    this.customBuiltForm.push(
      this.formBuilder.group({
        Question: null,
        QuestionTypeId: null,
        SubInputs: this.formBuilder.array([]),
      }),
    );
  }

  save(): void {
    this.commonService.bulkAdd(this.customBuiltForm.value);
  }

  hasSubInputs(group: FormGroup): boolean {
    return this.commonService.hasSubInputs(group);
  }

  getSubInPutsFormArray(subInputs: any[]): FormArray {
    let formGroups: FormGroup[] = [];
    subInputs.forEach((si) => {
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
}
