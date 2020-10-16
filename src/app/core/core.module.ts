import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { UserSettingsMenuComponent } from './components/settings-menu/user-settings-menu.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { httpProviders } from './providers/http.providers';
import { MatMenuModule } from '@angular/material/menu';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [SidebarComponent, UserSettingsMenuComponent, PageNotFoundComponent],
  imports: [CommonModule, SharedModule, RouterModule, HttpClientModule],
  providers: [...httpProviders],
  exports: [SidebarComponent, UserSettingsMenuComponent]
})
export class CoreModule {}
