import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/app/shared/services/chart/chart.service';

@Component({
  selector: 'app-net-worth-monthly-change-card',
  templateUrl: './net-worth-monthly-change-card.component.html',
  styleUrls: ['./net-worth-monthly-change-card.component.scss']
})
export class NetWorthMonthlyChangeCardComponent implements OnInit {
  constructor(private readonly _chartService: ChartService) {}

  ngOnInit(): void {
    this._chartService.createBarChart(
      'netWorthMonthlyChange',
      {
        labels: ['August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Total Invested',
            data: [850, 750, 475, 900, 1010],
            borderColor: 'rgba(255,255,255, 0)',
            backgroundColor: [
              'rgba(28,128,220, 0.2)',
              'rgba(28,128,220, 0.4)',
              'rgba(28,128,220, 0.6)',
              'rgba(28,128,220, 0.8)',
              'rgba(28,128,220, 1)'
            ],
            borderWidth: 2
          }
        ]
      },
      {}
    );
  }
}
