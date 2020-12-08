import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseLogStore } from 'src/app/core/abstracts/store-service/base-log-store.abstract';

import { ISalaryCollectionResponse, ISalaryModelResponse } from '../../interfaces/salary.interface';
import { SalaryModelService } from '../salary-model/salary-model.service';

@Injectable({
  providedIn: 'root'
})
export class SalaryStoreService extends BaseLogStore<
  ISalaryCollectionResponse,
  ISalaryModelResponse,
  SalaryModelService
> {
  constructor(
    modelService: SalaryModelService,
    spinnerService: NgxSpinnerService
  ) {
    super(modelService, spinnerService);
  }

  public async duplicate(date: string): Promise<void> {
    try {
      this._spinnerService.show();
      await this._modelService.duplicate(date);
      this._removeModelFromCache(date);
      this.invalidateCollection();
    } finally {
      this._spinnerService.hide();
    }
  }
}
