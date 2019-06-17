import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { CommonService } from './common.service';
import { ISubInput } from 'src/model/interfaces/sub-input';
import { IQuestion } from 'src/model/interfaces/question';

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
  ) {}

  ngOnInit(): void {
    this.commonService.getAll().then((questions: IQuestion[]) => {
      if (questions && questions.length) {
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
        this.customBuiltForm = this.formBuilder.array(questionFormGroups);
      } else {
        this.customBuiltForm = this.formBuilder.array([]);
      }
    });
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
    this.commonService.saveForm(this.customBuiltForm.value);
    /*
      TODOs:
      1. Clean this up so as to 'merge' the form state instead of bulk adding
      2. Remove 'any' and create interfaces for everythin
      3. Add Id properties in those interfaces, associate it with index?
      4. Clean up this component, the ngOnInit is too big and the recursive function needs a nother look
      5. Move the dexie stuff into its own service
      6. Figure out why deleting the form control does not remove the value from the parent
    */
  }

  hasSubInputs(group: FormGroup): boolean {
    return this.commonService.hasSubInputs(group);
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
}
