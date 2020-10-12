import { Component, Input, OnInit } from '@angular/core';

import { IDashboardSummaryItem } from './interfaces/dashboard-summary-item.interface';

@Component({
  selector: 'app-dashboard-summary',
  templateUrl: './dashboard-summary.component.html',
  styleUrls: ['./dashboard-summary.component.scss']
})
export class DashboardSummaryComponent implements OnInit {
  @Input()
  public dashboardSummaryItems: Array<IDashboardSummaryItem>;

  constructor() {}

  ngOnInit(): void {}
}
