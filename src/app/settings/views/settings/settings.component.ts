import { Component, OnInit } from '@angular/core';
import { cloneDeep, isEqual } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

import { ISettings } from '../../interfaces/settings.interface';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public settings: ISettings;
  public originalSettings: ISettings;

  constructor(
    private readonly _settingsService: SettingsService,
    private readonly _popupService: PopupService,
    private readonly _spinnerService: NgxSpinnerService
  ) {}

  async ngOnInit(): Promise<void> {
    this._spinnerService.show();
    this.settings = await this._settingsService.getSettings();
    this._spinnerService.hide();

    this.originalSettings = cloneDeep(this.settings);
  }

  public hasChanged(): boolean {
    return !isEqual(this.settings, this.originalSettings);
  }

  public async saveChanges(): Promise<void> {
    try {
      this.settings = await this._settingsService.updateSettings(this.settings);
      this.originalSettings = cloneDeep(this.settings);
    } catch ({ error }) {
      this._popupService.showApiError(error);
    }
  }
}
