import { IBaseHttpModel } from 'src/app/core/interfaces/base-http-model.interface';

export interface IInvestmentLog extends IBaseHttpModel {
  user: string;
  date: string;
  totalInvested: number;
  totalValue: number;
  profit: number;
  profitPercentage: number;
  addedSinceLast: number;
  profitChangeSinceLast: number;
}
