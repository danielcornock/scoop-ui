import { IBaseHttpModel } from 'src/app/core/interfaces/base-http-model.interface';

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
