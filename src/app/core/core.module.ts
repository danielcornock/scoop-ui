import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IconsModule } from '../icons/icons.module';
import { SettingsMenuComponent } from './components/settings-menu/settings-menu.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [SidebarComponent, SettingsMenuComponent],
  imports: [CommonModule, IconsModule, RouterModule],
  exports: [SidebarComponent, SettingsMenuComponent]
})
export class CoreModule {}
