import { Observable } from 'rxjs';

import { HttpService } from '../../services/http/http.service';
import { IHttpResponse } from '../../services/http/interfaces/http-response.interface';

export abstract class LogModelService<
  TCollection extends IHttpResponse<any[]>,
  TModel extends IHttpResponse<any>
> {
  constructor(
    protected readonly _httpService: HttpService,
    protected readonly _resourceName: string
  ) {}

  public getAll(): Observable<TCollection> {
    return this._httpService.get$(this._resourceName) as Observable<
      TCollection
    >;
  }

  public create(data: any): Promise<TModel> {
    return this._httpService.post(this._resourceName, data) as Promise<TModel>;
  }

  public update(date: string, data: any): Promise<TModel> {
    return this._httpService.put(
      `${this._resourceName}/${date}`,
      data
    ) as Promise<TModel>;
  }

  public get(date: string): Promise<TModel> {
    return this._httpService.get(`${this._resourceName}/${date}`) as Promise<
      TModel
    >;
  }

  public delete(date: string): Promise<void> {
    return this._httpService.delete(`${this._resourceName}/${date}`);
  }
}
