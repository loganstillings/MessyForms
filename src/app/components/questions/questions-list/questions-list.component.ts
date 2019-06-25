import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { FormService } from '../../../../services/form.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
})
export class QuestionsListComponent {
  @Input() customBuiltForm: FormArray;
  constructor(private formService: FormService) {}

  hasSubInputs(group: FormGroup): boolean {
    return this.formService.hasSubInputs(group);
  }
}
