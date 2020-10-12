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
    this.summaryItems = [
      {
        label: 'Net Worth',
        value: '£13000'
      },
      {
        label: 'Total Saved',
        value: '£8100'
      },
      {
        label: 'Total Investments',
        value: '£2700'
      },
      {
        label: 'Change',
        value: '£1200'
      }
    ];
  }
}
