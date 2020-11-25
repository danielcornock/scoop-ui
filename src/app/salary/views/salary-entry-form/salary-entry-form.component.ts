import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { forEach } from 'lodash';
import { FormContainer, FormFactory, FormInputType } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { HeaderActionService } from 'src/app/core/services/header-action/header-action.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { SettingsService } from 'src/app/settings/services/settings/settings.service';
import { BaseEntryFormComponent } from 'src/app/shared/abstracts/base-entry-form/base-entry-form.abstract';
import { DateService } from 'src/app/shared/services/current-date/date.service';

import { ISalarySuggestion } from '../../interfaces/salary-suggestion.interface';

@Component({
  selector: 'app-salary-entry-form',
  templateUrl: './salary-entry-form.component.html',
  styleUrls: ['./salary-entry-form.component.scss']
})
export class SalaryEntryFormComponent extends BaseEntryFormComponent
  implements OnInit {
  public salaryDeductions: ISalarySuggestion;
  public netSalary: Observable<number>;
  private _defaultSalary: number;

  constructor(
    private readonly _formFactory: FormFactory,
    private readonly _currentDateService: DateService,
    private readonly _settingsService: SettingsService,
    httpService: HttpService,
    router: Router,
    spinnerService: NgxSpinnerService,
    headerActionService: HeaderActionService
  ) {
    super(spinnerService, httpService, router, headerActionService, 'salary');
  }

  async ngOnInit(): Promise<void> {
    const settings = await this._settingsService.getSettings();
    this._defaultSalary = settings.data.salaryYearlySalary;
    super.ngOnInit();
  }

  public async submitForm(): Promise<void> {
    if (!this.salaryDeductions) {
      this.sendGrossSalary();
    } else {
      super.submitForm();
    }
  }

  public async logSameAsLastMonth(): Promise<void> {
    try {
      this._spinnerService.show();
      await this._httpService.post('salary/duplicate', {
        date: this.form.value.date
      });
      this._router.navigateByUrl('salary');
    } catch ({ error }) {
      this.errors = error;
    } finally {
      this._spinnerService.hide();
    }
  }

  public async sendGrossSalary(): Promise<void> {
    if (
      this.form.getField('date').isInvalid ||
      this.form.getField('grossSalary').isInvalid
    ) {
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
        defaultValue: this._getFormattedDefaultSalary(),
        validators: {
          required: true
        }
      },
      {
        name: 'incomeTax',
        label: 'Income tax',
        type: FormInputType.NUMBER,
        validators: {
          required: true
        }
      },
      {
        name: 'nationalInsurance',
        label: 'National insurance',
        type: FormInputType.NUMBER,
        validators: {
          required: true
        }
      },
      {
        name: 'studentFinance',
        label: 'Student loans',
        type: FormInputType.NUMBER,
        validators: {
          required: true
        }
      },
      {
        name: 'pensionContributions',
        label: 'Pension contribution',
        type: FormInputType.NUMBER,
        validators: {
          required: true
        }
      },
      {
        name: 'otherDeductions',
        label: 'Other contributions',
        type: FormInputType.NUMBER,
        validators: {
          required: true
        }
      }
    ]);
  }

  private _getFormattedDefaultSalary(): string {
    return (
      this._defaultSalary &&
      (Math.round((this._defaultSalary / 12) * 100) / 100).toString()
    );
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
        const netSalary =
          parseFloat(value.grossSalary) -
          parseFloat(value.incomeTax) -
          parseFloat(value.nationalInsurance) -
          parseFloat(value.studentFinance) -
          parseFloat(value.pensionContributions) -
          parseFloat(value.otherDeductions);

        return of(netSalary);
      })
    );
  }
}
