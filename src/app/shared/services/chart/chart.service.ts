import { Injectable } from '@angular/core';
import { Chart, ChartData } from 'chart.js';
import { ILineChartConfig } from './interfaces/line-chart-config.interface';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor() {}

  public createChart(config: Chart.ChartConfiguration): Chart {
    return new Chart('canvas', config);
  }

  public createLineChart(
    data: ChartData,
    lineChartConfig: ILineChartConfig
  ): Chart {
    return this.createChart({
      type: 'line',
      data,
      options: this._getLineChartOptions(lineChartConfig)
    });
  }

  private _getLineChartOptions(
    lineChartConfig: ILineChartConfig
  ): Chart.ChartOptions {
    return {
      hover: {},
      legend: {
        display: false,
        labels: {
          fontColor: '#a0a0a0'
        }
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false
            },
            ticks: {
              fontFamily: 'Quicksand',
              fontStyle: '500',
              fontColor: '#a0a0a0',
              fontSize: 12,
              stepSize: lineChartConfig.yAxisStepSize,
              beginAtZero: false
            }
          }
        ],
        xAxes: [
          {
            display: false,
            gridLines: {
              display: false
            },
            ticks: {
              fontFamily: 'Quicksand',
              fontStyle: '500',
              fontColor: '#a0a0a0',
              fontSize: 12,
              beginAtZero: false
            }
          }
        ]
      }
    };
  }
}
