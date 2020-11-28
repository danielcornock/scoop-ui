import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { fromEvent, Subject, timer } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-floating-action-button',
  templateUrl: './floating-action-button.component.html',
  styleUrls: ['./floating-action-button.component.scss']
})
export class FloatingActionButtonComponent implements OnInit, OnDestroy {
  @Input()
  public floatingActionButtonText: string;

  @Input()
  public floatingActionButtonIcon: string;

  @Output()
  public floatingActionButtonAction: EventEmitter<void> = new EventEmitter();

  public displayingAction = true;

  private _destroy$: Subject<void> = new Subject();

  ngOnInit(): void {
    this._scrollSpy();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public clickAction(): void {
    this.floatingActionButtonAction.emit();
  }

  private _scrollSpy(): void {
    const app = document.querySelector('.App-content');
    let lastScrollTop = 0;

    fromEvent(app, 'scroll')
      .pipe(
        takeUntil(this._destroy$),
        filter((e) => {
          const scrollTop = (e.target as HTMLElement).scrollTop;
          const isGoingDown = scrollTop > lastScrollTop;
          lastScrollTop = scrollTop;

          return isGoingDown;
        }),
        switchMap((e) => {
          this.displayingAction = false;
          return timer(1000);
        })
      )
      .subscribe(() => {
        this.displayingAction = true;
      });
  }
}
