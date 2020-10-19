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
  fields: Array<string>;
  summaryItems: Array<INetWorthSummaryItem>;
}
