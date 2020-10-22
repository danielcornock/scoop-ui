import { Component, Input, OnInit } from '@angular/core';
import { NgxFormInputComponent } from 'ngx-form-trooper';

@Component({
  selector: 'ngx-form-input-multi-select',
  templateUrl: './form-input-multi-select.component.html',
  styleUrls: ['./form-input-multi-select.component.scss']
})
export class FormInputMultiSelectComponent extends NgxFormInputComponent
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
