import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question-base',
  templateUrl: './question-base.component.html',
})
export class QuestionBaseComponent implements OnInit {
  @Input('index') index: number;
  @Input('formGroup') formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {}

  delete(): void {
    console.log(this.index);
  }

  addSubInput(): void {
    let subInputs = this.formGroup.get('SubInputs');
    subInputs['controls'].push(
      this.formBuilder.group({
        Question: '',
        Type: 0,
        SubInputs: this.formBuilder.array([]),
      }),
    );
  }
}
