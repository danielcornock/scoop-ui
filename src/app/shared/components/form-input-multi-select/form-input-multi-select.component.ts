import { Component, Input, OnInit } from '@angular/core';

import { FormInputComponent } from '../form-input/form-input.component';

@Component({
  selector: 'app-form-input-multi-select',
  templateUrl: './form-input-multi-select.component.html',
  styleUrls: ['./form-input-multi-select.component.scss']
})
export class FormInputMultiSelectComponent extends FormInputComponent
  implements OnInit {
  @Input()
  formInputMultiSelectOptions: Array<string>;

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
