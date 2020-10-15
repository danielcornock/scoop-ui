import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/app/shared/services/chart/chart.service';

@Component({
  selector: 'app-net-worth-trends-card',
  templateUrl: './net-worth-trends-card.component.html',
  styleUrls: ['./net-worth-trends-card.component.scss']
})
export class NetWorthTrendsCardComponent implements OnInit {
  constructor(private readonly _chartService: ChartService) {}

  ngOnInit(): void {
    this._chartService.createLineChart(
      'netWorthTrends',
      {
        labels: [
          '12/04/2020',
          '12/05/2020',
          '12/06/2020',
          '12/07/2020',
          '20/07/2020'
        ],
        datasets: [
          {
            label: 'Net Worth',
            data: [3000, 6000, 12000, 13500, 12000],
            borderColor: 'rgba(28,128,220, 1)',
            backgroundColor: 'rgba(28,128,220, 0.08)',
            borderWidth: 2
          }
        ]
      },
      { yAxisStepSize: 2000 }
    );
  }
}
