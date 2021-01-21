import { Component, Input, OnChanges } from '@angular/core';
import { barChartColors } from 'src/app/shared/constants/chart-colors.constant';
import { ChartService } from 'src/app/shared/services/chart/chart.service';

import { IInvestmentLog } from '../../interfaces/investment-log.interface';

@Component({
  selector: 'app-investments-monthly-change-card',
  templateUrl: './investments-monthly-change-card.component.html',
  styleUrls: ['./investments-monthly-change-card.component.scss']
})
export class InvestmentsMonthlyChangeCardComponent implements OnChanges {
  @Input()
  public investmentsMonthlyChangeData: Array<IInvestmentLog>;

  private _processedTrendsData: Array<{ date: string; change: number }>;

  constructor(private readonly _chartService: ChartService) {}

  ngOnChanges(): void {
    this._processTrendsData();
    this._createBarChart();
  }

  private _processTrendsData(): void {
    this._processedTrendsData = [...this.investmentsMonthlyChangeData]
      .reverse()
      .map((item) => {
        return {
          date: item.date,
          change: item.profitChangeSinceLast
        };
      });
  }

  private _createBarChart(): void {
    this._chartService.createBarChart('investmentsMonthlyChange', {
      labels: this._getArrayOfFields('date'),
      datasets: [
        {
          label: 'Change from previous month',
          data: this._getArrayOfFields('change').map(Math.round) as number[],
          borderColor: 'rgba(255,255,255, 0)',
          backgroundColor: [...barChartColors],
          borderWidth: 2
        }
      ]
    });
  }

  private _getArrayOfFields(key: string): Array<string | number> {
    const fields = this._processedTrendsData.map((item) => item[key]);

    /* To remove the first item, as it is always 0 */
    fields.shift();
    return fields;
  }
}
