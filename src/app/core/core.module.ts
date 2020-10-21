import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { UserSettingsMenuComponent } from './components/settings-menu/user-settings-menu.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PageNotFoundComponent } from './components/views/page-not-found/page-not-found.component';
import { httpProviders } from './providers/http.providers';

@NgModule({
  declarations: [
    SidebarComponent,
    UserSettingsMenuComponent,
    PageNotFoundComponent,
    HeaderComponent
  ],
  imports: [CommonModule, SharedModule, RouterModule, HttpClientModule],
  providers: [...httpProviders],
  exports: [SidebarComponent, UserSettingsMenuComponent, HeaderComponent]
})
export class CoreModule {}
