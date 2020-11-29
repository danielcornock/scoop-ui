import { ILabelValuePair } from 'ngx-form-trooper/lib/interfaces/key-value.interface';

import { INetWorthCustomValues } from './net-worth-custom-values.interface';
import { INetWorthSummaryItem } from './net-worth-summary-item.interface';

export interface INetWorthApiResponse {
  _id: string;
  date: string;
  total: number;
  change: number;
  customValues: INetWorthCustomValues;
}

export interface INetWorthApiMetaResponse {
  preferredCurrency: string;
  fields: Array<string>;
  summaryItems: Array<INetWorthSummaryItem>;
  barChartData: Array<ILabelValuePair>;
  projectedNetWorth: Array<ILabelValuePair>;
}
