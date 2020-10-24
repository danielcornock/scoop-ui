import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/core/services/http/http.service';
import {
  IDashboardSummaryItem,
} from 'src/app/shared/components/dashboard-summary/interfaces/dashboard-summary-item.interface';

import { INetWorthApiMetaResponse, INetWorthApiResponse } from '../../interfaces/net-worth-api-response.interface';

@Component({
  selector: 'app-net-worth',
  templateUrl: './net-worth.component.html',
  styleUrls: ['./net-worth.component.scss']
})
export class NetWorthComponent implements OnInit {
  public summaryItems: Array<IDashboardSummaryItem>;
  public netWorthItems: Array<INetWorthApiResponse>;
  public netWorthMeta: INetWorthApiMetaResponse;

  constructor(
    private readonly _httpService: HttpService,
    private readonly _currency: CurrencyPipe,
    private readonly _spinnerService: NgxSpinnerService
  ) {}

  async ngOnInit(): Promise<void> {
    this._spinnerService.show();
    await this._getNetWorthEntries();
    this._assignSummaryItems();
    this._spinnerService.hide();
  }

  private async _getNetWorthEntries(): Promise<void> {
    const { data, meta } = await this._httpService.get('net-worth');
    this.netWorthMeta = meta;
    this.netWorthItems = data;
  }

  private _assignSummaryItems(): void {
    const rawData = this.netWorthMeta.summaryItems;

    if (!rawData) {
      return;
    }

    this.summaryItems = rawData.map((item) => {
      return {
        label: item.label,
        value: this._toCurrency(item.value),
        icon: item.icon
      };
    });
  }

  private _toCurrency(amount: number): string {
    return this._currency.transform(amount, '£', 'symbol', '1.0-0');
  }
}
