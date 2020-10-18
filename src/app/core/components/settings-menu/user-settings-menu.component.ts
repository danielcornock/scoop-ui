import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { IContextMenuItem } from 'src/app/shared/components/context-menu/interfaces/context-menu-item.interface';

@Component({
  selector: 'app-user-settings-menu',
  templateUrl: './user-settings-menu.component.html',
  styleUrls: ['./user-settings-menu.component.scss']
})
export class UserSettingsMenuComponent implements OnInit {
  public menuItems: Array<IContextMenuItem>;
  public name: string;

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this.name = this._authService.getLoggedInUserName();
    this.menuItems = [
      {
        label: 'Log Out',
        action: this._logOut.bind(this),
        icon: 'log-out'
      }
    ];
  }

  private _logOut(): void {
    this._authService.removeJwt();
    this._router.navigateByUrl('login');
  }
}
