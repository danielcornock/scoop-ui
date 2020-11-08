import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { reduce, startCase } from 'lodash';
import { FormContainer, FormFactory, IFormFactoryConfig, IFormInputFactoryFieldConfig } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { HttpService } from 'src/app/core/services/http/http.service';
import { SettingsService } from 'src/app/settings/services/settings/settings.service';
import { BaseEntryForm } from 'src/app/shared/abstracts/base-entry-form/base-entry-form.abstract';
import { DateService } from 'src/app/shared/services/current-date/date.service';

@Component({
  selector: 'app-monthly-distribution-entry-form',
  templateUrl: './monthly-distribution-entry-form.component.html',
  styleUrls: ['./monthly-distribution-entry-form.component.scss']
})
export class MonthlyDistributionEntryFormComponent extends BaseEntryForm
  implements OnInit {
  public remainingBalance: Observable<number>;

  private _incomingFields: Array<string>;
  private _outgoingFields: Array<string>;

  constructor(
    private readonly _formFactory: FormFactory,
    private readonly _settingsService: SettingsService,
    private readonly _dateService: DateService,
    httpService: HttpService,
    router: Router,
    spinnerService: NgxSpinnerService
  ) {
    super(spinnerService, httpService, router, 'monthly-distribution');
  }

  async ngOnInit(): Promise<void> {
    await this._getFields();
    this._createForm();
    await super.onInit();
    this._watchFormToCalculateRemaining();
  }

  protected _createForm(): FormContainer {
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

    return this._formFactory.createForm(formConfig);
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
    const { data } = await this._settingsService.getSettings();

    this._incomingFields = data.monthlyDistributionIncomeFields;
    this._outgoingFields = data.monthlyDistributionOutgoingFields;
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
