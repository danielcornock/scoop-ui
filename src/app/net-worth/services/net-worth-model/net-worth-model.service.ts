import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogModelService } from 'src/app/core/interfaces/log-model-service.interface';
import { HttpService } from 'src/app/core/services/http/http.service';

import { INetWorthCollectionResponse, INetWorthModelResponse } from '../../interfaces/net-worth-api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class NetWorthModelService
  implements
    LogModelService<INetWorthCollectionResponse, INetWorthModelResponse> {
  constructor(private readonly _httpService: HttpService) {}

  public getAll(): Observable<INetWorthCollectionResponse> {
    return this._httpService.get$('net-worth');
  }

  public create(data: any): Promise<INetWorthModelResponse> {
    return this._httpService.post('net-worth', data);
  }

  public update(date: string, data: any): Promise<INetWorthModelResponse> {
    return this._httpService.put(`net-worth/${date}`, data);
  }

  public get(date: string): Promise<INetWorthModelResponse> {
    return this._httpService.get(`net-worth/${date}`);
  }

  public delete(date: string): Promise<void> {
    return this._httpService.delete(`net-worth/${date}`);
  }
}
