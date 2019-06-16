import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { CommonService } from '../common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sub-inputs',
  templateUrl: './sub-inputs.component.html',
})
export class SubInputsComponent implements OnInit {
  @Input('parentFormGroup') parentFormGroup: FormGroup;
  subInputs: FormArray;
  subscriptions: Subscription = new Subscription();
  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.bindChanges();
    this.subscribeToChanges();
  }

  subscribeToChanges(): void {
    this.subscriptions = this.commonService.formGroup$.subscribe(() => {
      this.bindChanges();
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  bindChanges(): void {
    let abstractControl = this.commonService.getSubInputs(this.parentFormGroup);
    this.subInputs = abstractControl['controls'];
    abstractControl.setParent(this.parentFormGroup);
    for (var i = 0; i < this.subInputs.length; i++) {
      if (!this.subInputs[i].parent) {
        this.subInputs[i].setParent(this.parentFormGroup.get(
          'SubInputs',
        ) as FormArray);
      }
    }
  }

  hasSubInputs(group: FormGroup): boolean {
    return this.commonService.hasSubInputs(group);
  }
}
