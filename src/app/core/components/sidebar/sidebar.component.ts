import { Component, OnInit } from '@angular/core';
import { INavigationItem } from './interfaces/navigation-item.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public navItems: Array<INavigationItem>;

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
        label: 'Monthly Distribution',
        link: 'monthly-distribution',
        icon: 'calendar'
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
  }
}
