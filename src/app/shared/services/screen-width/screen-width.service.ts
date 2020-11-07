import { Injectable } from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
import { distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScreenWidthService {
  constructor() {}

  public getScreenWidth$(): Observable<SCREEN_SIZE> {
    return fromEvent(window, 'resize').pipe(
      switchMap((event: Event) =>
        of((event.currentTarget as Window).innerWidth)
      ),
      startWith(window.innerWidth),
      switchMap((width: number) => {
        if (width < SCREEN_SIZE.Mobile) {
          return of(SCREEN_SIZE.Mobile);
        }

        if (width < SCREEN_SIZE.Tablet) {
          return of(SCREEN_SIZE.Tablet);
        }

        if (width < SCREEN_SIZE.Tablet) {
          return of(SCREEN_SIZE.Tablet);
        }

        if (width < SCREEN_SIZE.StdDef) {
          return of(SCREEN_SIZE.StdDef);
        }

        return of(null);
      }),
      distinctUntilChanged()
    );
  }
}

export enum SCREEN_SIZE {
  Mobile = 540,
  Tablet = 1024,
  LowDef = 1250,
  StdDef = 1450
}
