import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContextMenuItem } from 'src/app/shared/components/context-menu/interfaces/context-menu-item.interface';

import { IInvestmentLog } from '../../interfaces/investment-log.interface';

@Component({
  selector: 'app-monthly-log-card',
  templateUrl: './monthly-log-card.component.html',
  styleUrls: ['./monthly-log-card.component.scss']
})
export class MonthlyLogCardComponent implements OnInit {
  @Input()
  public monthlyLogCardItems: Array<IInvestmentLog>;
  public logs: Array<any>;
  public actions: Array<IContextMenuItem>;

  constructor(private readonly _router: Router) {}

  ngOnInit(): void {
    this._createCardActions();
  }

  private _createCardActions(): void {
    this.actions = [
      {
        label: 'Create entry',
        action: () => this._router.navigateByUrl('investments/create'),
        icon: 'plus'
      }
    ];
  }
}
