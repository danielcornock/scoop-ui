import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit {
  @Input()
  public control: FormControl;

  @Input()
  public name: string;

  @Input()
  public label: string;

  @Input()
  public type = 'text';

  public isRequired: boolean;

  constructor() {}

  ngOnInit(): void {
    this.isRequired = this._getRequiredStatus();
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
