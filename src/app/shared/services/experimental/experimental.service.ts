import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExperimentalService {
  private _isExperimental: boolean;

  constructor() {}

  public isDevelopment(): boolean {
    return this._isExperimental;
  }

  public toggleExperimental(): void {
    this._isExperimental = !this._isExperimental;
  }

  public isExperimental(): boolean {
    return !!this._isExperimental;
  }
}
