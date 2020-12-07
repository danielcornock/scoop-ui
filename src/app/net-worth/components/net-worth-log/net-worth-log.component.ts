import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Dictionary } from 'lodash';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

import { LogCard } from '../../../shared/abstracts/log-card/log-card.abstract';
import { INetWorthData, INetWorthMeta } from '../../interfaces/net-worth-api-response.interface';
import { NetWorthStoreService } from '../../services/net-worth-store/net-worth-store.service';

@Component({
  selector: 'app-net-worth-log',
  templateUrl: './net-worth-log.component.html',
  styleUrls: ['./net-worth-log.component.scss']
})
export class NetWorthLogComponent extends LogCard implements OnChanges {
  @Input()
  public netWorthLogItems: Array<INetWorthData>;

  @Input()
  public netWorthMeta: INetWorthMeta;

  public logs: Array<Dictionary<string | number>>;

  constructor(
    private readonly _popupService: PopupService,
    private readonly _netWorthStoreService: NetWorthStoreService,
    modalService: ModalService,
    router: Router
  ) {
    super(router, modalService, 'net-worth');
  }

  ngOnChanges(): void {
    this._assignLogs();
  }

  public async removeLog(date: string): Promise<void> {
    try {
      await this._netWorthStoreService.delete(date);
    } catch ({ error }) {
      this._popupService.showApiError(error);
    }
  }

  private _assignLogs(): void {
    this.logs = this.netWorthLogItems.map((entry) => {
      const baseObject: Dictionary<string | number> = {};

      this.netWorthMeta.fields.forEach((fieldName) => {
        baseObject[fieldName] =
          entry[fieldName] || entry.customValues[fieldName] || 0;
      });

      return baseObject;
    });
  }
}
