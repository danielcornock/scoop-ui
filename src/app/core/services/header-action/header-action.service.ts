import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IHeaderAction } from '../../interfaces/header-action.interface';

@Injectable({
  providedIn: 'root'
})
export class HeaderActionService {
  private _action: BehaviorSubject<
    IHeaderAction | undefined
  > = new BehaviorSubject(undefined);

  constructor() {}

  public getAction(): Observable<IHeaderAction> {
    return this._action.asObservable();
  }

  public setAction(action: IHeaderAction): void {
    this._action.next(action);
  }
}
