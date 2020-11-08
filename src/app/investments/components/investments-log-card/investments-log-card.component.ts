import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LogCard } from 'src/app/shared/abstracts/log-card/log-card.abstract';
import { IContextMenuItem } from 'src/app/shared/components/context-menu/interfaces/context-menu-item.interface';

import { IInvestmentLog } from '../../interfaces/investment-log.interface';
import { IInvestmentsMeta } from '../../interfaces/investments-meta.interface';

@Component({
  selector: 'app-investments-log-card',
  templateUrl: './investments-log-card.component.html',
  styleUrls: ['./investments-log-card.component.scss']
})
export class InvestmentsLogCardComponent extends LogCard implements OnInit {
  @Input()
  public investmentsLogCardItems: Array<IInvestmentLog>;

  @Input()
  public investmentsLogCardMeta: IInvestmentsMeta;

  public isEditing: boolean;
  public actions: Array<IContextMenuItem>;
  public preferredCurrency: string;

  constructor(private readonly _httpService: HttpService, router: Router) {
    super(router, 'investments');
  }

  public ngOnInit(): void {
    this.preferredCurrency = this.investmentsLogCardMeta.preferredCurrency;
  }

  public async removeLog(date: string): Promise<void> {
    await this._httpService.delete(`investments/${date}`);
    this.investmentsLogCardItems = this.investmentsLogCardItems.filter(
      (log) => log.date !== date
    );
  }
}
