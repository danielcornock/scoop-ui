import { IHttpResponse } from '../services/http/interfaces/http-response.interface';

export interface LogModelService {
  getAll(): Promise<IHttpResponse>;
  post(data: any): Promise<IHttpResponse>;
  update(date: string, data: any): Promise<IHttpResponse>;
  get(date: string): Promise<IHttpResponse>;
}
