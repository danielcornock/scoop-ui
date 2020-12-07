import { Component, Input, OnChanges } from '@angular/core';
import { barChartColors } from 'src/app/shared/constants/chart-colors.constant';
import { ChartService } from 'src/app/shared/services/chart/chart.service';

import { INetWorthData } from '../../interfaces/net-worth-api-response.interface';

@Component({
  selector: 'app-net-worth-monthly-change-card',
  templateUrl: './net-worth-monthly-change-card.component.html',
  styleUrls: ['./net-worth-monthly-change-card.component.scss']
})
export class NetWorthMonthlyChangeCardComponent implements OnChanges {
  @Input()
  public netWorthMonthlyChangeData: Array<INetWorthData>;

  private _processedTrendsData: Array<{ date: string; change: number }>;

  constructor(private readonly _chartService: ChartService) {}

  ngOnChanges(): void {
    this._processTrendsData();
    this._createBarChart();
  }

  private _createBarChart(): void {
    this._chartService.createBarChart('netWorthMonthlyChange', {
      labels: this._getArrayOfFields('date'),
      datasets: [
        {
          label: 'Change from previous month',
          data: this._getArrayOfFields('change') as number[],
          borderColor: 'rgba(255,255,255, 0)',
          backgroundColor: [...barChartColors],
          borderWidth: 2
        }
      ]
    });
  }

  private _processTrendsData(): void {
    this._processedTrendsData = [...this.netWorthMonthlyChangeData]
      .reverse()
      .map((data) => {
        return {
          date: data.date,
          change: data.change
        };
      });
  }

  private _getArrayOfFields(key: string): Array<string | number> {
    const fields = this._processedTrendsData.map((item) => item[key]);

    /* To remove the first item, as it is always 0 */
    fields.shift();
    return fields;
  }
}
