import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { forEach } from 'lodash';
import { FormContainer, FormFactory, FormInputType } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { HttpService } from 'src/app/core/services/http/http.service';
import { SettingsService } from 'src/app/settings/services/settings/settings.service';
import { BaseEntryForm } from 'src/app/shared/abstracts/base-entry-form/base-entry-form.abstract';
import { DateService } from 'src/app/shared/services/current-date/date.service';

import { ISalarySuggestion } from '../../interfaces/salary-suggestion.interface';

@Component({
  selector: 'app-salary-entry-form',
  templateUrl: './salary-entry-form.component.html',
  styleUrls: ['./salary-entry-form.component.scss']
})
export class SalaryEntryFormComponent extends BaseEntryForm implements OnInit {
  public salaryDeductions: ISalarySuggestion;
  public netSalary: Observable<number>;
  private _defaultSalary: number;

  constructor(
    private readonly _formFactory: FormFactory,
    private readonly _currentDateService: DateService,
    private readonly _settingsService: SettingsService,
    httpService: HttpService,
    router: Router,
    spinnerService: NgxSpinnerService
  ) {
    super(spinnerService, httpService, router, 'salary');
  }

  async ngOnInit(): Promise<void> {
    const settings = await this._settingsService.getSettings();
    this._defaultSalary = settings.data.salaryYearlySalary;
    super.onInit();
  }

  public async submitForm(): Promise<void> {
    if (!this.salaryDeductions) {
      this.sendGrossSalary();
    } else {
      super.submitForm();
    }
  }

  public async sendGrossSalary(): Promise<void> {
    if (this.form.isInvalid) {
      this.form.formGroup.markAllAsTouched();
      return;
    }
    const { data } = await this._httpService.post('salary/gross', {
      date: this.form.value.date,
      grossSalary: this.form.value.grossSalary
    });

    this.salaryDeductions = data;
    this._assignNewValuesToForm();
    this._watchFormToCalculateNetSalary();
  }

  protected _createForm(): FormContainer {
    return this._formFactory.createForm([
      {
        name: 'date',
        label: 'Month',
        type: FormInputType.MONTH,
        defaultValue: this._currentDateService.getCurrentMonthAndYearForForm(),
        validators: {
          required: true
        }
      },
      {
        name: 'grossSalary',
        label: 'Gross salary this month',
        type: FormInputType.NUMBER,
        defaultValue: this._defaultSalary,
        validators: {
          required: true
        }
      },
      {
        name: 'incomeTax',
        label: 'Income tax',
        type: FormInputType.NUMBER
      },
      {
        name: 'nationalInsurance',
        label: 'National insurance',
        type: FormInputType.NUMBER
      },
      {
        name: 'studentLoanPayments',
        label: 'Student loans',
        type: FormInputType.NUMBER
      },
      {
        name: 'pensionContributions',
        label: 'Pension contribution',
        type: FormInputType.NUMBER
      },
      {
        name: 'otherDeductions',
        label: 'Other contributions',
        type: FormInputType.NUMBER
      }
    ]);
  }

  private _assignNewValuesToForm(): void {
    const controls = this.form.formGroup.controls;

    forEach(controls, (control: FormControl, key: string) => {
      control.setValue(this.salaryDeductions[key] || control.value || 0);
    });
  }

  private _watchFormToCalculateNetSalary(): void {
    this.netSalary = this.form.formGroup.valueChanges.pipe(
      startWith(this.form.formGroup.value),
      switchMap((value: any) => {
        console.log(value);

        const netSalary =
          parseFloat(value.grossSalary) -
          parseFloat(value.incomeTax) -
          parseFloat(value.nationalInsurance) -
          parseFloat(value.studentLoanPayments) -
          parseFloat(value.pensionContributions);

        return of(netSalary);
      })
    );
  }
}
