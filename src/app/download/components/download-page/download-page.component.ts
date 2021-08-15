import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PwaService } from '../../../core/services/pwa/pwa.service';

@Component({
  selector: 'app-download-page',
  templateUrl: './download-page.component.html',
  styleUrls: ['./download-page.component.scss']
})
export class DownloadPageComponent implements OnInit {
  public canDownload$: Observable<boolean>;

  constructor(private pwaService: PwaService) {}

  ngOnInit(): void {
    this.canDownload$ = this.pwaService.canDownload$;
  }

  public downloadApp(): void {
    this.pwaService.promptDownload();
  }
}
