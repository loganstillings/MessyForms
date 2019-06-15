import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-sub-inputs',
  templateUrl: './sub-inputs.component.html',
})
export class SubInputsComponent implements OnInit {
  @Input('subInputs') subInputs: FormArray;
  constructor(private commonService: CommonService) {}

  ngOnInit() {}

  hasSubInputs(group: FormGroup): boolean {
    return this.commonService.hasSubInputs(group);
  }

  getSubInputs(group: FormGroup): FormArray {
    return this.commonService.getSubInputs(group);
  }
}
