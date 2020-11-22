import { Component, Input, OnInit } from '@angular/core';
import { Dictionary, map, upperFirst } from 'lodash';
import { chartColors } from 'src/app/shared/constants/chart-colors.constant';
import { ChartService } from 'src/app/shared/services/chart/chart.service';

@Component({
  selector: 'app-monthly-distribution-pie-chart',
  templateUrl: './monthly-distribution-pie-chart.component.html',
  styleUrls: ['./monthly-distribution-pie-chart.component.scss']
})
export class MonthlyDistributionPieChartComponent implements OnInit {
  @Input()
  monthlyDistributionPieChartData: Dictionary<number>;

  constructor(private readonly _chartService: ChartService) {}

  ngOnInit(): void {
    const labels = Object.keys(this.monthlyDistributionPieChartData).map(
      upperFirst
    );
    const data = map(this.monthlyDistributionPieChartData, (item) => item);

    this._chartService.createPieChart(
      'monthlyDistributionPieChart',
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
