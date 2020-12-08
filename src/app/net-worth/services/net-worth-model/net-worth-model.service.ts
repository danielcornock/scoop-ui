import { Injectable } from '@angular/core';
import { LogModelService } from 'src/app/core/abstracts/model-service/base-log-model-service.abstract';
import { HttpService } from 'src/app/core/services/http/http.service';

import { INetWorthCollectionResponse, INetWorthModelResponse } from '../../interfaces/net-worth-api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class NetWorthModelService extends LogModelService<
  INetWorthCollectionResponse,
  INetWorthModelResponse
> {
  constructor(httpService: HttpService) {
    super(httpService, 'net-worth');
  }
}
