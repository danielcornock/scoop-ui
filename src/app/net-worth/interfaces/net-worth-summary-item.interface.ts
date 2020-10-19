import {
  IDashboardSummaryItem,
} from 'src/app/shared/components/dashboard-summary/interfaces/dashboard-summary-item.interface';

export interface INetWorthSummaryItem extends IDashboardSummaryItem {
  value: number;
}
