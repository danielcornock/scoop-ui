import { Component, EventEmitter, Input, Output } from '@angular/core';

import { INetWorthSummaryItemConfig } from '../../interfaces/settings.interface';

@Component({
  selector: 'app-dashboard-summary-config-item',
  templateUrl: './dashboard-summary-config-item.component.html',
  styleUrls: ['./dashboard-summary-config-item.component.scss']
})
export class DashboardSummaryConfigItemComponent {
  @Input()
  public dashboardSummaryConfigItem: INetWorthSummaryItemConfig;

  @Output()
  public dashboardSummaryConfigItemRemove = new EventEmitter<void>();

  @Output()
  public dashboardSummaryConfigItemEdit = new EventEmitter<void>();

  constructor() {}

  public removeItem(): void {
    this.dashboardSummaryConfigItemRemove.emit();
  }

  public editItem(): void {
    this.dashboardSummaryConfigItemEdit.emit();
  }
}
