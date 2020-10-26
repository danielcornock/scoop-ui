import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { reduce, startCase } from 'lodash';
import { FormContainer, FormFactory, IFormFactoryConfig, IFormInputFactoryFieldConfig } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IHttpError } from 'src/app/core/services/http/interfaces/http-error.interface';
import { SettingsService } from 'src/app/settings/services/settings/settings.service';
import { DateService } from 'src/app/shared/services/current-date/date.service';

@Component({
  selector: 'app-monthly-distribution-entry-form',
  templateUrl: './monthly-distribution-entry-form.component.html',
  styleUrls: ['./monthly-distribution-entry-form.component.scss']
})
export class MonthlyDistributionEntryFormComponent implements OnInit {
  public form: FormContainer;
  public errors: IHttpError;
  public remainingBalance: Observable<string>;

  private _incomingFields: Array<string>;
  private _outgoingFields: Array<string>;

  constructor(
    private readonly _formFactory: FormFactory,
    private readonly _settingsService: SettingsService,
    private readonly _dateService: DateService,
    private readonly _httpService: HttpService,
    private readonly _router: Router,
    private readonly _spinnerService: NgxSpinnerService
  ) {}

  async ngOnInit(): Promise<void> {
    this._spinnerService.show();
    await this._getFields();
    this._createForm();
    this._watchFormToCalculateRemaining();
    this._spinnerService.hide();
  }

  public async submitForm(): Promise<void> {
    if (this.form.isInvalid) {
      return;
    }

    try {
      this._spinnerService.show();
      await this._httpService.post('monthly-distribution', this.form.value);
      this._router.navigateByUrl('monthly-distribution');
    } catch ({ error }) {
      this.errors = error;
      this._spinnerService.hide();
    }
  }

  private _watchFormToCalculateRemaining(): void {
    this.remainingBalance = this.form.formGroup.valueChanges.pipe(
      startWith([{}]),
      switchMap((value: any) => {
        const incoming: number = reduce(
          value.income,
          (prev, next) => prev + parseFloat(next || 0),
          0
        );

        const outgoing: number = reduce(
          value.outgoing,
          (prev, next) => prev + parseFloat(next || 0),
          0
        );

        return of(incoming - outgoing);
      })
    );
  }

  private async _getFields(): Promise<void> {
    const {
      monthlyDistributionIncomeFields,
      monthlyDistributionOutgoingFields
    } = await this._settingsService.getSettings();

    this._incomingFields = monthlyDistributionIncomeFields;
    this._outgoingFields = monthlyDistributionOutgoingFields;
  }

  private _createForm(): void {
    const formConfig: IFormFactoryConfig = [
      {
        name: 'date',
        label: 'Date',
        type: 'month',
        defaultValue: this._dateService.getCurrentMonthAndYearForForm()
      },
      {
        name: 'income',
        label: 'Income',
        fields: this._mapCustomFields(this._incomingFields)
      },
      {
        name: 'outgoing',
        label: 'Outgoings',
        fields: this._mapCustomFields(this._outgoingFields)
      }
    ];

    this.form = this._formFactory.createForm(formConfig);
  }

  private _mapCustomFields(
    fields: Array<string>
  ): Array<IFormInputFactoryFieldConfig> {
    return fields.map((field: string) => {
      return {
        name: field,
        label: startCase(field),
        type: 'number'
      };
    });
  }
}
