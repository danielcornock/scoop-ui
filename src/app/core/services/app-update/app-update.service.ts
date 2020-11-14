import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { PopupService } from 'src/app/shared/services/popup/popup.service';

@Injectable({
  providedIn: 'root'
})
export class AppUpdateService {
  constructor(
    private readonly _updates: SwUpdate,
    private readonly _popupSeevice: PopupService
  ) {}

  public listenForUpdates(): void {
    this._updates.available.subscribe(() => {
      this._promptUserForUpdate();
    });
  }

  private _promptUserForUpdate(): void {
    this._popupSeevice.showNotificationWithAction({
      title: 'App needs restarting',
      text: 'Click this notification to receive the latest update',
      onClick: this._activateUpdate.bind(this)
    });
  }

  private async _activateUpdate(): Promise<void> {
    await this._updates.activateUpdate;
    window.location.reload();
  }
}
