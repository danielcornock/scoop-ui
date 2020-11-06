import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormContainer, FormFactory } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IHttpError } from 'src/app/core/services/http/interfaces/http-error.interface';
import { DateService } from 'src/app/shared/services/current-date/date.service';

@Component({
  selector: 'app-investments-entry-form',
  templateUrl: './investments-entry-form.component.html',
  styleUrls: ['./investments-entry-form.component.scss']
})
export class InvestmentsEntryFormComponent implements OnInit {
  public form: FormContainer;
  public errors: IHttpError;

  constructor(
    private readonly _formFactory: FormFactory,
    private readonly _currentDateService: DateService,
    private readonly _httpService: HttpService,
    private readonly _router: Router,
    private readonly _spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this._buildForm();
  }

  public async createLog(): Promise<void> {
    try {
      this._spinnerService.show();
      await this._httpService.post('investments', this.form.value);
      this._router.navigateByUrl('investments');
    } catch ({ error }) {
      this._spinnerService.hide();
      this.errors = error;
    }
  }

  private _buildForm(): void {
    const currentDate: string = this._currentDateService.getCurrentMonthAndYearForForm();

    this.form = this._formFactory.createForm([
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
