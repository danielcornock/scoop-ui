import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { BaseUpdateFormComponent } from 'src/app/shared/abstracts/base-update-form/base-update-form.abstract';

import { IMonthlyDistributionLog } from '../../interfaces/monthly-distribution-log.interface';
import { IMonthlyDistributionMeta } from '../../interfaces/monthly-distribution-meta.interface';

@Component({
  selector: 'app-monthly-distribution-update-form',
  templateUrl:
    '../monthly-distribution-entry-form/monthly-distribution-entry-form.component.html',
  styleUrls: [
    '../monthly-distribution-entry-form/monthly-distribution-entry-form.component.scss'
  ]
})
export class MonthlyDistributionUpdateFormComponent
  extends BaseUpdateFormComponent<
    IMonthlyDistributionLog,
    IMonthlyDistributionMeta
  >
  implements OnInit {
  public form: FormContainer;
  public remainingBalance: Observable<number>;

  private _incomingFields: Array<string>;
  private _outgoingFields: Array<string>;

  constructor(
    formFactory: FormFactory,
    httpService: HttpService,
    router: Router,
    spinnerService: NgxSpinnerService,
    activatedRoute: ActivatedRoute,
    headerActionService: HeaderActionService,
    private readonly _settingsService: SettingsService
  ) {
    super(
      formFactory,
      httpService,
      router,
      spinnerService,
      activatedRoute,
      headerActionService,
      'monthly-distribution'
    );
  }

  public async ngOnInit(): Promise<void> {
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
        defaultValue: this._resourceDate,
        disabled: true,
        validators: {
          required: true
        }
      },
      {
        name: 'income',
        label: 'Income',
        fields: this._mapCustomFields(this._incomingFields, 'income')
      },
      {
        name: 'outgoing',
        label: 'Outgoings',
        fields: this._mapCustomFields(this._outgoingFields, 'outgoing')
      }
    ];

    return this._formFactory.createForm(formConfig);
  }

  private _watchFormToCalculateRemaining(): void {
    this.remainingBalance = this.form.formGroup.valueChanges.pipe(
      startWith(this.form.value),
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
    fields: Array<string>,
    type: string
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
        tooltip,
        defaultValue: this._data[type][field]
      };
    });
  }
}
