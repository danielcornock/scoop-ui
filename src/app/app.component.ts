import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { AuthService } from './auth/services/auth/auth.service';
import { PageTitleService } from './core/services/page-title/page-title.service';
import { PopupService } from './shared/services/popup/popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: Observable<string>;

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _pageTitleService: PageTitleService,
    private readonly _popupService: PopupService
  ) {}

  public ngOnInit(): void {
    this._subscribeToTitleChange();
    this._listenToConnectionState();
  }

  public isLoggedIn(): boolean {
    return this._authService.isAuthenticated();
  }

  private _listenToConnectionState(): void {
    window.addEventListener(
      'online',
      (e) => {
        this._popupService.showSuccess(
          'You are now re-connected to the internet.',
          'Woo hoo!'
        );
      },
      false
    );

    window.addEventListener(
      'offline',
      () => {
        this._popupService.showCustomError(
          'You are disconnected from the internet.',
          'Uh oh!'
        );
      },
      false
    );
  }

  private _subscribeToTitleChange(): void {
    this.title = this._router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => this._pageTitleService.getTitle(event))
    );
  }
}
