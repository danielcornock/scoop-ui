import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { capitalize } from 'lodash';
import { FormContainer, FormFactory, FormInputType, IFormFactoryConfig } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/core/services/http/http.service';
import { SettingsService } from 'src/app/settings/services/settings/settings.service';
import { BaseEntryForm } from 'src/app/shared/abstracts/base-entry-form/base-entry-form.abstract';
import { DateService } from 'src/app/shared/services/current-date/date.service';

@Component({
  selector: 'app-net-worth-entry-form',
  templateUrl: './net-worth-entry-form.component.html',
  styleUrls: ['./net-worth-entry-form.component.scss']
})
export class NetWorthEntryFormComponent extends BaseEntryForm
  implements OnInit {
  public columns: Array<string>;

  constructor(
    private readonly _formFactory: FormFactory,
    private readonly _currentDateService: DateService,
    private readonly _settingsService: SettingsService,
    httpService: HttpService,
    router: Router,
    spinnerService: NgxSpinnerService
  ) {
    super(spinnerService, httpService, router, 'net-worth');
  }

  async ngOnInit(): Promise<void> {
    const settings = await this._settingsService.getSettings();
    this.columns = settings.data.netWorthFields;
    super.onInit();
  }

  protected _createForm(): FormContainer {
    const currentDate: string = this._currentDateService.getCurrentMonthAndYearForForm();
    const formConfig: IFormFactoryConfig = [
      {
        name: 'date',
        label: 'Month',
        type: FormInputType.MONTH,
        defaultValue: currentDate,
        validators: {
          required: true
        }
      }
    ];

    this.columns.forEach((colName: string) => {
      formConfig.push({
        name: colName,
        label: capitalize(colName),
        type: FormInputType.NUMBER
      });
    });

    return this._formFactory.createForm(formConfig);
  }
}
