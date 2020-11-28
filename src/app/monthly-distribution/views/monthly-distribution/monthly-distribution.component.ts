import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private readonly _experimentalService: ExperimentalService,
    private readonly _router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.isExperimental = this._experimentalService.isExperimental();
    this._spinnerService.show();
    await this._fetchLogs();
    this._spinnerService.hide();
  }

  public createNew(): void {
    this._router.navigateByUrl('monthly-distribution/create');
  }

  private async _fetchLogs(): Promise<void> {
    const { data, meta } = await this._httpService.get('monthly-distribution');

    this.monthlyDistributionItems = data;
    this.monthlyDistributionMeta = meta;
  }
}
