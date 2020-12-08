import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';

import { IUserSettings } from '../../interfaces/user-settings.interface';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {
  private _userSettings: IUserSettings;

  constructor(private readonly _httpService: HttpService) {}

  public async getUserSettings(): Promise<IUserSettings> {
    if (this._userSettings) {
      return this._userSettings;
    } else {
      const { data } = await this._httpService.get('user-settings');

      this._userSettings = data;

      return this._userSettings;
    }
  }

  public clearCache(): void {
    this._userSettings = null;
  }

  public async updateUserSettings(
    newData: IUserSettings
  ): Promise<IUserSettings> {
    const { data } = await this._httpService.put('user-settings', newData);

    this._userSettings = data;

    return this._userSettings;
  }
}
