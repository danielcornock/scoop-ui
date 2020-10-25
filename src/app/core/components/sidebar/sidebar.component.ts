import { Component, OnInit } from '@angular/core';
import { ExperimentalService } from 'src/app/shared/services/experimental/experimental.service';

import { INavigationItem } from './interfaces/navigation-item.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public navItems: Array<INavigationItem>;

  constructor(private readonly _experimentalService: ExperimentalService) {}

  ngOnInit(): void {
    this._assignNavItems();
  }

  private _assignNavItems(): void {
    this.navItems = [
      {
        label: 'Investments',
        link: 'investments',
        icon: 'trending-up'
      },
      {
        label: 'Net Worth',
        link: 'net-worth',
        icon: 'file-text'
      },
      {
        label: 'Settings',
        link: 'settings',
        icon: 'settings'
      }
    ];

    if (this._experimentalService.isDevelopment()) {
      this.navItems.splice(1, 0, {
        label: 'Monthly Distribution',
        link: 'monthly-distribution',
        icon: 'calendar'
      });
    }
  }
}
