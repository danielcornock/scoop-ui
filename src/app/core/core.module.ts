import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IconsModule } from '../icons/icons.module';
import { SettingsMenuComponent } from './components/settings-menu/settings-menu.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { httpProviders } from './providers/http.providers';

@NgModule({
  declarations: [SidebarComponent, SettingsMenuComponent],
  imports: [CommonModule, IconsModule, RouterModule, HttpClientModule],
  providers: [...httpProviders],
  exports: [SidebarComponent, SettingsMenuComponent]
})
export class CoreModule {}
