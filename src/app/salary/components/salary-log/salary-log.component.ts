import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LogCard } from 'src/app/shared/abstracts/log-card/log-card.abstract';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

import { ISalaryMeta } from '../../interfaces/salary-meta.interface';
import { ISalary } from '../../interfaces/salary.interface';
import { SalaryStoreService } from '../../services/salary-store/salary-store.service';

@Component({
  selector: 'app-salary-log',
  templateUrl: './salary-log.component.html',
  styleUrls: ['./salary-log.component.scss']
})
export class SalaryLogComponent extends LogCard implements OnChanges {
  public preferredCurrency: string;

  @Input()
  public salaryLogItems: Array<ISalary>;

  @Input()
  public salaryLogMeta: ISalaryMeta;

  constructor(
    private readonly _store: SalaryStoreService,
    private readonly _popupService: PopupService,
    modalService: ModalService,
    router: Router
  ) {
    super(router, modalService, 'salary');
  }

  ngOnChanges(): void {
    this.preferredCurrency = this.salaryLogMeta.preferredCurrency;
  }

  public async removeLog(date: string): Promise<void> {
    try {
      await this._store.delete(date);
    } catch ({ error }) {
      this._popupService.showApiError(error);
    }
  }
}
