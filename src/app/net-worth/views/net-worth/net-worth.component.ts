import { CurrencyPipe } from '@angular/common';
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

  constructor(
    private readonly _httpService: HttpService,
    private readonly _currency: CurrencyPipe
  ) {}

  async ngOnInit(): Promise<void> {
    await this._getNetWorthEntries();
    this._assignSummaryItems();
  }

  private async _getNetWorthEntries(): Promise<void> {
    const { data } = await this._httpService.get('net-worth');

    this.netWorthItems = data;
  }

  private _assignSummaryItems(): void {
    const latestNetWorth = this.netWorthItems[0];

    this.summaryItems = [
      {
        label: 'Net Worth',
        value: this._toCurrency(latestNetWorth.total)
      },
      {
        label: 'Savings',
        value: this._toCurrency(latestNetWorth.customValues.savings)
      },
      {
        label: 'Investments',
        value: this._toCurrency(latestNetWorth.customValues.investments)
      },
      {
        label: 'Change this month',
        value: this._toCurrency(latestNetWorth.change)
      }
    ];
  }

  private _toCurrency(amount: number): string {
    return this._currency.transform(amount, '£', 'symbol', '1.0-0');
  }
}
