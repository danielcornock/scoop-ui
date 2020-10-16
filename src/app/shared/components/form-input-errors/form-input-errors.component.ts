import { Component, Input, OnChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form-input-errors',
  templateUrl: './form-input-errors.component.html',
  styleUrls: ['./form-input-errors.component.scss']
})
export class FormInputErrorsComponent implements OnChanges {
  @Input()
  public errors: ValidationErrors;

  public errorText: string;

  constructor() {}

  public ngOnChanges(): void {
    this._getErrors();
  }

  private _getErrors(): void {
    if (this.errors.required) {
      this.errorText = 'This field is required.';
    } else if (this.errors.email) {
      this.errorText = 'This is not a valid email address.';
    } else {
      this.errorText = undefined;
    }
  }
}
