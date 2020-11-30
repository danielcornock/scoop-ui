import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LogCard } from 'src/app/shared/abstracts/log-card/log-card.abstract';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

import { ISalaryMeta } from '../../interfaces/salary-meta.interface';
import { ISalary } from '../../interfaces/salary.interface';

@Component({
  selector: 'app-salary-log',
  templateUrl: './salary-log.component.html',
  styleUrls: ['./salary-log.component.scss']
})
export class SalaryLogComponent extends LogCard implements OnInit {
  public preferredCurrency: string;

  @Input()
  public salaryLogItems: Array<ISalary>;

  @Input()
  public salaryLogMeta: ISalaryMeta;

  constructor(
    private readonly _httpService: HttpService,
    private readonly _popupService: PopupService,

    router: Router
  ) {
    super(router, 'salary');
  }

  ngOnInit(): void {
    this.preferredCurrency = this.salaryLogMeta.preferredCurrency;
  }

  public async removeLog(date: string): Promise<void> {
    try {
      await this._httpService.delete(`salary/${date}`);
      this.salaryLogItems = this.salaryLogItems.filter(
        (log) => log.date !== date
      );
    } catch ({ error }) {
      this._popupService.showApiError(error);
    }
  }
}
