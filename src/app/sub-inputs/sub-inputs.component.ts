import { Component, OnInit, Input } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-sub-inputs',
  templateUrl: './sub-inputs.component.html',
})
export class SubInputsComponent implements OnInit {
  @Input('subInputs') subInputs: FormArray;
  constructor() {}

  ngOnInit() {}
}
