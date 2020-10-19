import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';

import { ISettings } from '../../interfaces/settings.interface';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private _settings: ISettings;

  constructor(private readonly _httpService: HttpService) {}

  public async getSettings(): Promise<ISettings> {
    if (this._settings) {
      return this._settings;
    } else {
      const { data } = await this._httpService.get('settings');
      this._settings = data;

      return data;
    }
  }

  public async updateSettings(newData: ISettings): Promise<ISettings> {
    const { data } = await this._httpService.put('settings', newData);

    this._settings = data;

    return data;
  }
}
