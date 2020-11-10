import { INetWorthSummaryItemConfig } from 'src/app/settings/interfaces/settings.interface';

export interface INetWorthSummaryFormModalConfig {
  fields: string[];
  existingData?: INetWorthSummaryItemConfig;
}
