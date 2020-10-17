import { Component, OnInit } from '@angular/core';
import { cloneDeep, isEqual } from 'lodash';
import { HttpService } from 'src/app/core/services/http/http.service';

import { ISettings } from '../../interfaces/settings.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public settings: ISettings;
  public originalSettings: ISettings;

  constructor(private readonly _httpService: HttpService) {}

  async ngOnInit(): Promise<void> {
    const { data } = await this._httpService.get('settings');

    this.settings = data;
    this.originalSettings = cloneDeep(this.settings);
  }

  public hasChanged(): boolean {
    return !isEqual(this.settings, this.originalSettings);
  }

  public async saveChanges(): Promise<void> {
    const { data } = await this._httpService.put('settings', this.settings);

    this.settings = data;
    this.originalSettings = cloneDeep(this.settings);
  }
}
