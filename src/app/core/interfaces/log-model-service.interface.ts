import { Observable } from 'rxjs';

import { IHttpResponse } from '../services/http/interfaces/http-response.interface';

export interface LogModelService {
  getAll(): Observable<IHttpResponse>;
  create(data: any): Promise<IHttpResponse>;
  update(date: string, data: any): Promise<IHttpResponse>;
  get(date: string): Promise<IHttpResponse>;
  delete(date: string): Promise<void>;
}
