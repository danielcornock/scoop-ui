import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/app/shared/services/chart/chart.service';

@Component({
  selector: 'app-trends-card',
  templateUrl: './trends-card.component.html',
  styleUrls: ['./trends-card.component.scss']
})
export class TrendsCardComponent implements OnInit {
  constructor(private readonly _chartService: ChartService) {}

  ngOnInit(): void {
    this._createGraphConfig();
  }

  private _createGraphConfig(): void {
    this._chartService.createLineChart(
      'investmentTrend',
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
            label: 'Total Invested',
            data: [300, 600, 1200, 1200, 1200],
            borderColor: 'rgba(28,128,220, 1)',
            backgroundColor: 'rgba(28,128,220, 0.08)',
            borderWidth: 2
          },
          {
            label: 'Investment Value',
            data: [306, 634, 1350, 1210, 1130],
            borderColor: 'green',
            backgroundColor: 'rgba(54,87,220, 0.08)',
            borderWidth: 2
          }
        ]
      },
      { yAxisStepSize: 400 }
    );
  }
}
