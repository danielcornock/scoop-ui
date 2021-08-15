import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, of, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { PwaService } from 'src/app/download/services/pwa/pwa.service';
import { IContextMenuItem } from 'src/app/shared/components/context-menu/interfaces/context-menu-item.interface';
import {
  IDetailedContextMenuItem,
} from 'src/app/shared/components/detailed-context-menu/interfaces/detailed-context-menu-item.interface';
import { SCREEN_SIZE, ScreenWidthService } from 'src/app/shared/services/screen-width/screen-width.service';

import { notificationDictionary } from '../../constants/notification-dictionary.constant';
import { IHeaderAction } from '../../interfaces/header-action.interface';
import { HeaderActionService } from '../../services/header-action/header-action.service';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-user-settings-menu',
  templateUrl: './user-settings-menu.component.html',
  styleUrls: ['./user-settings-menu.component.scss']
})
export class UserSettingsMenuComponent implements OnInit, OnDestroy {
  public menuItems: Array<IContextMenuItem>;
  public name: string;
  public notifications: Array<IDetailedContextMenuItem>;
  public action: IHeaderAction | null;

  private _destroy$ = new Subject<void>();

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _httpService: HttpService,
    private readonly _location: Location,
    private readonly _headerActionService: HeaderActionService,
    private readonly _screenWidthService: ScreenWidthService,
    private _pwaService: PwaService
  ) {}

  ngOnInit(): void {
    this._getAction();
    this.name = this._authService.getLoggedInUserName();
    this._getNotifications();
    this._setMenuItems();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public goBack(): void {
    this._location.back();
  }

  private _setMenuItems(): void {
    this.menuItems = [
      {
        label: 'User Settings',
        action: this._goToUserSettings.bind(this),
        icon: 'user'
      },
      {
        label: 'User Manual',
        action: this._goToDocumentation.bind(this),
        icon: 'external-link'
      },
      {
        label: 'Download',
        icon: 'download',
        action: this._pwaService.promptDownload.bind(this),
        hideWhen$: this._pwaService.canDownload$.pipe(
          map((canDownload) => !canDownload)
        )
      },
      {
        label: 'Log Out',
        action: this._logOut.bind(this),
        icon: 'log-out'
      }
    ];
  }

  private _goToDocumentation(): void {
    window.open('https://www.scoopfinance.co.uk/documentation');
  }

  private _getAction(): void {
    combineLatest([
      this._screenWidthService.getScreenWidth$(),
      this._headerActionService.getAction()
    ])
      .pipe(
        switchMap(([width, action]) => {
          if (!action) {
            return of(null);
          }

          if (width !== SCREEN_SIZE.Mobile) {
            return of(null);
          }

          return of(action);
        }),
        takeUntil(this._destroy$)
      )
      .subscribe((action) => {
        this.action = action;
      });
  }

  private async _getNotifications(): Promise<void> {
    const { data } = await this._httpService.get('notifications');

    this.notifications = data.map((notification) => {
      return {
        id: notification._id,
        title: notification.title,
        text: notification.text,
        icon: notificationDictionary[notification.name]?.icon ?? 'alert-circle',
        actions: [
          {
            label: 'Delete',
            icon: 'x',
            action: this._removeNotification.bind(this)
          }
        ]
      };
    });
  }

  private async _removeNotification(index: number): Promise<void> {
    const notificationId: string = this.notifications[index].id;
    await this._httpService.delete(`notifications/${notificationId}`);
    this.notifications = this.notifications.filter(
      (notification) => notification.id !== notificationId
    );
  }

  private _goToUserSettings(): void {
    this._router.navigateByUrl('user-settings');
  }

  private _logOut(): void {
    this._authService.removeJwt();
    this._router.navigateByUrl('login');
  }
}
