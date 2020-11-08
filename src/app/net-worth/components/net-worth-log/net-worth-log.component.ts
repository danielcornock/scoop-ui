import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dictionary } from 'lodash';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IContextMenuItem } from 'src/app/shared/components/context-menu/interfaces/context-menu-item.interface';

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

  constructor(private readonly _httpService: HttpService, router: Router) {
    super(router, 'net-worth');
  }

  ngOnInit(): void {
    this._assignLogs();
  }

  public async removeLog(date: string): Promise<void> {
    await this._httpService.delete(`net-worth/${date}`);
    this.logs = this.logs.filter((log) => log.date !== date);
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
