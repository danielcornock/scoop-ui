import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DownloadPageComponent } from './components/download-page/download-page.component';
import { downloadRoutes } from './download.routes';

@NgModule({
  declarations: [DownloadPageComponent],
  imports: [CommonModule, RouterModule.forChild(downloadRoutes)]
})
export class DownloadModule {}
