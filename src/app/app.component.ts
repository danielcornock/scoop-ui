import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { AuthService } from './auth/services/auth/auth.service';
import { PageTitleService } from './core/services/page-title/page-title.service';
import { ExperimentalService } from './shared/services/experimental/experimental.service';
import { PopupService } from './shared/services/popup/popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: Observable<string>;
  public isDevelopment: boolean;

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _pageTitleService: PageTitleService,
    private readonly _popupService: PopupService,
    private readonly _experimentalService: ExperimentalService
  ) {}

  public ngOnInit(): void {
    this.isDevelopment = this._experimentalService.isDevelopment();
    this._subscribeToTitleChange();
    this._listenToConnectionState();
  }

  public isLoggedIn(): boolean {
    return this._authService.isAuthenticated();
  }

  public toggleExperimental(): void {
    this._experimentalService.toggleExperimental();
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
