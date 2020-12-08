import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IMonthlyDistributionLog } from '../../interfaces/monthly-distribution-log.interface';
import {
  MonthlyDistributionStoreService,
} from '../../services/monthly-distribution-store/monthly-distribution-store.service';

@Component({
  selector: 'app-monthly-distribution',
  templateUrl: './monthly-distribution.component.html',
  styleUrls: ['./monthly-distribution.component.scss']
})
export class MonthlyDistributionComponent implements OnInit, OnDestroy {
  public monthlyDistributionItems: Array<IMonthlyDistributionLog>;
  public monthlyDistributionMeta: any;

  private _destroy$ = new Subject<void>();

  constructor(
    private readonly _router: Router,
    private readonly _monthlyDistributionStore: MonthlyDistributionStoreService
  ) {}

  async ngOnInit(): Promise<void> {
    this._monthlyDistributionStore
      .getAll$()
      .pipe(takeUntil(this._destroy$))
      .subscribe(this._assignLogs.bind(this));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public createNew(): void {
    this._router.navigateByUrl('monthly-distribution/create');
  }

  private async _assignLogs({ data, meta }): Promise<void> {
    this.monthlyDistributionItems = data;
    this.monthlyDistributionMeta = meta;
  }
}
