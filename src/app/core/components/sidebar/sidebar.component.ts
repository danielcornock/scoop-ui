import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { UserSettingsService } from 'src/app/settings/services/user-settings/user-settings.service';

import { INavigationItem } from './interfaces/navigation-item.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public navItems: Array<INavigationItem>;
  public isInvestmentsEnabled: boolean;
  public isNetWorthEnabled: boolean;
  public isMonthlyDistributionEnabled: boolean;

  constructor(
    private readonly _authService: AuthService,
    private readonly _userSettingsService: UserSettingsService
  ) {}

  async ngOnInit(): Promise<void> {
    await this._assignUserSettings();
    this._assignNavItems();
  }

  private async _assignUserSettings(): Promise<void> {
    const settings = await this._userSettingsService.getUserSettings();
    this.isInvestmentsEnabled = settings.enableInvestments;
    this.isNetWorthEnabled = settings.enableNetWorth;
    this.isMonthlyDistributionEnabled = settings.enableMonthlyDistribution;
  }

  private _assignNavItems(): void {
    this.navItems = [];

    if (this.isInvestmentsEnabled) {
      this.navItems.push({
        label: 'Investments',
        link: 'investments',
        icon: 'trending-up'
      });
    }
    if (this.isMonthlyDistributionEnabled) {
      this.navItems.push({
        label: 'Monthly Distribution',
        link: 'monthly-distribution',
        icon: 'calendar'
      });
    }
    if (this.isNetWorthEnabled) {
      this.navItems.push({
        label: 'Net Worth',
        link: 'net-worth',
        icon: 'file-text'
      });
    }

    this.navItems.push({
      label: 'Settings',
      link: 'settings',
      icon: 'settings'
    });

    if (this._authService.isUserAdmin()) {
      this.navItems.push({
        label: 'Admin',
        link: 'admin',
        icon: 'lock'
      });
    }
  }
}
