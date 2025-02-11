import { Component, Input, OnChanges } from '@angular/core';
import { startCase } from 'lodash';
import { chartColors } from 'src/app/shared/constants/chart-colors.constant';
import { ChartService } from 'src/app/shared/services/chart/chart.service';

@Component({
  selector: 'app-net-worth-distribution-card',
  templateUrl: './net-worth-distribution-card.component.html',
  styleUrls: ['./net-worth-distribution-card.component.scss']
})
export class NetWorthDistributionCardComponent implements OnChanges {
  @Input()
  public netWorthDistributionData: Array<{ label: string; value: number }>;

  private _fields: Array<string>;
  private _values: Array<number>;

  constructor(private readonly _chartService: ChartService) {}

  ngOnChanges(): void {
    this._fields = this.netWorthDistributionData.map((item) =>
      startCase(item.label)
    );
    this._values = this.netWorthDistributionData.map((item) =>
      Math.round(item.value)
    );

    this._chartService.createPieChart(
      'netWorthPieChart',
      {
        labels: this._fields,
        datasets: [
          {
            data: this._values,
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
