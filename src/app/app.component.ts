import { Component, OnInit } from '@angular/core';
import { Event, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { AuthService } from './auth/services/auth/auth.service';
import { PageTitleService } from './core/services/page-title/page-title.service';

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
    private readonly _pageTitleService: PageTitleService
  ) {}

  public ngOnInit(): void {
    this._subscribeToTitleChange();
  }

  public isLoggedIn(): boolean {
    return this._authService.isAuthenticated();
  }

  private _subscribeToTitleChange(): void {
    this.title = this._router.events.pipe(
      filter((event: Event) => event instanceof NavigationStart),
      map((event) =>
        this._pageTitleService.getTitle((event as RouterEvent).url)
      )
    );
  }
}
