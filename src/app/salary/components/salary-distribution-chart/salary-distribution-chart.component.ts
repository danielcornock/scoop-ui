import { Component, Input, OnInit } from '@angular/core';
import { startCase } from 'lodash';
import { chartColors } from 'src/app/shared/constants/chart-colors.constant';
import { ChartService } from 'src/app/shared/services/chart/chart.service';

import { ISalary } from '../../interfaces/salary.interface';

@Component({
  selector: 'app-salary-distribution-chart',
  templateUrl: './salary-distribution-chart.component.html',
  styleUrls: ['./salary-distribution-chart.component.scss']
})
export class SalaryDistributionChartComponent implements OnInit {
  @Input()
  public salaryDistributionChartData: ISalary;

  constructor(private readonly _chartService: ChartService) {}

  ngOnInit(): void {
    const labels = Object.keys(this.salaryDistributionChartData).map(startCase);
    const data = Object.values(this.salaryDistributionChartData);

    this._chartService.createPieChart(
      'salaryDeductionsChart',
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
