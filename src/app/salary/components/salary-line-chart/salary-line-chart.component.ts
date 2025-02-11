import { Component, Input, OnChanges } from '@angular/core';
import { ChartService } from 'src/app/shared/services/chart/chart.service';

import { ISalary } from '../../interfaces/salary.interface';

@Component({
  selector: 'app-salary-line-chart',
  templateUrl: './salary-line-chart.component.html',
  styleUrls: ['./salary-line-chart.component.scss']
})
export class SalaryLineChartComponent implements OnChanges {
  @Input() salaryLineChartData: Array<ISalary>;

  constructor(private readonly _chartService: ChartService) {}

  ngOnChanges(): void {
    this._chartService.createLineChart('netSalaryChart', {
      labels: this._getArrayOfFields('date'),
      datasets: [
        {
          label: 'Net Salary',
          data: this._getArrayOfFields('netSalary').map(Math.round),
          borderColor: 'rgba(28,128,220, 1)',
          backgroundColor: 'rgba(28,128,220, 0.08)',
          borderWidth: 2
        },
        {
          label: 'Gross Salary',
          data: this._getArrayOfFields('grossSalary').map(Math.round),
          borderColor: 'rgba(28,128,220, 0.6)',
          backgroundColor: 'rgba(28,128,220, 0.08)',
          borderWidth: 2,
          borderDash: [5]
        }
      ]
    });
  }

  private _getArrayOfFields(key: string): Array<string | number> {
    const fields = [...this.salaryLineChartData]
      .reverse()
      .map((item) => item[key]);

    return fields;
  }
}
