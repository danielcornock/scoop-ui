import { Component, OnInit } from '@angular/core';
import { cloneDeep, isEqual } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

import { ISettingsMeta } from '../../interfaces/settings-meta.interface';
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
  public meta: ISettingsMeta;

  constructor(
    private readonly _settingsService: SettingsService,
    private readonly _popupService: PopupService,
    private readonly _spinnerService: NgxSpinnerService
  ) {}

  async ngOnInit(): Promise<void> {
    this._spinnerService.show();
    const { data, meta } = await this._settingsService.getSettings();
    this.settings = data;
    this.meta = meta;
    this._spinnerService.hide();

    this.originalSettings = cloneDeep(this.settings);
  }

  public hasChanged(): boolean {
    return !isEqual(this.settings, this.originalSettings);
  }

  public async saveChanges(): Promise<void> {
    try {
      this._spinnerService.show();
      const { data, meta } = await this._settingsService.updateSettings(
        this.settings
      );
      this.settings = data;
      this.meta = meta;
      this.originalSettings = cloneDeep(this.settings);
    } catch ({ error }) {
      this._popupService.showApiError(error);
    } finally {
      this._spinnerService.hide();
    }
  }
}
