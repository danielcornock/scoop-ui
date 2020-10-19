import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dictionary } from 'lodash';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IContextMenuItem } from 'src/app/shared/components/context-menu/interfaces/context-menu-item.interface';

import { INetWorthApiResponse } from '../../interfaces/net-worth-api-response.interface';

@Component({
  selector: 'app-net-worth-log',
  templateUrl: './net-worth-log.component.html',
  styleUrls: ['./net-worth-log.component.scss']
})
export class NetWorthLogComponent implements OnInit {
  @Input()
  public netWorthLogItems: Array<INetWorthApiResponse>;

  @Input()
  public netWorthColumns: Array<string>;

  public logs: Array<Dictionary<string | number>>;
  public contextMenuItems: Array<IContextMenuItem>;

  constructor(
    private readonly _router: Router,
    private readonly _httpService: HttpService
  ) {}

  ngOnInit(): void {
    this._assignLogs();
    this._assignContextMenuItems();
  }

  public async removeLog(date: string): Promise<void> {
    await this._httpService.delete(`net-worth/${date}`);
    this.logs = this.logs.filter((log) => log.date !== date);
  }

  private _assignContextMenuItems(): void {
    this.contextMenuItems = [
      {
        label: 'Create Entry',
        action: () => this._router.navigateByUrl('net-worth/create'),
        icon: 'plus'
      }
    ];
  }

  private _assignLogs(): void {
    this.logs = this.netWorthLogItems.map((entry) => {
      const baseObject: Dictionary<string | number> = {};

      this.netWorthColumns.forEach((fieldName) => {
        baseObject[fieldName] =
          entry[fieldName] || entry.customValues[fieldName] || 0;
      });

      return baseObject;
    });
  }
}
