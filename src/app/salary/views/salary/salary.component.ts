import { CurrencyPipe, PercentPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dictionary } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  IDashboardSummaryItem,
} from 'src/app/shared/components/dashboard-summary/interfaces/dashboard-summary-item.interface';

import { ISalaryMeta } from '../../interfaces/salary-meta.interface';
import { ISalary } from '../../interfaces/salary.interface';
import { SalaryStoreService } from '../../services/salary-store/salary-store.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss']
})
export class SalaryComponent implements OnInit, OnDestroy {
  public salaryItems: Array<ISalary>;
  public salaryMeta: ISalaryMeta;
  public summaryItems: Array<IDashboardSummaryItem>;

  private _destroy$ = new Subject<void>();

  constructor(
    private readonly _store: SalaryStoreService,
    private readonly _spinnerService: NgxSpinnerService,
    private readonly _currency: CurrencyPipe,
    private readonly _router: Router,
    private readonly _percent: PercentPipe
  ) {}

  async ngOnInit(): Promise<void> {
    this._store
      .getAll$()
      .pipe(takeUntil(this._destroy$))
      .subscribe(this._processSalary.bind(this));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public createNew(): void {
    this._router.navigateByUrl('salary/create');
  }

  private async _processSalary({ data, meta }): Promise<void> {
    this.salaryItems = data;
    this.salaryMeta = meta;
    this._processSummaryItems(meta.summaryItems);
  }

  private _processSummaryItems(summaryItems: Dictionary<number>): void {
    const values = this.salaryMeta.summaryItems;

    if (!values) {
      return;
    }

    this.summaryItems = [
      {
        label: 'Annual Gross Salary',
        value: this._toCurrency(values.grossSalary),
        icon: 'dollar-sign'
      },
      {
        label: 'Annual Net Salary',
        value: this._toCurrency(values.netSalary),
        icon: 'user-plus'
      },
      {
        label: 'Annual Tax Paid',
        value: this._toCurrency(values.taxPaid),
        icon: 'chevrons-down'
      },
      {
        label: 'Projected Gross Salary',
        value: this._toCurrency(values.projectedGrossSalary),
        icon: 'calendar'
      },
      {
        label: 'Projected Net Salary',
        value: this._toCurrency(values.projectedNetSalary),
        icon: 'trending-up'
      },
      {
        label: 'Annual Take Home',
        value: this._toPercentage(values.netSalaryOverGrossSalary),
        icon: 'home'
      },
      {
        label: 'Annual Tax Percentage',
        value: this._toPercentage(values.taxPercentage),
        icon: 'percent'
      },
      {
        label: 'Projected Tax Return',
        value: this._toCurrency(values.projectedTaxReturn),
        icon: 'corner-down-left'
      }
    ];
  }

  private _toCurrency(amount: number): string {
    return this._currency.transform(
      amount,
      this.salaryMeta.preferredCurrency,
      'symbol',
      '1.0-0'
    );
  }

  private _toPercentage(value: number): string {
    return this._percent.transform(value, '1.0-2');
  }
}
