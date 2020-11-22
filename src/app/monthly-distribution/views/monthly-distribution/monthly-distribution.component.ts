import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/core/services/http/http.service';
import { ExperimentalService } from 'src/app/shared/services/experimental/experimental.service';

import { IMonthlyDistributionLog } from '../../interfaces/monthly-distribution-log.interface';

@Component({
  selector: 'app-monthly-distribution',
  templateUrl: './monthly-distribution.component.html',
  styleUrls: ['./monthly-distribution.component.scss']
})
export class MonthlyDistributionComponent implements OnInit {
  public monthlyDistributionItems: Array<IMonthlyDistributionLog>;
  public monthlyDistributionMeta: any;
  public isExperimental: boolean;

  constructor(
    private readonly _httpService: HttpService,
    private readonly _spinnerService: NgxSpinnerService,
    private readonly _experimentalService: ExperimentalService
  ) {}

  async ngOnInit(): Promise<void> {
    this.isExperimental = this._experimentalService.isExperimental();
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
