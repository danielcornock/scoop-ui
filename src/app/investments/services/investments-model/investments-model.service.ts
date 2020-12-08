import { Injectable } from '@angular/core';
import { LogModelService } from 'src/app/core/abstracts/model-service/base-log-model-service.abstract';
import { HttpService } from 'src/app/core/services/http/http.service';

import { IInvestmentCollectionResponse, IInvestmentModelResponse } from '../../interfaces/investment-log.interface';

@Injectable({
  providedIn: 'root'
})
export class InvestmentsModelService extends LogModelService<
  IInvestmentCollectionResponse,
  IInvestmentModelResponse
> {
  constructor(httpService: HttpService) {
    super(httpService, 'investments');
  }
}
