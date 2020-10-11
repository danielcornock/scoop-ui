import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-trends-card',
  templateUrl: './trends-card.component.html',
  styleUrls: ['./trends-card.component.scss']
})
export class TrendsCardComponent implements OnInit {
  public chart: Chart;

  ngOnInit(): void {
    this.chart = this._createGraphConfig();
  }

  private _createGraphConfig(): Chart {
    return new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['12/04/2020', '12/05/2020', '12/06/2020'],
        datasets: [
          {
            label: 'Total Invested',
            data: [300, 600, 1200],
            borderColor: 'rgba(28,128,220, 1)',
            backgroundColor: 'rgba(28,128,220, 0.08)',
            borderWidth: 2
          },
          {
            label: 'Total Investment',
            data: [306, 634, 1350],
            borderColor: 'rgba(54,87,220, 1)',
            backgroundColor: 'rgba(54,87,220, 0.08)',
            borderWidth: 2
          }
        ]
      },
      options: {
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
                stepSize: 400,
                beginAtZero: false
              }
            }
          ],
          xAxes: [
            {
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
      }
    });
  }
}
