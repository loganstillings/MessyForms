import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FormService } from '../../../../services/form.service';

@Component({
  selector: 'app-sub-inputs-list',
  templateUrl: './sub-inputs-list.component.html',
})
export class SubInputsListComponent implements OnInit, OnDestroy {
  @Input() parentFormGroup: FormGroup;
  subInputs: FormArray;
  subscriptions: Subscription = new Subscription();
  constructor(private formService: FormService) {}

  ngOnInit() {
    this.bindChanges();
    this.subscribeToChanges();
  }

  subscribeToChanges(): void {
    this.subscriptions = this.formService.formGroup$.subscribe(() => {
      this.bindChanges();
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  bindChanges(): void {
    const abstractControl = this.formService.getSubInputs(this.parentFormGroup);
    this.subInputs = (abstractControl as any).controls;
    abstractControl.setParent(this.parentFormGroup);
    for (const i in this.subInputs) {
      if (!this.subInputs[i].parent) {
        this.subInputs[i].setParent(this.parentFormGroup.get(
          'SubInputs',
        ) as FormArray);
      }
    }
  }

  hasSubInputs(group: FormGroup): boolean {
    return this.formService.hasSubInputs(group);
  }
}
