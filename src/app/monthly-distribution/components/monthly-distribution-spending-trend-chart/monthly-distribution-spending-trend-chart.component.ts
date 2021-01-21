import { Component, Input, OnChanges } from '@angular/core';
import { Dictionary, map, startCase } from 'lodash';
import { chartColors } from 'src/app/shared/constants/chart-colors.constant';
import { ChartService } from 'src/app/shared/services/chart/chart.service';

@Component({
  selector: 'app-monthly-distribution-spending-trend-chart',
  templateUrl: './monthly-distribution-spending-trend-chart.component.html',
  styleUrls: ['./monthly-distribution-spending-trend-chart.component.scss']
})
export class MonthlyDistributionSpendingTrendChartComponent
  implements OnChanges {
  @Input()
  public monthlyDistributionSpendingTrendChartData: Dictionary<number>;

  constructor(private readonly _chartService: ChartService) {}

  ngOnChanges(): void {
    const data = map(
      this.monthlyDistributionSpendingTrendChartData,
      (item, key) => ({ label: key, value: item })
    ).sort((a, b) => b.value - a.value);

    this._chartService.createPieChart(
      'monthlyDistributionPieChart2',
      {
        labels: data.map((item) => startCase(item.label)),
        datasets: [
          {
            data: data.map((item) => Math.round(item.value)),
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
