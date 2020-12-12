import { Dictionary } from 'lodash';
import { IDateValue } from 'src/app/shared/interfaces/date-value.interface';

export interface IMonthlyDistributionMeta {
  fields: Array<string>;
  preferredCurrency: string;
  uncommittedSpendingData: Array<IDateValue>;
  allTimeDistribution: Dictionary<number>;
}
