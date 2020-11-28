import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IDashboardSummaryItem } from 'src/app/shared/components/dashboard-summary/interfaces/dashboard-summary-item.interface';

import { ISalaryMeta } from '../../interfaces/salary-meta.interface';
import { ISalary } from '../../interfaces/salary.interface';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss']
})
export class SalaryComponent implements OnInit {
  public salaryItems: Array<ISalary>;
  public salaryMeta: ISalaryMeta;
  public summaryItems: Array<IDashboardSummaryItem>;

  constructor(
    private readonly _httpService: HttpService,
    private readonly _spinnerService: NgxSpinnerService,
    private readonly _currency: CurrencyPipe,
    private readonly _router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this._spinnerService.show();
    await this._getSalaryLogs();
    this._processSummaryItems();
    this._spinnerService.hide();
  }

  public createNew(): void {
    this._router.navigateByUrl('salary/create');
  }

  private async _getSalaryLogs(): Promise<void> {
    const { data, meta } = await this._httpService.get('salary');
    this.salaryItems = data;
    this.salaryMeta = meta;
  }

  private _processSummaryItems(): void {
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
        label: 'Estimated tax return',
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
}
