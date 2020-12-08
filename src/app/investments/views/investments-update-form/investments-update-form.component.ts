import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormContainer, FormFactory, FormInputType } from 'ngx-form-trooper';
import { HeaderActionService } from 'src/app/core/services/header-action/header-action.service';
import { BaseUpdateFormComponent } from 'src/app/shared/abstracts/base-update-form/base-update-form.abstract';

import { IInvestmentLog, IInvestmentModelResponse } from '../../interfaces/investment-log.interface';
import { InvestmentsStoreService } from '../../services/investments-store/investments-store.service';

@Component({
  selector: 'app-investments-update-form',
  templateUrl:
    '../investments-entry-form/investments-entry-form.component.html',
  styleUrls: ['../investments-entry-form/investments-entry-form.component.scss']
})
export class InvestmentsUpdateFormComponent
  extends BaseUpdateFormComponent<
    IInvestmentModelResponse,
    IInvestmentLog,
    undefined
  >
  implements OnInit {
  constructor(
    formFactory: FormFactory,
    store: InvestmentsStoreService,
    router: Router,
    activatedRoute: ActivatedRoute,
    headerActionService: HeaderActionService
  ) {
    super(
      formFactory,
      store,
      router,
      activatedRoute,
      headerActionService,
      'investments'
    );
  }

  async ngOnInit(): Promise<void> {
    await super.ngOnInit();
  }

  protected _createForm({ data }): FormContainer {
    return this._formFactory.createForm([
      {
        name: 'date',
        type: FormInputType.MONTH,
        label: 'Month',
        defaultValue: data.date,
        disabled: true,
        validators: {
          required: true
        }
      },
      {
        name: 'addedSinceLast',
        type: FormInputType.NUMBER,
        label: 'Money added to investments this month',
        defaultValue: data.addedSinceLast,
        validators: {
          required: true
        }
      },
      {
        name: 'totalValue',
        type: FormInputType.NUMBER,
        label: 'Current value of your investments',
        defaultValue: data.totalValue,
        validators: {
          required: true
        }
      }
    ]);
  }
}
