import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LogCard } from 'src/app/shared/abstracts/log-card.abstract';
import { IContextMenuItem } from 'src/app/shared/components/context-menu/interfaces/context-menu-item.interface';

import { IInvestmentLog } from '../../interfaces/investment-log.interface';

@Component({
  selector: 'app-investments-log-card',
  templateUrl: './investments-log-card.component.html',
  styleUrls: ['./investments-log-card.component.scss']
})
export class InvestmentsLogCardComponent extends LogCard {
  @Input()
  public monthlyLogCardItems: Array<IInvestmentLog>;

  public isEditing: boolean;
  public actions: Array<IContextMenuItem>;

  constructor(private readonly _httpService: HttpService, router: Router) {
    super(router);
  }

  public async removeLog(date: string): Promise<void> {
    await this._httpService.delete(`investments/${date}`);
    this.monthlyLogCardItems = this.monthlyLogCardItems.filter(
      (log) => log.date !== date
    );
  }
}
