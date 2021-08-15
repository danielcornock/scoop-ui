import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { BeforeInstallEvent } from '../../components/download-page/interfaces/before-install-event.interface';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  public canDownload$: Observable<boolean>;
  private canDownloadSubject$ = new BehaviorSubject<boolean>(false);
  private deferredPrompt: BeforeInstallEvent;
  private isInstalled: boolean;

  constructor() {
    this.isInstalled = this.wasLaunchedFromInstalledApp();
    this.watchForInstallations();
    this.canDownload$ = this.canDownloadSubject$.asObservable();
    this.listenToInstallPrompt();
  }

  public promptDownload(): void {
    this.deferredPrompt.prompt();
  }

  private listenToInstallPrompt(): void {
    window.addEventListener('beforeinstallprompt', (e: BeforeInstallEvent) => {
      e.preventDefault();

      if (this.isInstalled) {
        return;
      }

      this.canDownloadSubject$.next(true);
      this.deferredPrompt = e;
    });
  }

  private wasLaunchedFromInstalledApp(): boolean {
    const isStandalone = window.matchMedia('(display-mode: standalone)')
      .matches;
    if (document.referrer.startsWith('android-app://')) {
      return true;
    } else if ((navigator as any).standalone || isStandalone) {
      return true;
    }

    return false;
  }

  private watchForInstallations(): void {
    window
      .matchMedia('(display-mode: standalone)')
      .addEventListener('change', (evt) => {
        if (evt.matches) {
          this.isInstalled = true;
          this.canDownloadSubject$.next(false);
        }
      });
  }
}
