import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IHttpResponse } from 'src/app/core/services/http/interfaces/http-response.interface';

import { ISettingsMeta } from '../../interfaces/settings-meta.interface';
import { ISettings } from '../../interfaces/settings.interface';
import { IUserSettings } from '../../interfaces/user-settings.interface';

export type SettingsHttpResponse = IHttpResponse<ISettings, ISettingsMeta>;
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private _settings: SettingsHttpResponse;
  private _userSettings: IUserSettings;

  constructor(private readonly _httpService: HttpService) {}

  public async getSettings(): Promise<SettingsHttpResponse> {
    if (this._settings) {
      return this._settings;
    } else {
      this._settings = await this._httpService.get('settings');

      return this._settings;
    }
  }

  public async getUserSettings(): Promise<IUserSettings> {
    if (this._userSettings) {
      return this._userSettings;
    } else {
      const { data } = await this._httpService.get('user-settings');

      this._userSettings = data;

      return this._userSettings;
    }
  }

  public async updateSettings(
    newData: ISettings
  ): Promise<SettingsHttpResponse> {
    this._settings = await this._httpService.put('settings', newData);

    return this._settings;
  }

  public async updateUserSettings(
    newData: IUserSettings
  ): Promise<IUserSettings> {
    const { data } = await this._httpService.put('user-settings', newData);

    this._userSettings = data;

    return this._userSettings;
  }
}
