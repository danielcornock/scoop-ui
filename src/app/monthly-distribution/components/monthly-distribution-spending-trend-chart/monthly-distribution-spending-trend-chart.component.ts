import { Component, Input, OnInit } from '@angular/core';
import { Dictionary, map, startCase } from 'lodash';
import { chartColors } from 'src/app/shared/constants/chart-colors.constant';
import { ChartService } from 'src/app/shared/services/chart/chart.service';

@Component({
  selector: 'app-monthly-distribution-spending-trend-chart',
  templateUrl: './monthly-distribution-spending-trend-chart.component.html',
  styleUrls: ['./monthly-distribution-spending-trend-chart.component.scss']
})
export class MonthlyDistributionSpendingTrendChartComponent implements OnInit {
  @Input()
  public monthlyDistributionSpendingTrendChartData: Dictionary<number>;

  constructor(private readonly _chartService: ChartService) {}

  ngOnInit(): void {
    const data = map(
      this.monthlyDistributionSpendingTrendChartData,
      (item) => item
    );

    const labels = Object.keys(
      this.monthlyDistributionSpendingTrendChartData
    ).map(startCase);

    this._chartService.createPieChart(
      'monthlyDistributionPieChart2',
      {
        labels,
        datasets: [
          {
            data,
            backgroundColor: [...chartColors].reverse()
          }
        ]
      },
      {
        legendPosition: 'left'
      }
    );
  }
}
