import { Injectable } from '@angular/core';
import { LogModelService } from 'src/app/core/abstracts/model-service/base-log-model-service.abstract';
import { HttpService } from 'src/app/core/services/http/http.service';

import {
  IMonthlyDistributionCollectionResponse,
  IMonthlyDistributionModelResponse,
} from '../../interfaces/monthly-distribution-log.interface';

@Injectable({
  providedIn: 'root'
})
export class MonthlyDistributionModelService extends LogModelService<
  IMonthlyDistributionCollectionResponse,
  IMonthlyDistributionModelResponse
> {
  constructor(httpService: HttpService) {
    super(httpService, 'monthly-distribution');
  }
}
