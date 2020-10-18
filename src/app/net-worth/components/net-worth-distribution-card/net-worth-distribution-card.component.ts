import { Component, Input, OnInit } from '@angular/core';
import { upperFirst } from 'lodash';
import { ChartService } from 'src/app/shared/services/chart/chart.service';

import { INetWorthApiResponse } from '../../interfaces/net-worth-api-response.interface';

@Component({
  selector: 'app-net-worth-distribution-card',
  templateUrl: './net-worth-distribution-card.component.html',
  styleUrls: ['./net-worth-distribution-card.component.scss']
})
export class NetWorthDistributionCardComponent implements OnInit {
  @Input()
  public netWorthDistributionData: INetWorthApiResponse;

  private _fields: Array<string>;

  constructor(private readonly _chartService: ChartService) {}

  ngOnInit(): void {
    this._fields = Object.keys(this.netWorthDistributionData.customValues);

    console.log(this._fields);
    this._chartService.createPieChart(
      'netWorthPieChart',
      {
        labels: this._fields.map(upperFirst),
        datasets: [
          {
            data: this._fields.map(
              (fieldName) =>
                this.netWorthDistributionData.customValues[fieldName]
            ),
            backgroundColor: [
              'rgba(28,128,220, 1)',
              'rgba(28,128,220, 0.8)',
              'rgba(28,128,220, 0.6)',
              'rgba(28,128,220, 0.4)',
              'rgba(28,128,220, 0.2)'
            ]
          }
        ]
      },
      {
        legendPosition: 'left'
      }
    );
  }
}
