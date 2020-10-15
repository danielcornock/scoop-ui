import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { API_URL } from '../../providers/http.providers';
import { IHttpResponse } from './interfaces/http-response.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    @Inject(API_URL) private readonly _apiUrl: string,
    private readonly _httpClient: HttpClient
  ) {}

  public post(url: string, data: any): Promise<IHttpResponse> {
    return this._httpClient
      .post(`${this._apiUrl}${url}`, data)
      .toPromise() as Promise<IHttpResponse>;
  }
}
