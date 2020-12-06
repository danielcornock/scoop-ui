import { IFormFactoryConfig } from 'ngx-form-trooper';

export interface IFormModalConfig {
  title: string;
  formConfig: IFormFactoryConfig;
  onSubmit: (formValue: any) => Promise<void>;
  actionLabel: string;
}
