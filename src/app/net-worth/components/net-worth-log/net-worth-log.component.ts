import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dictionary, map } from 'lodash';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IContextMenuItem } from 'src/app/shared/components/context-menu/interfaces/context-menu-item.interface';

import { INetWorthApiResponse } from '../../interfaces/net-worth-api-response.interface';

@Component({
  selector: 'app-net-worth-log',
  templateUrl: './net-worth-log.component.html',
  styleUrls: ['./net-worth-log.component.scss']
})
export class NetWorthLogComponent implements OnInit {
  public logs: Array<Dictionary<string | number>>;
  public columns: Array<string>;
  public contextMenuItems: Array<IContextMenuItem>;

  constructor(
    private readonly _router: Router,
    private readonly _httpService: HttpService
  ) {}

  async ngOnInit(): Promise<void> {
    const { data } = await this._httpService.get('net-worth');
    this._assignLogs(data);
    this._assignContextMenuItems();
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

  private _assignLogs(data: Array<INetWorthApiResponse>): void {
    this.logs = data.map((entry) => {
      return {
        date: entry.date,
        ...entry.customValues,
        total: entry.total,
        change: entry.change
      };
    });

    this.columns = map(this.logs[0], (_val, key) => key);
  }
}
