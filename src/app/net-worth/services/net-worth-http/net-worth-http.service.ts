import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IHttpResponse } from 'src/app/core/services/http/interfaces/http-response.interface';

import { INetWorthApiMetaResponse, INetWorthApiResponse } from '../../interfaces/net-worth-api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class NetWorthHttpService {
  private _store: {
    data: Array<INetWorthApiResponse>;
    meta: INetWorthApiMetaResponse;
  };

  constructor(private readonly _httpService: HttpService) {}

  public async getAll(): Promise<{
    data: INetWorthApiResponse[];
    meta: INetWorthApiMetaResponse;
  }> {
    if (this._store) {
      return this._store;
    }
    const res = await this._httpService.get('net-worth');
    this._store = res;

    return this._store;
  }

  public async post(data: any): Promise<IHttpResponse<INetWorthApiResponse>> {
    const res = await this._httpService.post('net-worth', data);

    this._store = null;

    return res;
  }

  public async update(
    date: string,
    data: any
  ): Promise<IHttpResponse<INetWorthApiResponse>> {
    const res = await this._httpService.put(`net-worth/${date}`, {
      customValues: data
    });

    this._store = null;

    return res;
  }

  public async get(date: string): Promise<IHttpResponse<INetWorthApiResponse>> {
    const res = await this._httpService.get(`net-worth/${date}`);

    return res;
  }
}
