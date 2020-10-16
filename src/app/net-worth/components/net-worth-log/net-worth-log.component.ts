import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContextMenuItem } from 'src/app/shared/components/context-menu/interfaces/context-menu-item.interface';

@Component({
  selector: 'app-net-worth-log',
  templateUrl: './net-worth-log.component.html',
  styleUrls: ['./net-worth-log.component.scss']
})
export class NetWorthLogComponent implements OnInit {
  public logs: Array<any>;
  public contextMenuItems: Array<IContextMenuItem>;

  constructor(private readonly _router: Router) {}

  ngOnInit(): void {
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
    this.logs = [
      {
        date: 'February 2020',
        santander: '£8900',
        monzo: '£1730',
        isa: '£3000',
        investments: '£3050',
        total: '£13000',
        change: '£1200'
      },
      {
        date: 'March 2020',
        santander: '£9900',
        monzo: '£1830',
        isa: '£3200',
        investments: '£3350',
        total: '£15100',
        change: '£2100'
      }
    ];
  }
}
