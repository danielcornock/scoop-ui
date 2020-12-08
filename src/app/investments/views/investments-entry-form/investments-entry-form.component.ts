import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormContainer, FormFactory, FormInputType } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { HeaderActionService } from 'src/app/core/services/header-action/header-action.service';
import { BaseEntryFormComponent } from 'src/app/shared/abstracts/base-entry-form/base-entry-form.abstract';
import { DateService } from 'src/app/shared/services/current-date/date.service';

import { IInvestmentModelResponse } from '../../interfaces/investment-log.interface';
import { InvestmentsStoreService } from '../../services/investments-store/investments-store.service';

@Component({
  selector: 'app-investments-entry-form',
  templateUrl: './investments-entry-form.component.html',
  styleUrls: ['./investments-entry-form.component.scss']
})
export class InvestmentsEntryFormComponent
  extends BaseEntryFormComponent<IInvestmentModelResponse>
  implements OnInit {
  constructor(
    private readonly _formFactory: FormFactory,
    private readonly _currentDateService: DateService,
    storeService: InvestmentsStoreService,
    router: Router,
    spinnerService: NgxSpinnerService,
    headerActionService: HeaderActionService
  ) {
    super(
      spinnerService,
      storeService,
      router,
      headerActionService,
      'investments'
    );
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  protected _createForm(): FormContainer {
    const currentDate: string = this._currentDateService.getCurrentMonthAndYearForForm();

    return this._formFactory.createForm([
      {
        name: 'date',
        type: FormInputType.MONTH,
        label: 'Month',
        defaultValue: currentDate,
        validators: {
          required: true
        }
      },
      {
        name: 'addedSinceLast',
        type: FormInputType.NUMBER,
        label: 'Money added to investments this month',
        validators: {
          required: true
        }
      },
      {
        name: 'totalValue',
        type: FormInputType.NUMBER,
        label: 'Current value of your investments',
        validators: {
          required: true
        }
      }
    ]);
  }
}
