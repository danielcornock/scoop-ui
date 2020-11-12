import { IBaseHttpModel } from 'src/app/core/interfaces/base-http-model.interface';

export interface ISalary extends IBaseHttpModel {
  user: string;
  date: string;
  grossSalary: number;
  incomeTax: number;
  nationalInsurance: number;
  studentLoanPayments: number;
  pensionContributions: number;
  netSalary: number;
}
