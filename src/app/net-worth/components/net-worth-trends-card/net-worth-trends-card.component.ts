import { Component, Input, OnInit } from '@angular/core';
import { ChartService } from 'src/app/shared/services/chart/chart.service';

import { INetWorthApiResponse } from '../../interfaces/net-worth-api-response.interface';

@Component({
  selector: 'app-net-worth-trends-card',
  templateUrl: './net-worth-trends-card.component.html',
  styleUrls: ['./net-worth-trends-card.component.scss']
})
export class NetWorthTrendsCardComponent implements OnInit {
  @Input()
  public netWorthTrendsData: Array<INetWorthApiResponse>;

  private _processedTrendsData: Array<{ date: string; total: number }>;

  constructor(private readonly _chartService: ChartService) {}

  ngOnInit(): void {
    this._processTrendsData();
    this._chartService.createLineChart('netWorthTrends', {
      labels: this._getArrayOfFields('date'),
      datasets: [
        {
          label: 'Net Worth',
          data: this._getArrayOfFields('total') as number[],
          borderColor: 'rgba(28,128,220, 1)',
          backgroundColor: 'rgba(28,128,220, 0.08)',
          borderWidth: 2
        }
      ]
    });
  }

  private _getArrayOfFields(key: string): Array<string | number> {
    const fields = this._processedTrendsData.map((item) => item[key]);

    return fields;
  }

  private _processTrendsData(): void {
    this._processedTrendsData = [...this.netWorthTrendsData]
      .reverse()
      .map((data) => {
        return {
          date: data.date,
          total: data.total
        };
      });
  }
}
