import { Observable } from 'rxjs';

import { IHttpResponse } from '../services/http/interfaces/http-response.interface';

export interface LogModelStore {
  getAll$(): Observable<IHttpResponse>;
  create(data: any): Promise<void>;
  getOne(date: string): Promise<IHttpResponse>;
  invalidateCollection(): void;
}
