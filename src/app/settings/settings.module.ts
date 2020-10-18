import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { NetWorthConfigComponent } from './components/net-worth-config/net-worth-config.component';
import { SettingsComponent } from './views/settings/settings.component';
import { NetWorthSummaryConfigComponent } from './components/net-worth-summary-config/net-worth-summary-config.component';

@NgModule({
  declarations: [SettingsComponent, NetWorthConfigComponent, NetWorthSummaryConfigComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    DragDropModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class SettingsModule {}
