import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import {
  filter,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import {
  SCREEN_SIZE,
  ScreenWidthService
} from '../../services/screen-width/screen-width.service';

@Directive({
  selector: '[appLongPress]'
})
export class LongPressDirective implements OnInit, OnDestroy {
  @Input()
  public appLongPress;

  @Output()
  public longPress: EventEmitter<MouseEvent> = new EventEmitter();

  private _mouseup$ = new BehaviorSubject(false);
  private _mousedown$ = new Subject();
  private _destroy$ = new Subject();
  private _isMobile: boolean;

  constructor(private readonly _screenWidthService: ScreenWidthService) {}

  public ngOnInit(): void {
    this._listenForLongPress();
    this._screenWidthService.getScreenWidth$().subscribe((width) => {
      this._isMobile = width === SCREEN_SIZE.Mobile;
    });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }

  @HostListener('touchend')
  @HostListener('mouseup')
  public onTouchEnd(): void {
    this._mouseup$.next(true);
  }

  @HostListener('touchstart')
  @HostListener('mousedown')
  public onTouch(): void {
    this._mousedown$.next(true);
  }

  private _listenForLongPress(): void {
    this._mousedown$
      .pipe(
        filter(() => this._isMobile),
        tap(() => this._mouseup$.next(false)),
        switchMap(() => timer(this.appLongPress || 500)),
        withLatestFrom(this._mouseup$),
        filter(([_, mouseup]) => !mouseup),
        takeUntil(this._destroy$)
      )
      .subscribe(() => this.longPress.emit());
  }
}
