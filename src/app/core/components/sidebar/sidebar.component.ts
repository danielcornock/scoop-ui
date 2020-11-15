import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { UserSettingsService } from 'src/app/settings/services/user-settings/user-settings.service';

import { HttpService } from '../../services/http/http.service';
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
  public isSalaryEnabled: boolean;
  public sidebarMinimised: boolean;

  constructor(
    private readonly _authService: AuthService,
    private readonly _userSettingsService: UserSettingsService,
    private readonly _httpService: HttpService
  ) {}

  async ngOnInit(): Promise<void> {
    this.sidebarMinimised =
      localStorage.getItem('sidebarState') === 'minimised';
    await this._assignUserSettings();
    this._assignNavItems();
    this._httpService.post('auth/ping', {});
  }

  public changeSidebarState(): void {
    if (this.sidebarMinimised) {
      localStorage.setItem('sidebarState', 'maximised');
      this.sidebarMinimised = false;
    } else {
      localStorage.setItem('sidebarState', 'minimised');
      this.sidebarMinimised = true;
    }
  }

  private async _assignUserSettings(): Promise<void> {
    const settings = await this._userSettingsService.getUserSettings();
    this.isInvestmentsEnabled = settings.enableInvestments;
    this.isNetWorthEnabled = settings.enableNetWorth;
    this.isMonthlyDistributionEnabled = settings.enableMonthlyDistribution;
    this.isSalaryEnabled = settings.enableSalary;
  }

  private _assignNavItems(): void {
    this.navItems = [];

    if (this.isNetWorthEnabled) {
      this.navItems.push({
        label: 'Net Worth',
        link: 'net-worth',
        icon: 'file-text'
      });
    }

    if (this.isMonthlyDistributionEnabled) {
      this.navItems.push({
        label: 'Monthly Distribution',
        link: 'monthly-distribution',
        icon: 'calendar'
      });
    }

    if (this.isInvestmentsEnabled) {
      this.navItems.push({
        label: 'Investments',
        link: 'investments',
        icon: 'trending-up'
      });
    }

    if (this.isSalaryEnabled) {
      this.navItems.push({
        label: 'Salary Tracker',
        link: 'salary',
        icon: 'dollar-sign'
      });
    }

    if (this._authService.isUserAdmin()) {
      this.navItems.push({
        label: 'Admin',
        link: 'admin',
        icon: 'lock'
      });
    }

    this.navItems.push({
      label: 'Settings',
      link: 'settings',
      icon: 'settings'
    });
  }
}
