import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxFormTrooperModule } from 'ngx-form-trooper';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { NetWorthConfigComponent } from './components/net-worth-config/net-worth-config.component';
import { NetWorthSummaryConfigComponent } from './components/net-worth-summary-config/net-worth-summary-config.component';
import {
  NetWorthSummaryFormModalComponent,
} from './components/net-worth-summary-form-modal/net-worth-summary-form-modal.component';
import { SettingsComponent } from './views/settings/settings.component';
import { DashboardSummaryConfigItemComponent } from './components/dashboard-summary-config-item/dashboard-summary-config-item.component';

@NgModule({
  declarations: [
    SettingsComponent,
    NetWorthConfigComponent,
    NetWorthSummaryConfigComponent,
    NetWorthSummaryFormModalComponent,
    DashboardSummaryConfigItemComponent
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    DragDropModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    NgxFormTrooperModule,
    MatDialogModule
  ]
})
export class SettingsModule {}
