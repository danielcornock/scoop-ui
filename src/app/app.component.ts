import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { AuthService } from './auth/services/auth/auth.service';
import { AppUpdateService } from './core/services/app-update/app-update.service';
import { PageTitleService } from './core/services/page-title/page-title.service';
import { slideIn } from './routing/routing.animation';
import { ExperimentalService } from './shared/services/experimental/experimental.service';
import { PopupService } from './shared/services/popup/popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideIn]
})
export class AppComponent implements OnInit {
  public title: Observable<string>;
  public isDevelopment: boolean;

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _pageTitleService: PageTitleService,
    private readonly _popupService: PopupService,
    private readonly _experimentalService: ExperimentalService,
    private readonly _appUpdateService: AppUpdateService
  ) {}

  public ngOnInit(): void {
    this._appUpdateService.listenForUpdates();
    this.isDevelopment = this._experimentalService.isDevelopment();
    this._subscribeToTitleChange();
    this._listenToConnectionState();
  }

  public prepareRoute(outlet: RouterOutlet): string {
    return outlet?.activatedRouteData?.animation;
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
