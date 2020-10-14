import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/app/shared/services/chart/chart.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-net-worth-distribution-card',
  templateUrl: './net-worth-distribution-card.component.html',
  styleUrls: ['./net-worth-distribution-card.component.scss']
})
export class NetWorthDistributionCardComponent implements OnInit {
  constructor(private readonly _chartService: ChartService) {}

  ngOnInit(): void {
    this._chartService.createPieChart(
      {
        labels: ['Savings', 'Investments', 'ISA', 'Other'],
        datasets: [
          {
            data: [300, 600, 1200, 1200],
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
