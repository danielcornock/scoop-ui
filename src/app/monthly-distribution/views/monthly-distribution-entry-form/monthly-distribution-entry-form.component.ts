import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { reduce, startCase } from 'lodash';
import {
  FormContainer,
  FormFactory,
  FormInputType,
  IFormFactoryConfig,
  IFormInputFactoryFieldConfig
} from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { HeaderActionService } from 'src/app/core/services/header-action/header-action.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { SettingsService } from 'src/app/settings/services/settings/settings.service';
import { BaseEntryFormComponent } from 'src/app/shared/abstracts/base-entry-form/base-entry-form.abstract';
import { DateService } from 'src/app/shared/services/current-date/date.service';

@Component({
  selector: 'app-monthly-distribution-entry-form',
  templateUrl: './monthly-distribution-entry-form.component.html',
  styleUrls: ['./monthly-distribution-entry-form.component.scss']
})
export class MonthlyDistributionEntryFormComponent
  extends BaseEntryFormComponent
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
    spinnerService: NgxSpinnerService,
    headerActionService: HeaderActionService
  ) {
    super(
      spinnerService,
      httpService,
      router,
      headerActionService,
      'monthly-distribution'
    );
  }

  async ngOnInit(): Promise<void> {
    await this._getFields();
    await super.ngOnInit();
    this._watchFormToCalculateRemaining();
  }

  protected _createForm(): FormContainer {
    const formConfig: IFormFactoryConfig = [
      {
        name: 'date',
        label: 'Date',
        type: FormInputType.MONTH,
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
      /* This is not very good - needs fixing */
      let tooltip, label;
      if (field === 'balance carried') {
        tooltip =
          'This field is how much balance you have carried over from last month in to the current month, to help work out your total monthly spending.';
        label = 'Balance carried from last month';
      }

      return {
        name: field,
        label: label || startCase(field),
        type: FormInputType.NUMBER,
        tooltip
      };
    });
  }
}
