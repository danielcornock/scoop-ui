import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/core/services/http/http.service';

import { IMonthlyDistributionLog } from '../../interfaces/monthly-distribution-log.interface';

@Component({
  selector: 'app-monthly-distribution',
  templateUrl: './monthly-distribution.component.html',
  styleUrls: ['./monthly-distribution.component.scss']
})
export class MonthlyDistributionComponent implements OnInit {
  public monthlyDistributionItems: Array<IMonthlyDistributionLog>;
  public monthlyDistributionMeta: any;

  constructor(
    private readonly _httpService: HttpService,
    private readonly _spinnerService: NgxSpinnerService
  ) {}

  async ngOnInit(): Promise<void> {
    this._spinnerService.show();
    await this._fetchLogs();
    this._spinnerService.hide();
  }

  private async _fetchLogs(): Promise<void> {
    const { data, meta } = await this._httpService.get('monthly-distribution');

    this.monthlyDistributionItems = data;
    this.monthlyDistributionMeta = meta;
  }
}
