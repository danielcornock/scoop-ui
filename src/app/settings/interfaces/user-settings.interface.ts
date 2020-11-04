import { IBaseHttpModel } from 'src/app/core/interfaces/base-http-model.interface';

export interface IUserSettings extends IBaseHttpModel {
  enableInvestments: string;
  enableNetWorth: string;
  enableMonthlyDistribution: string;
  preferredCurrency: string;
  enableEmailNotifications: boolean;
  reminderDate: string;
}
