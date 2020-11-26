import { Component, OnInit } from '@angular/core';
import { FormContainer, FormFactory, FormInputType } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

import { IUserSettings } from '../../interfaces/user-settings.interface';
import { UserSettingsService } from '../../services/user-settings/user-settings.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  public userSettings: IUserSettings;
  public settingsForm: FormContainer;
  public isExperimental: boolean;
  public displaySaveButton: boolean;

  constructor(
    private readonly _formFactory: FormFactory,
    private readonly _spinnerService: NgxSpinnerService,
    private readonly _userSettingsService: UserSettingsService,
    private readonly _popupService: PopupService
  ) {}

  async ngOnInit(): Promise<void> {
    await this._createSettingsForm();
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
      this.displaySaveButton = false;
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

    this.settingsForm.formGroup.valueChanges.subscribe(
      () => (this.displaySaveButton = true)
    );
  }
}
