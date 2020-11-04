import { Component, OnInit } from '@angular/core';
import { FormContainer, FormFactory } from 'ngx-form-trooper';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExperimentalService } from 'src/app/shared/services/experimental/experimental.service';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

import { IUserSettings } from '../../interfaces/user-settings.interface';
import { SettingsService } from '../../services/settings/settings.service';

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
    private readonly _settingsService: SettingsService,
    private readonly _popupService: PopupService,
    private readonly _experimentalService: ExperimentalService
  ) {}

  async ngOnInit(): Promise<void> {
    this.isExperimental = this._experimentalService.isExperimental();
    await this._createSettingsForm();
  }

  public async saveChanges(): Promise<void> {
    try {
      this._spinnerService.show();
      this.userSettings = await this._settingsService.updateUserSettings(
        this.settingsForm.value
      );
      this._popupService.showSuccess(
        'User settings have been saved successfully.',
        'Success!'
      );
      this.displaySaveButton = false;
    } catch ({ error }) {
      this._popupService.showApiError(error);
    } finally {
      this._spinnerService.hide();
    }
  }

  private async _createSettingsForm(): Promise<void> {
    this.userSettings = await this._settingsService.getUserSettings();

    this.settingsForm = this._formFactory.createForm([
      {
        name: 'enableInvestments',
        label: 'Investments',
        type: 'checkbox',
        defaultValue: this.userSettings.enableInvestments
      },
      {
        name: 'enableNetWorth',
        label: 'Net Worth',
        type: 'checkbox',
        defaultValue: this.userSettings.enableNetWorth
      },
      {
        name: 'enableMonthlyDistribution',
        label: 'Monthly Distribution',
        type: 'checkbox',
        defaultValue: this.userSettings.enableMonthlyDistribution
      },
      {
        name: 'enableEmailNotifications',
        label: 'Enable email notifications',
        type: 'checkbox',
        defaultValue: this.userSettings.enableEmailNotifications
      },
      {
        name: 'reminderDate',
        label: 'Day of the month to update your logs',
        type: 'text',
        defaultValue: this.userSettings.reminderDate
      },
      {
        name: 'preferredCurrency',
        label: 'Preferred currency (symbol)',
        placeholder: 'e.g. £ or $',
        type: 'text',
        defaultValue: this.userSettings.preferredCurrency
      }
    ]);

    this.settingsForm.formGroup.valueChanges.subscribe(
      () => (this.displaySaveButton = true)
    );
  }
}
