import { Dictionary } from 'lodash';

import { ISalary } from './salary.interface';

export interface ISalaryMeta {
  preferredCurrency: string;
  fields: Dictionary<string>;
  summaryItems: Dictionary<number>;
  latestDeductions: ISalary;
}
