import { Dictionary } from 'lodash';

export interface IMonthlyDistributionLog {
  date: string;
  income: Dictionary<number>;
  outgoing: Dictionary<number>;
  remaining: number;
}
