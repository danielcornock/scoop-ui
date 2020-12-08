import { Dictionary } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { IHttpResponse } from '../../services/http/interfaces/http-response.interface';
import { LogModelService } from '../model-service/base-log-model-service.abstract';

export abstract class BaseLogStore<
  TCollection extends IHttpResponse<any[]>,
  TModel extends IHttpResponse<any>,
  TModelService extends LogModelService<TCollection, TModel> = LogModelService<
    TCollection,
    TModel
  >
> {
  private _collection = new BehaviorSubject<TCollection>(null);

  private _models: Dictionary<TModel> = {};

  constructor(
    protected readonly _modelService: TModelService,
    protected readonly _spinnerService: NgxSpinnerService
  ) {}

  public invalidateCollection(): void {
    this.collection = null;
  }

  public clearCache(): void {
    this._models = {};
    this._collection = new BehaviorSubject(null);
  }

  public getAll$(): Observable<TCollection> {
    return this._collection.asObservable().pipe(
      switchMap((data) => {
        if (!data) {
          this._spinnerService.show();
          return this._modelService.getAll().pipe(
            switchMap((newData) => {
              this._spinnerService.hide();
              this.collection = newData;
              return of(newData);
            })
          );
        } else {
          return of(data);
        }
      }),
      filter((val) => Boolean(val))
    );
  }

  public async update(date: string, data: any): Promise<void> {
    try {
      this._spinnerService.show();
      await this._modelService.update(date, data);
      this._removeModelFromCache(date);
      this.invalidateCollection();
    } finally {
      this._spinnerService.hide();
    }
  }

  public async delete(date: string): Promise<void> {
    try {
      this._spinnerService.show();
      await this._modelService.delete(date);
      this._removeModelFromCache(date);
      this.invalidateCollection();
    } finally {
      this._spinnerService.hide();
    }
  }

  public async create(data: any): Promise<void> {
    try {
      this._spinnerService.show();
      await this._modelService.create(data);
      this._removeModelFromCache(data.date);
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

  protected _removeModelFromCache(date: string): void {
    delete this._models[date];
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
