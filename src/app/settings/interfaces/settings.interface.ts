export interface ISettings {
  netWorthFields: Array<string>;
  netWorthSummaryItems: Array<INetWorthSummaryItemConfig>;
  netWorthSummaryOptions: Array<INetWorthSummaryItemConfig>;
}

export interface INetWorthSummaryItemConfig {
  label: string;
  sumOf: string[];
  icon?: string;
}
