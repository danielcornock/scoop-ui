import { Component, Input, OnInit } from '@angular/core';
import { ChartService } from 'src/app/shared/services/chart/chart.service';

import { INetWorthApiResponse } from '../../interfaces/net-worth-api-response.interface';

@Component({
  selector: 'app-net-worth-monthly-change-card',
  templateUrl: './net-worth-monthly-change-card.component.html',
  styleUrls: ['./net-worth-monthly-change-card.component.scss']
})
export class NetWorthMonthlyChangeCardComponent implements OnInit {
  @Input()
  public netWorthMonthlyChangeData: Array<INetWorthApiResponse>;

  private _processedTrendsData: Array<{ date: string; change: number }>;

  constructor(private readonly _chartService: ChartService) {}

  ngOnInit(): void {
    this._processTrendsData();
    this._chartService.createBarChart(
      'netWorthMonthlyChange',
      {
        labels: this._getArrayOfFields('date'),
        datasets: [
          {
            label: 'Total Invested',
            data: this._getArrayOfFields('change') as number[],
            borderColor: 'rgba(255,255,255, 0)',
            backgroundColor: [
              'rgba(28,128,220, 0.2)',
              'rgba(28,128,220, 0.4)',
              'rgba(28,128,220, 0.6)',
              'rgba(28,128,220, 0.8)',
              'rgba(28,128,220, 1)',
              'rgba(28,128,220, 0.2)',
              'rgba(28,128,220, 0.4)',
              'rgba(28,128,220, 0.6)',
              'rgba(28,128,220, 0.8)',
              'rgba(28,128,220, 1)',
              'rgba(28,128,220, 0.2)',
              'rgba(28,128,220, 0.4)',
              'rgba(28,128,220, 0.6)',
              'rgba(28,128,220, 0.8)',
              'rgba(28,128,220, 1)',
              'rgba(28,128,220, 0.2)',
              'rgba(28,128,220, 0.4)',
              'rgba(28,128,220, 0.6)',
              'rgba(28,128,220, 0.8)',
              'rgba(28,128,220, 1)'
            ],
            borderWidth: 2
          }
        ]
      },
      {}
    );
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

    return fields;
  }
}
