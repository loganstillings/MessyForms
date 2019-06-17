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
      if (questions && questions.length) {
        console.log(questions);
        this.customBuiltForm = this.formBuilder.array([]);
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

  createForm(): void {
    this.commonService.bulkAdd(this.customBuiltForm.value);
  }

  hasSubInputs(group: FormGroup): boolean {
    return this.commonService.hasSubInputs(group);
  }
}
