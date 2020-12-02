import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dictionary } from 'lodash';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IContextMenuItem } from 'src/app/shared/components/context-menu/interfaces/context-menu-item.interface';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

import { LogCard } from '../../../shared/abstracts/log-card/log-card.abstract';
import { INetWorthApiMetaResponse, INetWorthApiResponse } from '../../interfaces/net-worth-api-response.interface';

@Component({
  selector: 'app-net-worth-log',
  templateUrl: './net-worth-log.component.html',
  styleUrls: ['./net-worth-log.component.scss']
})
export class NetWorthLogComponent extends LogCard implements OnInit {
  @Input()
  public netWorthLogItems: Array<INetWorthApiResponse>;

  @Input()
  public netWorthMeta: INetWorthApiMetaResponse;

  public logs: Array<Dictionary<string | number>>;
  public contextMenuItems: Array<IContextMenuItem>;
  public isEditing: boolean;

  constructor(
    private readonly _httpService: HttpService,
    private readonly _popupService: PopupService,
    modalService: ModalService,
    router: Router
  ) {
    super(router, modalService, 'net-worth');
  }

  ngOnInit(): void {
    this._assignLogs();
  }

  public async removeLog(date: string): Promise<void> {
    try {
      await this._httpService.delete(`net-worth/${date}`);
      this.logs = this.logs.filter((log) => log.date !== date);
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
