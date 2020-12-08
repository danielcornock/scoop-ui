import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseLogStore } from 'src/app/core/abstracts/store-service/base-log-store.abstract';

import { IInvestmentCollectionResponse, IInvestmentModelResponse } from '../../interfaces/investment-log.interface';
import { InvestmentsModelService } from '../investments-model/investments-model.service';

@Injectable({
  providedIn: 'root'
})
export class InvestmentsStoreService extends BaseLogStore<
  IInvestmentCollectionResponse,
  IInvestmentModelResponse
> {
  constructor(
    modelService: InvestmentsModelService,
    spinnerService: NgxSpinnerService
  ) {
    super(modelService, spinnerService);
  }
}
