import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monthly-log-card',
  templateUrl: './monthly-log-card.component.html',
  styleUrls: ['./monthly-log-card.component.scss']
})
export class MonthlyLogCardComponent implements OnInit {
  public logs: Array<any>;

  constructor() {}

  ngOnInit(): void {
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
}
