import { Injectable } from '@angular/core';
import { LogModelService } from 'src/app/core/abstracts/model-service/base-log-model-service.abstract';
import { HttpService } from 'src/app/core/services/http/http.service';

import { ISalaryCollectionResponse, ISalaryModelResponse } from '../../interfaces/salary.interface';

@Injectable({
  providedIn: 'root'
})
export class SalaryModelService extends LogModelService<
  ISalaryCollectionResponse,
  ISalaryModelResponse
> {
  constructor(httpService: HttpService) {
    super(httpService, 'salary');
  }

  public duplicate(date: string): Promise<ISalaryModelResponse> {
    return this._httpService.post(`${this._resourceName}/duplicate`, { date });
  }
}
