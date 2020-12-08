import { IBaseHttpModel } from 'src/app/core/interfaces/base-http-model.interface';
import { IHttpResponse } from 'src/app/core/services/http/interfaces/http-response.interface';

import { ISalaryMeta } from './salary-meta.interface';

export interface ISalary extends IBaseHttpModel {
  user: string;
  date: string;
  grossSalary: number;
  incomeTax: number;
  nationalInsurance: number;
  studentFinance: number;
  pensionContributions: number;
  otherDeductions: number;
  netSalary: number;
}

export type ISalaryModelResponse = IHttpResponse<ISalary, undefined>;
export type ISalaryCollectionResponse = IHttpResponse<ISalary[], ISalaryMeta>;
