import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { NgxFormTrooperModule } from 'ngx-form-trooper';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import {
  DashboardSummaryConfigItemComponent,
} from './components/dashboard-summary-config-item/dashboard-summary-config-item.component';
import { FieldsConfigComponent } from './components/fields-config/fields-config.component';
import {
  MonthlyDistributionFieldsConfigComponent,
} from './components/monthly-distribution-fields-config/monthly-distribution-fields-config.component';
import { NetWorthConfigComponent } from './components/net-worth-config/net-worth-config.component';
import { NetWorthSummaryConfigComponent } from './components/net-worth-summary-config/net-worth-summary-config.component';
import {
  NetWorthSummaryFormModalComponent,
} from './components/net-worth-summary-form-modal/net-worth-summary-form-modal.component';
import { SettingsComponent } from './views/settings/settings.component';
import { UserSettingsComponent } from './views/user-settings/user-settings.component';
import { ChangePasswordFormComponent } from './components/change-password-form/change-password-form.component';

@NgModule({
  declarations: [
    SettingsComponent,
    NetWorthConfigComponent,
    NetWorthSummaryConfigComponent,
    NetWorthSummaryFormModalComponent,
    DashboardSummaryConfigItemComponent,
    MonthlyDistributionFieldsConfigComponent,
    FieldsConfigComponent,
    UserSettingsComponent,
    ChangePasswordFormComponent
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    DragDropModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    NgxFormTrooperModule
  ]
})
export class SettingsModule {}
