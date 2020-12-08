import { Dictionary } from 'lodash';
import { IBaseHttpModel } from 'src/app/core/interfaces/base-http-model.interface';
import { IHttpResponse } from 'src/app/core/services/http/interfaces/http-response.interface';

import { IMonthlyDistributionMeta } from './monthly-distribution-meta.interface';

export interface IMonthlyDistributionLog extends IBaseHttpModel {
  date: string;
  income: Dictionary<number>;
  outgoing: Dictionary<number>;
  remaining: number;
}

export interface IMonthlyDistributionModelMeta {
  incomeFields: Array<string>;
  outgoingFields: Array<string>;
}
export type IMonthlyDistributionCollectionResponse = IHttpResponse<
  IMonthlyDistributionLog[],
  IMonthlyDistributionMeta
>;

export type IMonthlyDistributionModelResponse = IHttpResponse<
  IMonthlyDistributionLog,
  IMonthlyDistributionModelMeta
>;
