import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { startCase } from 'lodash';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LogCard } from 'src/app/shared/abstracts/log-card/log-card.abstract';
import { IContextMenuItem } from 'src/app/shared/components/context-menu/interfaces/context-menu-item.interface';

import { IMonthlyDistributionLog } from '../../interfaces/monthly-distribution-log.interface';
import { IMonthlyDistributionMeta } from '../../interfaces/monthly-distribution-meta.interface';

@Component({
  selector: 'app-monthly-distribution-log-card',
  templateUrl: './monthly-distribution-log-card.component.html',
  styleUrls: ['./monthly-distribution-log-card.component.scss']
})
export class MonthlyDistributionLogCardComponent extends LogCard
  implements OnInit {
  @Input()
  monthlyDistributionLogCardItems: Array<IMonthlyDistributionLog>;

  @Input()
  monthlyDistributionLogCardMeta: IMonthlyDistributionMeta;

  public cardActions: Array<IContextMenuItem>;
  public fields: Array<string>;
  public preferredCurrency: string;

  constructor(private readonly _httpService: HttpService, router: Router) {
    super(router, 'monthly-distribution');
  }

  ngOnInit(): void {
    this.fields = this.monthlyDistributionLogCardMeta.fields.map(startCase);
    this.preferredCurrency = this.monthlyDistributionLogCardMeta.preferredCurrency;
  }

  public async removeLog(date: string): Promise<void> {
    await this._httpService.delete(`monthly-distribution/${date}`);
    this.monthlyDistributionLogCardItems = this.monthlyDistributionLogCardItems.filter(
      (log) => log.date !== date
    );
  }
}
