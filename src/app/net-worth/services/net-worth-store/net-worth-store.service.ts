import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
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

  private readonly _netWorthModels = {};

  constructor(
    private readonly _modelService: NetWorthModelService,
    private readonly _spinnerService: NgxSpinnerService
  ) {}

  public getAll$(): Observable<INetWorthCollectionResponse> {
    return this._netWorthCollection.asObservable().pipe(
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
      this._addToModels(res);
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
      const res = await this._modelService.create(data);
      this._addToModels(res);
      this.invalidateCollection();
    } finally {
      this._spinnerService.hide();
    }
  }

  public async getOne(date: string): Promise<INetWorthModelResponse> {
    if (this._netWorthModels[date]) {
      return Promise.resolve(this._netWorthModels[date]);
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

  public invalidateCollection(): void {
    this.collection = null;
  }

  private get collection(): INetWorthCollectionResponse {
    return this._netWorthCollection.getValue();
  }

  private set collection(val: INetWorthCollectionResponse) {
    this._netWorthCollection.next(val);
  }

  private _addToModels(model: INetWorthModelResponse): void {
    this._netWorthModels[model.data.date] = model;
  }
}
