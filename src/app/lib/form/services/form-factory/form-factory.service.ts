import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forEach } from 'lodash';

import { FormContainer } from '../../instances/form-container/form-container';
import { FormInputField } from '../../instances/form-input-field/form-input-field';
import { IFormFactoryConfig } from '../../interfaces/form-factory-config.interface';
import { IFormInputFactoryConfig } from '../../interfaces/form-input-factory-config.interface';
import { FormInputFactory } from '../form-input-factory/form-input-factory.service';

@Injectable({
  providedIn: 'root'
})
export class FormFactory {
  constructor(
    private readonly _formInputFactory: FormInputFactory,
    private readonly _formBuilder: FormBuilder
  ) {}

  public createForm(config: IFormFactoryConfig): FormContainer {
    const inputs = this._createInputs(config);
    const formGroupConfig = {};

    forEach(inputs, (item) => {
      formGroupConfig[item.name] = item.control;
    });

    const formGroup: FormGroup = this._formBuilder.group(formGroupConfig);

    return new FormContainer(inputs, formGroup);
  }

  private _createInputs(config: IFormFactoryConfig): Array<FormInputField> {
    return config.map((fieldConfig: IFormInputFactoryConfig) => {
      return this._formInputFactory.create(fieldConfig);
    });
  }
}
