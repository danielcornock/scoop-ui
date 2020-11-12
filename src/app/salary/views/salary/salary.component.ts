import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/core/services/http/http.service';

import { ISalaryMeta } from '../../interfaces/salary-meta.interface';
import { ISalary } from '../../interfaces/salary.interface';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss']
})
export class SalaryComponent implements OnInit {
  public salaryItems: Array<ISalary>;
  public salaryMeta: ISalaryMeta;

  constructor(
    private readonly _httpService: HttpService,
    private readonly _spinnerService: NgxSpinnerService
  ) {}

  async ngOnInit(): Promise<void> {
    this._spinnerService.show();
    await this._getSalaryLogs();
    this._spinnerService.hide();
  }

  private async _getSalaryLogs(): Promise<void> {
    const { data, meta } = await this._httpService.get('salary');
    this.salaryItems = data;
    this.salaryMeta = meta;
  }
}
