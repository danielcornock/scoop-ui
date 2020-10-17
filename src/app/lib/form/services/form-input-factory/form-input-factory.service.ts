import { Injectable } from '@angular/core';
import { FormBuilder, ValidatorFn, Validators } from '@angular/forms';

import { FormInputField } from '../../instances/form-input-field/form-input-field';
import { IFormInputFactoryConfig } from '../../interfaces/form-input-factory-config.interface';
import { IFormInputValidationConfig } from '../../interfaces/form-input-validation-config.interface';

@Injectable({
  providedIn: 'root'
})
export class FormInputFactory {
  constructor(private readonly _formBuilder: FormBuilder) {}

  public create(config: IFormInputFactoryConfig): FormInputField {
    return new FormInputField({
      ...config,
      control: this._formBuilder.control(
        config.defaultValue,
        this._buildValidation(config.validators)
      )
    });
  }

  private _buildValidation(
    config?: IFormInputValidationConfig
  ): Array<ValidatorFn> {
    const validators = [];

    if (!config) {
      return validators;
    }

    if (config.required) {
      validators.push(Validators.required);
    }

    if (config.email) {
      validators.push(Validators.email);
    }

    return validators;
  }
}
