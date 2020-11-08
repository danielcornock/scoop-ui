import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormContainer, FormFactory } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/core/services/http/http.service';
import { BaseEntryForm } from 'src/app/shared/abstracts/base-entry-form/base-entry-form.abstract';
import { DateService } from 'src/app/shared/services/current-date/date.service';

@Component({
  selector: 'app-investments-entry-form',
  templateUrl: './investments-entry-form.component.html',
  styleUrls: ['./investments-entry-form.component.scss']
})
export class InvestmentsEntryFormComponent extends BaseEntryForm
  implements OnInit {
  constructor(
    private readonly _formFactory: FormFactory,
    private readonly _currentDateService: DateService,
    httpService: HttpService,
    router: Router,
    spinnerService: NgxSpinnerService
  ) {
    super(spinnerService, httpService, router, 'investments');
  }

  ngOnInit(): void {
    super.onInit();
  }

  protected _createForm(): FormContainer {
    const currentDate: string = this._currentDateService.getCurrentMonthAndYearForForm();

    return this._formFactory.createForm([
      {
        name: 'date',
        type: 'month',
        label: 'Month',
        defaultValue: currentDate,
        validators: {
          required: true
        }
      },
      {
        name: 'addedSinceLast',
        type: 'number',
        label: 'Money added to investments this month',
        tooltip: `If this is your first entry, this field should be the total amount you've added to investments`,
        validators: {
          required: true
        }
      },
      {
        name: 'totalValue',
        type: 'number',
        label: 'Current value of your investments',
        validators: {
          required: true
        }
      }
    ]);
  }
}
