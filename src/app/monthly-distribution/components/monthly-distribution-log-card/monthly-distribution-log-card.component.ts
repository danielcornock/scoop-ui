import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { startCase } from 'lodash';
import { LogCard } from 'src/app/shared/abstracts/log-card/log-card.abstract';
import { IContextMenuItem } from 'src/app/shared/components/context-menu/interfaces/context-menu-item.interface';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

import { IMonthlyDistributionLog } from '../../interfaces/monthly-distribution-log.interface';
import { IMonthlyDistributionMeta } from '../../interfaces/monthly-distribution-meta.interface';
import {
  MonthlyDistributionStoreService,
} from '../../services/monthly-distribution-store/monthly-distribution-store.service';

@Component({
  selector: 'app-monthly-distribution-log-card',
  templateUrl: './monthly-distribution-log-card.component.html',
  styleUrls: ['./monthly-distribution-log-card.component.scss']
})
export class MonthlyDistributionLogCardComponent extends LogCard
  implements OnChanges {
  @Input()
  monthlyDistributionLogCardItems: Array<IMonthlyDistributionLog>;

  @Input()
  monthlyDistributionLogCardMeta: IMonthlyDistributionMeta;

  public cardActions: Array<IContextMenuItem>;
  public fields: Array<string>;
  public preferredCurrency: string;

  constructor(
    private readonly _monthlyDistributionStore: MonthlyDistributionStoreService,
    private readonly _popupService: PopupService,
    modalService: ModalService,
    router: Router
  ) {
    super(router, modalService, 'monthly-distribution');
  }

  ngOnChanges(): void {
    this.fields = this.monthlyDistributionLogCardMeta.fields.map(startCase);
    this.preferredCurrency = this.monthlyDistributionLogCardMeta.preferredCurrency;
  }

  public async removeLog(date: string): Promise<void> {
    try {
      await this._monthlyDistributionStore.delete(date);
    } catch ({ error }) {
      this._popupService.showApiError(error);
    }
  }
}
