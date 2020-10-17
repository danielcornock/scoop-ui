import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormInputField } from 'src/app/lib/form/instances/form-input-field/form-input-field';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit {
  @Input()
  public formInputField: FormInputField;

  @Input()
  public type = 'text';

  public control: FormControl;
  public isRequired: boolean;

  constructor() {}

  ngOnInit(): void {
    this.control = this.formInputField.control;
    this.isRequired = this._getRequiredStatus();
  }

  public get isErrored(): boolean {
    return this.control.touched && this.control.invalid;
  }

  private _getRequiredStatus(): boolean {
    if (this.control.validator) {
      const validator = this.control.validator({} as FormControl);
      if (validator && validator.required) {
        return true;
      }
    }
  }
}
