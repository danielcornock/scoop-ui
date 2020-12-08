import { IBaseHttpModel } from 'src/app/core/interfaces/base-http-model.interface';
import { IHttpResponse } from 'src/app/core/services/http/interfaces/http-response.interface';

import { IInvestmentsMeta } from './investments-meta.interface';

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

export type IInvestmentModelResponse = IHttpResponse<IInvestmentLog, undefined>;

export type IInvestmentCollectionResponse = IHttpResponse<
  IInvestmentLog[],
  IInvestmentsMeta
>;
