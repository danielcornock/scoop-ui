export interface ISettings {
  netWorthFields: Array<string>;
  netWorthSummaryItems: Array<INetWorthSummaryItemConfig>;
  netWorthSummaryOptions: Array<INetWorthSummaryItemConfig>;
  monthlyDistributionIncomeFields: string[];
  monthlyDistributionOutgoingFields: string[];
  salaryYearlySalary: number;
  salaryStudentFinance: string;
  salaryPensionContribution: number;
  salaryPensionBeforeTax: boolean;
}

export interface INetWorthSummaryItemConfig {
  label: string;
  sumOf: string[];
  icon?: string;
}
