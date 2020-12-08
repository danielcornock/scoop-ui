import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LogCard } from 'src/app/shared/abstracts/log-card/log-card.abstract';
import { IContextMenuItem } from 'src/app/shared/components/context-menu/interfaces/context-menu-item.interface';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

import { IInvestmentLog } from '../../interfaces/investment-log.interface';
import { IInvestmentsMeta } from '../../interfaces/investments-meta.interface';
import { InvestmentsStoreService } from '../../services/investments-store/investments-store.service';

@Component({
  selector: 'app-investments-log-card',
  templateUrl: './investments-log-card.component.html',
  styleUrls: ['./investments-log-card.component.scss']
})
export class InvestmentsLogCardComponent extends LogCard implements OnChanges {
  @Input()
  public investmentsLogCardItems: Array<IInvestmentLog>;

  @Input()
  public investmentsLogCardMeta: IInvestmentsMeta;

  public isEditing: boolean;
  public actions: Array<IContextMenuItem>;
  public preferredCurrency: string;

  constructor(
    private readonly _store: InvestmentsStoreService,
    private readonly _popupService: PopupService,
    modalService: ModalService,
    router: Router
  ) {
    super(router, modalService, 'investments');
  }

  public ngOnChanges(): void {
    this.preferredCurrency = this.investmentsLogCardMeta.preferredCurrency;
  }

  public async removeLog(date: string): Promise<void> {
    try {
      await this._store.delete(date);
    } catch ({ error }) {
      this._popupService.showApiError(error);
    }
  }
}
