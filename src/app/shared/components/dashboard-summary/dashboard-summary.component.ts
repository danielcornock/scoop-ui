import { Component, Input } from '@angular/core';

import { IDashboardSummaryItem } from './interfaces/dashboard-summary-item.interface';

@Component({
  selector: 'app-dashboard-summary',
  templateUrl: './dashboard-summary.component.html',
  styleUrls: ['./dashboard-summary.component.scss']
})
export class DashboardSummaryComponent {
  @Input()
  public dashboardSummaryItems: Array<IDashboardSummaryItem>;

  public maxItems = 4;
  public isExpanded = false;

  public expandItems(): void {
    this.isExpanded = !this.isExpanded;
    this.maxItems = this.isExpanded ? undefined : 4;
  }
}
