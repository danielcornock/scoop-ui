import { IHttpResponse } from 'src/app/core/services/http/interfaces/http-response.interface';
import { ILabelValue } from 'src/app/shared/interfaces/label-value.interface';

import { INetWorthCustomValues } from './net-worth-custom-values.interface';
import { INetWorthGoal } from './net-worth-goal.interface';
import { INetWorthSummaryItem } from './net-worth-summary-item.interface';

export interface INetWorthData {
  _id: string;
  date: string;
  total: number;
  change: number;
  customValues: INetWorthCustomValues;
}

export interface INetWorthMeta {
  preferredCurrency: string;
  fields: Array<string>;
  summaryItems: Array<INetWorthSummaryItem>;
  barChartData: Array<ILabelValue>;
  projectedNetWorth: Array<ILabelValue>;
  goals: Array<INetWorthGoal>;
  goalsFields: Array<string>;
}

export type INetWorthCollectionResponse = IHttpResponse<
  INetWorthData[],
  INetWorthMeta
>;
export type INetWorthModelResponse = IHttpResponse<
  INetWorthData,
  INetWorthMeta
>;
