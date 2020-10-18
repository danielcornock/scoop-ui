import { INetWorthCustomVaslues } from './net-worth-custom-values.interface';

export interface INetWorthApiResponse {
  date: string;
  total: number;
  change: number;
  customValues: INetWorthCustomVaslues;
}
