import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { capitalize } from 'lodash';
import { FormContainer, FormFactory, IFormFactoryConfig } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IHttpError } from 'src/app/core/services/http/interfaces/http-error.interface';
import { SettingsService } from 'src/app/settings/services/settings/settings.service';
import { DateService } from 'src/app/shared/services/current-date/date.service';

@Component({
  selector: 'app-net-worth-entry-form',
  templateUrl: './net-worth-entry-form.component.html',
  styleUrls: ['./net-worth-entry-form.component.scss']
})
export class NetWorthEntryFormComponent implements OnInit {
  public form: FormContainer;
  public columns: Array<string>;
  public formFields: Array<FormControl>;
  public errors: IHttpError;

  constructor(
    private readonly _formFactory: FormFactory,
    private readonly _currentDateService: DateService,
    private readonly _httpService: HttpService,
    private readonly _router: Router,
    private readonly _settingsService: SettingsService,
    private readonly _spinnerService: NgxSpinnerService
  ) {}

  async ngOnInit(): Promise<void> {
    this._spinnerService.show();
    const settings = await this._settingsService.getSettings();
    this.columns = settings.data.netWorthFields;
    this._createForm();
    this._spinnerService.hide();
  }

  public async submitForm(): Promise<void> {
    this.errors = null;

    if (this.form.formGroup.invalid) {
      return;
    }

    try {
      this._spinnerService.show();
      await this._httpService.post('net-worth', this.form.value);

      this._router.navigateByUrl('net-worth');
    } catch ({ error }) {
      this._spinnerService.hide();
      this.errors = error;
    }
  }

  private _createForm(): void {
    const currentDate: string = this._currentDateService.getCurrentMonthAndYearForForm();
    const formConfig: IFormFactoryConfig = [
      {
        name: 'date',
        label: 'Month',
        type: 'month',
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
        type: 'number'
      });
    });

    this.form = this._formFactory.createForm(formConfig);
  }
}
