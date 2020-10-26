import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFormTrooperModule } from 'ngx-form-trooper';

import { SharedModule } from '../shared/shared.module';
import {
  MonthlyDistributionEntryFormComponent,
} from './views/monthly-distribution-entry-form/monthly-distribution-entry-form.component';
import { MonthlyDistributionComponent } from './views/monthly-distribution/monthly-distribution.component';
import { MonthlyDistributionLogCardComponent } from './components/monthly-distribution-log-card/monthly-distribution-log-card.component';

@NgModule({
  declarations: [
    MonthlyDistributionComponent,
    MonthlyDistributionEntryFormComponent,
    MonthlyDistributionLogCardComponent
  ],
  imports: [
    CommonModule,
    NgxFormTrooperModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class MonthlyDistributionModule {}
