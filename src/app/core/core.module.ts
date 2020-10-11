import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconsModule } from '../icons/icons.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, IconsModule],
  exports: [SidebarComponent]
})
export class CoreModule {}
