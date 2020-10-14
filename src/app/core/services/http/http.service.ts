import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { API_URL } from '../../providers/http.providers';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    @Inject(API_URL) private readonly _apiUrl: string,
    private readonly _httpClient: HttpClient
  ) {}
}
