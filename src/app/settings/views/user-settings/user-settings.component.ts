import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormContainer, FormFactory, FormInputType } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { FormPage } from 'src/app/core/services/form-dirty-check/form-dirty-check.service';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

import { IUserSettings } from '../../interfaces/user-settings.interface';
import { UserSettingsService } from '../../services/user-settings/user-settings.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit, OnDestroy, FormPage {
  public userSettings: IUserSettings;
  public settingsForm: FormContainer;
  public isExperimental: boolean;
  public dirty$: Observable<boolean>;

  private _destroy$ = new Subject<void>();

  constructor(
    private readonly _formFactory: FormFactory,
    private readonly _spinnerService: NgxSpinnerService,
    private readonly _userSettingsService: UserSettingsService,
    private readonly _popupService: PopupService
  ) {}

  async ngOnInit(): Promise<void> {
    await this._createSettingsForm();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public async saveChanges(): Promise<void> {
    if (this.settingsForm.isInvalid) {
      this.settingsForm.formGroup.markAllAsTouched();
      return;
    }

    try {
      this._spinnerService.show();
      this.userSettings = await this._userSettingsService.updateUserSettings(
        this.settingsForm.value
      );
      this._popupService.showSuccess(
        'Some changes may only take effect after a page refresh',
        'User settings successfully updated'
      );
    } catch ({ error }) {
      this._popupService.showApiError(error);
    } finally {
      this._spinnerService.hide();
    }
  }

  private async _createSettingsForm(): Promise<void> {
    this.userSettings = await this._userSettingsService.getUserSettings();

    this.settingsForm = this._formFactory.createForm([
      {
        name: 'enableInvestments',
        label: 'Investments',
        type: FormInputType.CHECKBOX,
        defaultValue: this.userSettings.enableInvestments
      },
      {
        name: 'enableNetWorth',
        label: 'Net Worth',
        type: FormInputType.CHECKBOX,
        defaultValue: this.userSettings.enableNetWorth
      },
      {
        name: 'enableMonthlyDistribution',
        label: 'Monthly Distribution',
        type: FormInputType.CHECKBOX,
        defaultValue: this.userSettings.enableMonthlyDistribution
      },
      {
        name: 'enableSalary',
        label: 'Salary Tracker',
        type: FormInputType.CHECKBOX,
        defaultValue: this.userSettings.enableSalary
      },
      {
        name: 'enableEmailNewsletters',
        label: 'Enable occasional email newsletters',
        type: FormInputType.CHECKBOX,
        defaultValue: this.userSettings.enableEmailNewsletters
      },
      {
        name: 'enableEmailNotifications',
        label: 'Enable email notifications',
        type: FormInputType.CHECKBOX,
        defaultValue: this.userSettings.enableEmailNotifications
      },
      {
        name: 'reminderDate',
        label: 'Day of the month to update your logs',
        type: FormInputType.NUMBER,
        defaultValue: this.userSettings.reminderDate,
        tooltip: `If your date falls on a day that doesn't exist in the current month, your notification will be sent on the last day of the month instead`,
        validators: {
          min: 1,
          max: 31
        }
      },
      {
        name: 'preferredCurrency',
        label: 'Preferred currency (symbol)',
        placeholder: 'e.g. £ or $',
        type: FormInputType.TEXT,
        defaultValue: this.userSettings.preferredCurrency
      }
    ]);

    this.dirty$ = this.settingsForm.formGroup.valueChanges.pipe(
      startWith({}),
      switchMap(() => of(this.settingsForm.formGroup.dirty))
    );
  }
}
