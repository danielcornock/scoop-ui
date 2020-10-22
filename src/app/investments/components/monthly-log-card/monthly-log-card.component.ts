import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContextMenuItem } from 'src/app/shared/components/context-menu/interfaces/context-menu-item.interface';

@Component({
  selector: 'app-monthly-log-card',
  templateUrl: './monthly-log-card.component.html',
  styleUrls: ['./monthly-log-card.component.scss']
})
export class MonthlyLogCardComponent implements OnInit {
  public logs: Array<any>;
  public actions: Array<IContextMenuItem>;

  constructor(private readonly _router: Router) {}

  ngOnInit(): void {
    this._createCardActions();

    this.logs = [
      {
        date: 'February 20',
        added: '£400',
        invested: '£1200',
        value: '£1500',
        returns: '£300',
        percentage: '25%',
        change: '10.4%'
      },
      {
        date: 'March 20',
        added: '£400',
        invested: '£1200',
        value: '£1500',
        returns: '£300',
        percentage: '25%',
        change: '10.4%'
      },
      {
        date: 'April 20',
        added: '£400',
        invested: '£1200',
        value: '£1500',
        returns: '£300',
        percentage: '25%',
        change: '10.4%'
      }
    ];
  }

  private _createCardActions(): void {
    this.actions = [
      {
        label: 'Create entry',
        action: () => this._router.navigateByUrl('investments/create'),
        icon: 'plus'
      }
    ];
  }
}
