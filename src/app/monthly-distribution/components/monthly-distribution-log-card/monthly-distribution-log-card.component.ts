import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dictionary, startCase } from 'lodash';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IContextMenuItem } from 'src/app/shared/components/context-menu/interfaces/context-menu-item.interface';

@Component({
  selector: 'app-monthly-distribution-log-card',
  templateUrl: './monthly-distribution-log-card.component.html',
  styleUrls: ['./monthly-distribution-log-card.component.scss']
})
export class MonthlyDistributionLogCardComponent implements OnInit {
  @Input()
  monthlyDistributionLogCardItems: Array<any>;

  @Input()
  monthlyDistributionLogCardMeta: Dictionary<any>;

  public cardActions: Array<IContextMenuItem>;
  public fields: Array<string>;
  public logs: Array<Dictionary<any>>;
  public isEditing: boolean;

  constructor(
    private readonly _router: Router,
    private readonly _httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.fields = this.monthlyDistributionLogCardMeta.fields.map(startCase);
    this._mapLogs();
    this._createCardActions();
  }

  public async removeLog(date: string): Promise<void> {
    await this._httpService.delete(`monthly-distribution/${date}`);
    this.logs = this.logs.filter((log) => log.date !== date);
  }

  private _mapLogs(): void {
    this.logs = this.monthlyDistributionLogCardItems.map((item) => {
      return {
        date: item.date,
        ...item.income,
        ...item.outgoing,
        remaining: item.remaining
      };
    });
  }

  private _createCardActions(): void {
    this.cardActions = [
      {
        label: 'Create entry',
        action: () => this._router.navigateByUrl('monthly-distribution/create'),
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
