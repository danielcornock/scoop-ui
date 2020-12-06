import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogModelService } from 'src/app/core/interfaces/log-model-service.interface';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IHttpResponse } from 'src/app/core/services/http/interfaces/http-response.interface';

import { INetWorthCollectionResponse, INetWorthData } from '../../interfaces/net-worth-api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class NetWorthModelService implements LogModelService {
  constructor(private readonly _httpService: HttpService) {}

  public getAll(): Observable<INetWorthCollectionResponse> {
    return this._httpService.get$('net-worth');
  }

  public async create(data: any): Promise<IHttpResponse<INetWorthData>> {
    return this._httpService.post('net-worth', data);
  }

  public async update(
    date: string,
    data: any
  ): Promise<IHttpResponse<INetWorthData>> {
    return this._httpService.put(`net-worth/${date}`, data);
  }

  public async get(date: string): Promise<IHttpResponse<INetWorthData>> {
    return this._httpService.get(`net-worth/${date}`);
  }
}
