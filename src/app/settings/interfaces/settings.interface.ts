export interface ISettings {
  netWorthFields: Array<string>;
  netWorthSummaryItems: Array<INetWorthSummaryItemConfig>;
  netWorthSummaryOptions: Array<INetWorthSummaryItemConfig>;
  monthlyDistributionIncomeFields: string[];
  monthlyDistributionOutgoingFields: string[];
}

export interface INetWorthSummaryItemConfig {
  label: string;
  sumOf: string[];
  icon?: string;
}
