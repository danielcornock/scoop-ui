import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormContainer, FormFactory, FormInputType } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { HeaderActionService } from 'src/app/core/services/header-action/header-action.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { BaseEntryFormComponent } from 'src/app/shared/abstracts/base-entry-form/base-entry-form.abstract';
import { DateService } from 'src/app/shared/services/current-date/date.service';

@Component({
  selector: 'app-investments-entry-form',
  templateUrl: './investments-entry-form.component.html',
  styleUrls: ['./investments-entry-form.component.scss']
})
export class InvestmentsEntryFormComponent extends BaseEntryFormComponent
  implements OnInit {
  constructor(
    private readonly _formFactory: FormFactory,
    private readonly _currentDateService: DateService,
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
