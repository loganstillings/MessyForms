import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-sub-inputs',
  templateUrl: './sub-inputs.component.html',
})
export class SubInputsComponent implements OnInit {
  @Input('parentFormGroup') parentFormGroup: FormGroup;
  subInputs: FormArray;
  constructor(private commonService: CommonService) {}

  ngOnInit() {
    let abstractControl = this.commonService.getSubInputs(this.parentFormGroup);
    this.subInputs = abstractControl['controls'];
    abstractControl.setParent(this.parentFormGroup);
    this.subInputs.forEach((subInput: FormGroup) => {
      subInput.setParent(this.parentFormGroup);
    });
  }

  hasSubInputs(group: FormGroup): boolean {
    return this.commonService.hasSubInputs(group);
  }
}
