import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IContextMenuItem } from 'src/app/shared/components/context-menu/interfaces/context-menu-item.interface';

import { IInvestmentLog } from '../../interfaces/investment-log.interface';

@Component({
  selector: 'app-investments-log-card',
  templateUrl: './investments-log-card.component.html',
  styleUrls: ['./investments-log-card.component.scss']
})
export class InvestmentsLogCardComponent implements OnInit {
  @Input()
  public monthlyLogCardItems: Array<IInvestmentLog>;

  public isEditing: boolean;
  public actions: Array<IContextMenuItem>;

  constructor(
    private readonly _router: Router,
    private readonly _httpService: HttpService
  ) {}

  ngOnInit(): void {
    this._createCardActions();
  }

  public async removeLog(date: string): Promise<void> {
    await this._httpService.delete(`investments/${date}`);
    this.monthlyLogCardItems = this.monthlyLogCardItems.filter(
      (log) => log.date !== date
    );
  }

  private _createCardActions(): void {
    this.actions = [
      {
        label: 'Create entry',
        action: () => this._router.navigateByUrl('investments/create'),
        icon: 'plus'
      },
      {
        generateLabel: this._getContextMenuEditText.bind(this),
        action: () => (this.isEditing = !this.isEditing),
        icon: 'edit'
      }
    ];
  }

  private _getContextMenuEditText(): string {
    return this.isEditing ? 'Stop Editing' : 'Enable Editing';
  }
}
