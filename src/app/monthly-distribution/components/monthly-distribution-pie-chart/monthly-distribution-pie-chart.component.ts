import { Component, Input, OnInit } from '@angular/core';
import { map, startCase } from 'lodash';
import { chartColors } from 'src/app/shared/constants/chart-colors.constant';
import { ChartService } from 'src/app/shared/services/chart/chart.service';

import { IMonthlyDistributionLog } from '../../interfaces/monthly-distribution-log.interface';

@Component({
  selector: 'app-monthly-distribution-pie-chart',
  templateUrl: './monthly-distribution-pie-chart.component.html',
  styleUrls: ['./monthly-distribution-pie-chart.component.scss']
})
export class MonthlyDistributionPieChartComponent implements OnInit {
  @Input()
  monthlyDistributionPieChartData: IMonthlyDistributionLog;

  constructor(private readonly _chartService: ChartService) {}

  ngOnInit(): void {
    const data = map(
      this.monthlyDistributionPieChartData.outgoing,
      (item, key) => ({ label: key, value: item })
    ).sort((a, b) => b.value - a.value);

    this._chartService.createPieChart(
      'monthlyDistributionPieChart',
      {
        labels: data.map((item) => startCase(item.label)),
        datasets: [
          {
            data: data.map((item) => item.value),
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
