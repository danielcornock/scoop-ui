import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { IContextMenuItem } from 'src/app/shared/components/context-menu/interfaces/context-menu-item.interface';
import {
  IDetailedContextMenuItem,
} from 'src/app/shared/components/detailed-context-menu/interfaces/detailed-context-menu-item.interface';

import { notificationDictionary } from '../../constants/notification-dictionary.constant';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-user-settings-menu',
  templateUrl: './user-settings-menu.component.html',
  styleUrls: ['./user-settings-menu.component.scss']
})
export class UserSettingsMenuComponent implements OnInit {
  public menuItems: Array<IContextMenuItem>;
  public name: string;
  public notifications: Array<IDetailedContextMenuItem>;

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.name = this._authService.getLoggedInUserName();
    this._getNotifications();
    this.menuItems = [
      {
        label: 'User Settings',
        action: this._goToUserSettings.bind(this),
        icon: 'user'
      },
      {
        label: 'Log Out',
        action: this._logOut.bind(this),
        icon: 'log-out'
      }
    ];
  }

  private async _getNotifications(): Promise<void> {
    const { data } = await this._httpService.get('notifications');

    this.notifications = data.map((notification) => {
      return {
        id: notification._id,
        title: notification.title,
        text: notification.text,
        icon: notificationDictionary[notification.name].icon,
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
