import { IBaseHttpModel } from 'src/app/core/interfaces/base-http-model.interface';

export interface INetWorthGoal extends IBaseHttpModel {
  endDate?: string;
  target: number;
  current: number;
  fields: Array<string>;
  percentage: number;
  title: string;
  startingAmount: number;
  startDate: number;
  completed: boolean;
  isHidden: boolean;
  hasReceivedCongratulations: boolean;
  completedOn: number;
}
