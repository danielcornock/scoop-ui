import { Component, Input, OnInit } from '@angular/core';
import { ChartService } from 'src/app/shared/services/chart/chart.service';

import { IInvestmentLog } from '../../interfaces/investment-log.interface';

@Component({
  selector: 'app-trends-card',
  templateUrl: './trends-card.component.html',
  styleUrls: ['./trends-card.component.scss']
})
export class TrendsCardComponent implements OnInit {
  @Input()
  public trendsCardData: Array<IInvestmentLog>;

  private _processedTrendsData: Array<{
    date: string;
    invested: number;
    value: number;
  }>;

  constructor(private readonly _chartService: ChartService) {}

  ngOnInit(): void {
    this._processTrendsData();
    this._createGraphConfig();
  }

  private _createGraphConfig(): void {
    this._chartService.createLineChart(
      'investmentTrend',
      {
        labels: this._getArrayOfFields('date'),
        datasets: [
          {
            label: 'Total Invested',
            data: this._getArrayOfFields('invested') as number[],
            borderColor: 'rgba(28,128,220, 1)',
            backgroundColor: 'rgba(28,128,220, 0.08)',
            borderWidth: 2
          },
          {
            label: 'Investment Value',
            data: this._getArrayOfFields('value') as number[],
            borderColor: 'green',
            backgroundColor: 'rgba(54,87,220, 0.08)',
            borderWidth: 2
          }
        ]
      },
      { yAxisStepSize: 400 }
    );
  }

  private _getArrayOfFields(key: string): Array<string | number> {
    const fields = this._processedTrendsData.map((item) => item[key]);

    return fields;
  }

  private _processTrendsData(): void {
    this._processedTrendsData = [...this.trendsCardData]
      .reverse()
      .map((data) => {
        return {
          date: data.date,
          invested: data.totalInvested,
          value: data.totalValue
        };
      });
  }
}
