import { FormGroup } from '@angular/forms';

import { FormInputField } from '../form-input-field/form-input-field';

export class FormContainer {
  constructor(inputs: Array<FormInputField>, formGroup: FormGroup) {
    this.fields = inputs;
    this.formGroup = formGroup;
  }

  public formGroup: FormGroup;
  public errors: any;
  public fields: Array<FormInputField>;

  public get value(): any {
    return this.formGroup.value;
  }
}
