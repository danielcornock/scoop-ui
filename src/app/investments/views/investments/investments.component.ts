import { Component, OnInit } from '@angular/core';
import {
  IDashboardSummaryItem,
} from 'src/app/shared/components/dashboard-summary/interfaces/dashboard-summary-item.interface';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss']
})
export class InvestmentsComponent implements OnInit {
  public summaryItems: Array<IDashboardSummaryItem>;

  constructor() {}

  ngOnInit(): void {
    this.summaryItems = [
      { label: 'Total Returns', value: '£300' },
      { label: 'Percentage Returns', value: '11.2%' },
      { label: 'Investment Value', value: '£3000' },
      { label: 'Invested', value: '£2700' }
    ];
  }
}
