import { CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IDashboardSummaryItem } from 'src/app/shared/components/dashboard-summary/interfaces/dashboard-summary-item.interface';
import { ModalService } from 'src/app/shared/services/modal/modal.service';

import { GoalCelebrationModalComponent } from '../../components/goal-celebration-modal/goal-celebration-modal.component';
import {
  INetWorthCollectionResponse,
  INetWorthData,
  INetWorthMeta
} from '../../interfaces/net-worth-api-response.interface';
import { INetWorthGoal } from '../../interfaces/net-worth-goal.interface';
import { NetWorthGoalsService } from '../../services/net-worth-goals/net-worth-goals.service';
import { NetWorthStoreService } from '../../services/net-worth-store/net-worth-store.service';

@Component({
  selector: 'app-net-worth',
  templateUrl: './net-worth.component.html',
  styleUrls: ['./net-worth.component.scss']
})
export class NetWorthComponent implements OnInit, OnDestroy {
  public summaryItems: Array<IDashboardSummaryItem>;
  public netWorthItems: Array<INetWorthData>;
  public netWorthMeta: INetWorthMeta;

  private _destroy$ = new Subject<void>();

  constructor(
    private readonly _currency: CurrencyPipe,
    private readonly _router: Router,
    private readonly _netWorthStoreService: NetWorthStoreService,
    private readonly _modalService: ModalService,
    private readonly _netWorthGoalsService: NetWorthGoalsService
  ) {}

  async ngOnInit(): Promise<void> {
    this._netWorthStoreService
      .getAll$()
      .pipe(takeUntil(this._destroy$))
      .subscribe(this._onNetWorthDataChange.bind(this));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public createNew(): void {
    this._router.navigateByUrl('net-worth/create');
  }

  private _onNetWorthDataChange({
    data,
    meta
  }: INetWorthCollectionResponse): void {
    this.netWorthMeta = meta;
    this.netWorthItems = data;
    this._assignSummaryItems();
    this._checkForCompletedGoals(meta.goals);
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

  private async _checkForCompletedGoals(
    netWorthGoals: Array<INetWorthGoal>
  ): Promise<void> {
    const goalToCelebrate = netWorthGoals.find((goal) => {
      return goal.completed && !goal.hasReceivedCongratulations;
    });

    if (goalToCelebrate) {
      await this._modalService.open(GoalCelebrationModalComponent, {
        data: {
          goal: goalToCelebrate,
          preferredCurrency: this.netWorthMeta.preferredCurrency
        }
      });
      await this._netWorthGoalsService.acknowledgeGoal(goalToCelebrate._id);
    }
  }

  private _toCurrency(amount: number): string {
    return this._currency.transform(
      amount,
      this.netWorthMeta.preferredCurrency,
      'symbol',
      '1.0-0'
    );
  }
}
