import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
      .post(`${this._apiUrl}${url}`, data)
      .toPromise() as Promise<IHttpResponse>;
  }

  public get<T = any>(url: string): Promise<IHttpResponse<T>> {
    return this.get$<T>(url).toPromise() as Promise<IHttpResponse<T>>;
  }

  public put(url: string, data: any): Promise<IHttpResponse> {
    return this._httpClient
      .put(`${this._apiUrl}${url}`, data)
      .toPromise() as Promise<IHttpResponse>;
  }

  public delete(url: string): Promise<void> {
    return this._httpClient
      .delete(`${this._apiUrl}${url}`)
      .toPromise() as Promise<any>;
  }

  public get$<T = any>(url: string): Observable<IHttpResponse<T>> {
    return this._httpClient.get(`${this._apiUrl}${url}`) as Observable<
      IHttpResponse<T>
    >;
  }
}
