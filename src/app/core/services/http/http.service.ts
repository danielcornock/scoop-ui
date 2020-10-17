import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth/auth.service';

import { API_URL } from '../../providers/http.providers';
import { IHttpResponse } from './interfaces/http-response.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    @Inject(API_URL) private readonly _apiUrl: string,
    private readonly _httpClient: HttpClient,
    private readonly _authService: AuthService
  ) {}

  public post(url: string, data: any): Promise<IHttpResponse> {
    return this._httpClient
      .post(`${this._apiUrl}${url}`, data, { headers: this._addHeaders() })
      .toPromise() as Promise<IHttpResponse>;
  }

  public get(url: string): Promise<IHttpResponse> {
    return this._httpClient
      .get(`${this._apiUrl}${url}`, { headers: this._addHeaders() })
      .toPromise() as Promise<IHttpResponse>;
  }

  public put(url: string, data: any): Promise<IHttpResponse> {
    return this._httpClient
      .put(`${this._apiUrl}${url}`, data, {
        headers: this._addHeaders()
      })
      .toPromise() as Promise<IHttpResponse>;
  }

  private _addHeaders(): HttpHeaders {
    const jwt: string | null = this._authService.getFullJwt();

    if (jwt) {
      return new HttpHeaders({
        Authorization: jwt
      });
    } else {
      return new HttpHeaders({});
    }
  }
}
