import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IContextMenuItem } from 'src/app/shared/components/context-menu/interfaces/context-menu-item.interface';
import { ChartService } from 'src/app/shared/services/chart/chart.service';
import { ModalService } from 'src/app/shared/services/modal/modal.service';

import { IInvestmentLog } from '../../interfaces/investment-log.interface';
import { InvestmentsProjectionModalComponent } from '../investments-projection-modal/investments-projection-modal.component';

@Component({
  selector: 'app-trends-card',
  templateUrl: './trends-card.component.html',
  styleUrls: ['./trends-card.component.scss']
})
export class TrendsCardComponent implements OnChanges, OnInit {
  @Input()
  public trendsCardData: Array<IInvestmentLog>;

  public cardActions: Array<IContextMenuItem>;

  private _processedTrendsData: Array<{
    date: string;
    invested: number;
    value: number;
  }>;

  constructor(
    private readonly _chartService: ChartService,
    private readonly _modalService: ModalService
  ) {}

  ngOnChanges(): void {
    this._processTrendsData();
    this._createGraphConfig();
  }

  ngOnInit(): void {
    this.cardActions = [
      {
        label: 'Get projection',
        icon: 'trending-up',
        action: this._openProjectionsModal.bind(this)
      }
    ];
  }

  private _openProjectionsModal(): void {
    this._modalService.open(InvestmentsProjectionModalComponent, {
      data: {}
    });
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
            borderColor: 'rgba(28,128,220, 0.6)',
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderDash: [5]
          },
          {
            label: 'Investment Value',
            data: this._getArrayOfFields('value') as number[],
            borderColor: 'rgba(28,128,220, 1)',
            backgroundColor: 'rgba(28,128,220, 0.08)',
            borderWidth: 2
          }
        ]
      },
      { yAxisStepSize: undefined }
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
