import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/core/services/http/http.service';
import {
  IDashboardSummaryItem,
} from 'src/app/shared/components/dashboard-summary/interfaces/dashboard-summary-item.interface';

import { IInvestmentLog } from '../../interfaces/investment-log.interface';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss']
})
export class InvestmentsComponent implements OnInit {
  public summaryItems: Array<IDashboardSummaryItem>;
  public investmentLogs: Array<IInvestmentLog>;

  constructor(
    private readonly _httpService: HttpService,
    private readonly _spinnerService: NgxSpinnerService,
    private readonly _currencyPipe: CurrencyPipe
  ) {}

  async ngOnInit(): Promise<void> {
    this._spinnerService.show();
    await this._fetchInvestmentLogs();
    this._spinnerService.hide();

    if (!this.investmentLogs.length) {
      return;
    }

    this._assignSummaryLogs();
  }

  private _assignSummaryLogs(): void {
    this.summaryItems = [
      {
        label: 'Total Returns',
        value: this._toCurrency(this.investmentLogs[0].profit),
        icon: 'dollar-sign'
      },
      {
        label: 'Percentage Returns',
        value: this._toPercentage(this.investmentLogs[0].profitPercentage),
        icon: 'trending-up'
      },
      {
        label: 'Investment Value',
        value: this._toCurrency(this.investmentLogs[0].totalValue),
        icon: 'chevrons-up'
      },
      {
        label: 'Invested',
        value: this._toCurrency(this.investmentLogs[0].totalInvested),
        icon: 'save'
      }
    ];
  }

  private async _fetchInvestmentLogs(): Promise<void> {
    const { data } = await this._httpService.get<IInvestmentLog[]>(
      'investments'
    );
    this.investmentLogs = data;
  }

  private _toPercentage(value: number): string {
    return `${value * 100}%`;
  }

  private _toCurrency(amount: number): string {
    return this._currencyPipe.transform(amount, '£', 'symbol', '1.0-0');
  }
}
