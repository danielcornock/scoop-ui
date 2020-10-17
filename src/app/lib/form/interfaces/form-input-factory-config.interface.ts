import { IFormInputValidationConfig } from './form-input-validation-config.interface';

export interface IFormInputFactoryConfig {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  defaultValue?: any;
  validators?: IFormInputValidationConfig;
}
