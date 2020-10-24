import { Injectable } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartData } from 'chart.js';
import { fill, range } from 'lodash';
import { ILineChartConfig } from './interfaces/line-chart-config.interface';
import { IPiechartConfig } from './interfaces/pie-chart-config.interface';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor() {}

  public createChart(
    chartName: string,
    config: Chart.ChartConfiguration
  ): Chart {
    return new Chart(chartName, config);
  }

  public createBarChart(
    chartName: string,
    data: ChartData,
    config?: ILineChartConfig
  ): Chart {
    this._repeatColors(data.datasets[0]);

    return this.createChart(chartName, {
      type: 'bar',
      data,
      options: this._getLineChartOptions(config)
    });
  }

  public createLineChart(
    chartName: string,
    data: ChartData,
    lineChartConfig?: ILineChartConfig
  ): Chart {
    return this.createChart(chartName, {
      type: 'line',
      data,
      options: this._getLineChartOptions(lineChartConfig)
    });
  }

  public createPieChart(
    chartName: string,
    data: ChartData,
    pieChartConfig: IPiechartConfig
  ): Chart {
    this._repeatColors(data.datasets[0]);

    return this.createChart(chartName, {
      type: 'pie',
      data,
      options: {
        legend: {
          position: pieChartConfig.legendPosition
        }
      }
    });
  }

  private _repeatColors(dataset: Chart.ChartDataSets): void {
    /* To get the correct amount of colors - it cannot be dynamically
    set so it must be repeated */

    const colors = dataset.backgroundColor as string[];
    const dataLength = dataset.data.length;

    let colorArr = [...colors];

    const iterable = range(Math.ceil(dataLength / colors.length) - 1);
    iterable.forEach(() => {
      colorArr = [...colorArr, ...colors];
    });

    dataset.backgroundColor = colorArr;
  }

  private _getLineChartOptions(
    lineChartConfig?: ILineChartConfig
  ): Chart.ChartOptions {
    return {
      hover: {},
      legend: {
        display: false
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
              stepSize: lineChartConfig?.yAxisStepSize,
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
