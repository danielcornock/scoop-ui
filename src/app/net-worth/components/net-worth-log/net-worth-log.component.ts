import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dictionary } from 'lodash';
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
  public columns: Array<string>;
  public contextMenuItems: Array<IContextMenuItem>;

  constructor(private readonly _router: Router) {}

  async ngOnInit(): void {
    this._assignLogs();
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

  private _assignLogs(): void {
    this.logs = this.netWorthLogItems.map((entry) => {
      const baseObject = {};

      this.netWorthColumns.forEach((fieldName) => {
        baseObject[fieldName] =
          entry[fieldName] || entry.customValues[fieldName] || 0;
      });

      return baseObject;
    });
  }
}
