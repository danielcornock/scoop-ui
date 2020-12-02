import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import { filter, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';

@Directive({
  selector: '[appLongPress]'
})
export class LongPressDirective implements OnInit, OnDestroy {
  @Input()
  public appLongPress;

  @Output()
  public longPress: EventEmitter<MouseEvent> = new EventEmitter();

  public mouseup$ = new BehaviorSubject(false);
  public mousedown$ = new Subject();
  public destroy$ = new Subject();

  public ngOnInit(): void {
    this.mousedown$
      .pipe(
        tap(() => this.mouseup$.next(false)),
        switchMap(() => timer(this.appLongPress || 500)),
        withLatestFrom(this.mouseup$),
        filter(([_, mouseup]) => !mouseup),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.longPress.emit());
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  @HostListener('mouseup', ['$event'])
  public onMouseUp(): void {
    this.mouseup$.next(true);
  }

  @HostListener('mousedown', ['$event'])
  public onMouseDown(): void {
    this.mousedown$.next(true);
  }
}
