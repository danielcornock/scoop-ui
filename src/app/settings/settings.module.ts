import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { NgxFormTrooperModule } from 'ngx-form-trooper';

import { SharedModule } from '../shared/shared.module';
import { ChangePasswordFormComponent } from './components/change-password-form/change-password-form.component';
import {
  DashboardSummaryConfigItemComponent,
} from './components/dashboard-summary-config-item/dashboard-summary-config-item.component';
import { FieldsConfigComponent } from './components/fields-config/fields-config.component';
import {
  MonthlyDistributionFieldsConfigComponent,
} from './components/monthly-distribution-fields-config/monthly-distribution-fields-config.component';
import { NetWorthSummaryConfigComponent } from './components/net-worth-summary-config/net-worth-summary-config.component';
import {
  NetWorthSummaryFormModalComponent,
} from './components/net-worth-summary-form-modal/net-worth-summary-form-modal.component';
import { SalaryConfigComponent } from './components/salary-config/salary-config.component';
import { SettingsSectionComponent } from './components/settings-section/settings-section.component';
import { SettingsComponent } from './views/settings/settings.component';
import { UserSettingsComponent } from './views/user-settings/user-settings.component';

@NgModule({
  declarations: [
    SettingsComponent,
    NetWorthSummaryConfigComponent,
    NetWorthSummaryFormModalComponent,
    DashboardSummaryConfigItemComponent,
    MonthlyDistributionFieldsConfigComponent,
    FieldsConfigComponent,
    UserSettingsComponent,
    ChangePasswordFormComponent,
    SalaryConfigComponent,
    SettingsSectionComponent
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    DragDropModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFormTrooperModule
  ]
})
export class SettingsModule {}
