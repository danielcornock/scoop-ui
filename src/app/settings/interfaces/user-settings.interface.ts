import { IBaseHttpModel } from 'src/app/core/interfaces/base-http-model.interface';

export interface IUserSettings extends IBaseHttpModel {
  enableInvestments: boolean;
  enableNetWorth: boolean;
  enableMonthlyDistribution: boolean;
  preferredCurrency: string;
  enableEmailNotifications: boolean;
  reminderDate: string;
}
