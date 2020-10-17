import { FormControl } from '@angular/forms';

export interface IFormInputFieldConfig {
  name: string;
  label: string;
  type?: string;
  control: FormControl;
  placeholder?: string;
}
