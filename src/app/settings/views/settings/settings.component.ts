import { Component, OnInit } from '@angular/core';
import { cloneDeep, isEqual } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { CacheService } from 'src/app/shared/services/cache-service/cache.service';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

import { ISettingsMeta } from '../../interfaces/settings-meta.interface';
import { ISettings } from '../../interfaces/settings.interface';
import { IUserSettings } from '../../interfaces/user-settings.interface';
import { SettingsService } from '../../services/settings/settings.service';
import { UserSettingsService } from '../../services/user-settings/user-settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public settings: ISettings;
  public originalSettings: ISettings;
  public meta: ISettingsMeta;
  public userSettings: IUserSettings;

  constructor(
    private readonly _settingsService: SettingsService,
    private readonly _popupService: PopupService,
    private readonly _spinnerService: NgxSpinnerService,
    private readonly _userSettingsService: UserSettingsService,
    private readonly _cacheService: CacheService
  ) {}

  async ngOnInit(): Promise<void> {
    this._spinnerService.show();

    const [{ data, meta }, userSettings] = await Promise.all([
      this._settingsService.getSettings(),
      this._userSettingsService.getUserSettings()
    ]);
    this.userSettings = userSettings;
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
      this._cacheService.clearAllFeatureCaches();
      this._popupService.showSuccess(
        'Some changes may only take effect after a page refresh',
        'Settings successfully updated'
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
