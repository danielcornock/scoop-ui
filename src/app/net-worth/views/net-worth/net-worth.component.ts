import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import {
  IDashboardSummaryItem,
} from 'src/app/shared/components/dashboard-summary/interfaces/dashboard-summary-item.interface';

import { INetWorthApiResponse } from '../../interfaces/net-worth-api-response.interface';

@Component({
  selector: 'app-net-worth',
  templateUrl: './net-worth.component.html',
  styleUrls: ['./net-worth.component.scss']
})
export class NetWorthComponent implements OnInit {
  public summaryItems: Array<IDashboardSummaryItem>;
  public netWorthItems: Array<INetWorthApiResponse>;

  constructor(private readonly _httpService: HttpService) {}

  ngOnInit(): void {
    this._getNetWorthEntries();
    this._assignSummaryItems();
  }

  private async _getNetWorthEntries(): Promise<void> {
    const { data } = await this._httpService.get('net-worth');

    this.netWorthItems = data;
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
