import { FormControl } from '@angular/forms';

import { IFormInputFieldConfig } from '../../interfaces/form-input-field-config.interface';

export class FormInputField {
  public name: string;
  public label: string;
  public control: FormControl;
  public placeholder?: string;
  public type: string;

  constructor(config: IFormInputFieldConfig) {
    this.name = config.name;
    this.label = config.label;
    this.control = config.control;
    this.placeholder = config.placeholder;
    this.type = config.type || 'text';
  }
}
