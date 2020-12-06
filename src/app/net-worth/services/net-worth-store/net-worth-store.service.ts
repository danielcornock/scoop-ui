import { Injectable } from '@angular/core';
import { Dictionary } from 'lodash';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LogModelStore } from 'src/app/core/interfaces/log-model-store.interface';

import { INetWorthCollectionResponse, INetWorthModelResponse } from '../../interfaces/net-worth-api-response.interface';
import { NetWorthModelService } from '../net-worth-model/net-worth-model.service';

@Injectable({
  providedIn: 'root'
})
export class NetWorthStoreService implements LogModelStore {
  private readonly _netWorthCollection = new BehaviorSubject<
    INetWorthCollectionResponse
  >(null);

  private readonly _netWorthModels = new BehaviorSubject<
    Dictionary<INetWorthModelResponse>
  >({});

  constructor(private readonly _modelService: NetWorthModelService) {}

  public getAll$(): Observable<INetWorthCollectionResponse> {
    return this._netWorthCollection.asObservable().pipe(
      switchMap((data) => {
        if (!data) {
          return this._modelService.getAll().pipe(
            switchMap((newData) => {
              this.collection = newData;

              return of(newData);
            })
          );
        }
      })
    );
  }

  public async create(data: any): Promise<void> {
    const res = await this._modelService.create(data);
    this._addToModels(res);
    this.invalidateCollection();
  }

  public getOne(date: string): Promise<INetWorthModelResponse> {
    return this._netWorthModels
      .pipe(
        map((data) => {
          return data[date];
        })
      )
      .toPromise();
  }

  public invalidateCollection(): void {
    this.collection = null;
  }

  private get collection(): INetWorthCollectionResponse {
    return this._netWorthCollection.getValue();
  }

  private set collection(val: INetWorthCollectionResponse) {
    this._netWorthCollection.next(val);
  }

  private get models(): Dictionary<INetWorthModelResponse> {
    return this._netWorthModels.getValue();
  }

  private set models(val: Dictionary<INetWorthModelResponse>) {
    this._netWorthModels.next(val);
  }

  private _addToModels(model: INetWorthModelResponse): void {
    this.models = {
      ...this.models,
      [model.data.date]: model
    };
  }
}
