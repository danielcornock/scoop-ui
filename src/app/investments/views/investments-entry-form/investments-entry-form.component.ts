import { Component, OnInit } from '@angular/core';
import { FormContainer, FormFactory } from 'ngx-form-trooper';
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
    private readonly _httpService: HttpService
  ) {}

  ngOnInit(): void {
    this._buildForm();
  }

  public async createLog(): Promise<void> {
    try {
      await this._httpService.post('investments', this.form.value);
    } catch ({ error }) {
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
        name: 'totalInvested',
        type: 'number',
        label: 'Total money added to investments',
        validators: {
          required: true
        }
      },
      {
        name: 'totalValue',
        type: 'number',
        label: 'Current overall value of your investments',
        validators: {
          required: true
        }
      }
    ]);
  }
}
