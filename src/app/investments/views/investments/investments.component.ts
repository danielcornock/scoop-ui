import { CurrencyPipe, PercentPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  IDashboardSummaryItem,
} from 'src/app/shared/components/dashboard-summary/interfaces/dashboard-summary-item.interface';

import { IInvestmentLog } from '../../interfaces/investment-log.interface';
import { IInvestmentsMeta } from '../../interfaces/investments-meta.interface';
import { InvestmentsStoreService } from '../../services/investments-store/investments-store.service';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss']
})
export class InvestmentsComponent implements OnInit, OnDestroy {
  public summaryItems: Array<IDashboardSummaryItem>;
  public investmentLogs: Array<IInvestmentLog>;
  public investmentsMeta: IInvestmentsMeta;

  private _destroy$ = new Subject<void>();

  constructor(
    private readonly _store: InvestmentsStoreService,
    private readonly _currencyPipe: CurrencyPipe,
    private readonly _percentPipe: PercentPipe,
    private readonly _router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this._store
      .getAll$()
      .pipe(takeUntil(this._destroy$))
      .subscribe(this._assignData.bind(this));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public createNew(): void {
    this._router.navigateByUrl('investments/create');
  }

  private _assignData({ data, meta }): void {
    this.investmentLogs = data;
    this.investmentsMeta = meta;

    this._assignSummaryLogs(data);
  }

  private _assignSummaryLogs(data: IInvestmentLog[]): void {
    if (!data.length) {
      return;
    }

    this.summaryItems = [
      {
        label: 'Total Returns',
        value: this._toCurrency(data[0].profit),
        icon: 'dollar-sign'
      },
      {
        label: 'Percentage Returns',
        value: this._toPercentage(data[0].profitPercentage),
        icon: 'trending-up'
      },
      {
        label: 'Investment Value',
        value: this._toCurrency(data[0].totalValue),
        icon: 'chevrons-up'
      },
      {
        label: 'Invested',
        value: this._toCurrency(data[0].totalInvested),
        icon: 'save'
      }
    ];
  }

  private _toPercentage(value: number): string {
    return this._percentPipe.transform(value, '1.0-2');
  }

  private _toCurrency(amount: number): string {
    return this._currencyPipe.transform(
      amount,
      this.investmentsMeta.preferredCurrency,
      'symbol',
      '1.0-0'
    );
  }
}
