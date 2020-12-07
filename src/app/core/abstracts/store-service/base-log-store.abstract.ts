import { Dictionary } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { LogModelService } from '../../interfaces/log-model-service.interface';
import { IHttpResponse } from '../../services/http/interfaces/http-response.interface';

export abstract class BaseLogStore<
  TCollection extends IHttpResponse<any[]>,
  TModel extends IHttpResponse<any>
> {
  private readonly _collection = new BehaviorSubject<TCollection>(null);

  private readonly _models: Dictionary<TModel> = {};

  constructor(
    private readonly _modelService: LogModelService<TCollection, TModel>,
    private readonly _spinnerService: NgxSpinnerService
  ) {}

  public invalidateCollection(): void {
    this.collection = null;
  }

  public getAll$(): Observable<TCollection> {
    return this._collection.asObservable().pipe(
      switchMap((data) => {
        if (!data) {
          this._spinnerService.show();
          return this._modelService.getAll().pipe(
            tap(() => this._spinnerService.hide()),
            switchMap((newData) => {
              this.collection = newData;
              return of(newData);
            })
          );
        } else {
          return of(data);
        }
      })
    );
  }

  public async update(date: string, data: any): Promise<void> {
    try {
      this._spinnerService.show();
      const res = await this._modelService.update(date, data);
      this.invalidateCollection();
    } finally {
      this._spinnerService.hide();
    }
  }

  public async delete(date: string): Promise<void> {
    try {
      this._spinnerService.show();
      await this._modelService.delete(date);
      this.invalidateCollection();
    } finally {
      this._spinnerService.hide();
    }
  }

  public async create(data: any): Promise<void> {
    try {
      this._spinnerService.show();
      await this._modelService.create(data);
      this.invalidateCollection();
    } finally {
      this._spinnerService.hide();
    }
  }

  public async getOne(date: string): Promise<TModel> {
    if (this.models[date]) {
      return Promise.resolve(this.models[date]);
    }

    try {
      this._spinnerService.show();
      const res = await this._modelService.get(date);
      this._addToModels(res);
      return res;
    } finally {
      this._spinnerService.hide();
    }
  }

  protected get collection(): TCollection {
    return this._collection.getValue();
  }

  protected set collection(val: TCollection) {
    this._collection.next(val);
  }

  protected get models(): Dictionary<TModel> {
    return this._models;
  }

  protected _addToModels(model: TModel): void {
    this._models[model.data.date] = model;
  }
}
