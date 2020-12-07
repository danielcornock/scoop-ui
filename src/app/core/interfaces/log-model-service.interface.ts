import { Observable } from 'rxjs';

export interface LogModelService<TCollection, TModel> {
  getAll(): Observable<TCollection>;
  create(data: any): Promise<TModel>;
  update(date: string, data: any): Promise<TModel>;
  get(date: string): Promise<TModel>;
  delete(date: string): Promise<void>;
}
