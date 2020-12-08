import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseLogStore } from 'src/app/core/abstracts/store-service/base-log-store.abstract';

import {
  IMonthlyDistributionCollectionResponse,
  IMonthlyDistributionModelResponse,
} from '../../interfaces/monthly-distribution-log.interface';
import { MonthlyDistributionModelService } from '../monthly-distribution-model/monthly-distribution-model.service';

@Injectable({
  providedIn: 'root'
})
export class MonthlyDistributionStoreService extends BaseLogStore<
  IMonthlyDistributionCollectionResponse,
  IMonthlyDistributionModelResponse
> {
  constructor(
    modelService: MonthlyDistributionModelService,
    spinnerService: NgxSpinnerService
  ) {
    super(modelService, spinnerService);
  }
}
