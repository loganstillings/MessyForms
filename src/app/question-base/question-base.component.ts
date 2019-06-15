import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-question-base',
  templateUrl: './question-base.component.html',
})
export class QuestionBaseComponent implements OnInit {
  @Input('index') index: number;
  @Input('formGroup') formGroup: FormGroup;
  constructor(private commonService: CommonService) {}

  ngOnInit() {}

  delete(): void {
    this.commonService.delete(this.index);
  }

  addSubInput(): void {
    this.commonService.addSubInput(this.formGroup);
  }
}
