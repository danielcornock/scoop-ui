import { Component, OnInit } from '@angular/core';
import {
  IDashboardSummaryItem,
} from 'src/app/shared/components/dashboard-summary/interfaces/dashboard-summary-item.interface';

@Component({
  selector: 'app-net-worth',
  templateUrl: './net-worth.component.html',
  styleUrls: ['./net-worth.component.scss']
})
export class NetWorthComponent implements OnInit {
  public summaryItems: Array<IDashboardSummaryItem>;

  constructor() {}

  ngOnInit(): void {
    this._assignSummaryItems();
  }

  private _assignSummaryItems(): void {
    this.summaryItems = [
      {
        label: 'Net Worth',
        value: '£13000'
      },
      {
        label: 'Savings',
        value: '£8100'
      },
      {
        label: 'Investments',
        value: '£2700'
      },
      {
        label: 'Change this month',
        value: '£1200'
      }
    ];
  }
}
