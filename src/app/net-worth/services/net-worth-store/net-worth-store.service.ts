import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseLogStore } from 'src/app/core/abstracts/store-service/base-log-store.abstract';

import { INetWorthCollectionResponse, INetWorthModelResponse } from '../../interfaces/net-worth-api-response.interface';
import { NetWorthModelService } from '../net-worth-model/net-worth-model.service';

@Injectable({
  providedIn: 'root'
})
export class NetWorthStoreService extends BaseLogStore<
  INetWorthCollectionResponse,
  INetWorthModelResponse
> {
  constructor(
    modelService: NetWorthModelService,
    spinnerService: NgxSpinnerService
  ) {
    super(modelService, spinnerService);
  }
}
