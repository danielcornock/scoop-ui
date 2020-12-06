import { ILabelValue } from 'src/app/shared/interfaces/label-value.interface';

import { INetWorthCustomValues } from './net-worth-custom-values.interface';
import { INetWorthGoal } from './net-worth-goal.interface';
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
  barChartData: Array<ILabelValue>;
  projectedNetWorth: Array<ILabelValue>;
  goals: Array<INetWorthGoal>;
  goalsFields: Array<string>;
}
