import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxFormTrooperModule } from 'ngx-form-trooper';

import { SharedModule } from '../shared/shared.module';
import {
  MonthlyDistributionLogCardComponent,
} from './components/monthly-distribution-log-card/monthly-distribution-log-card.component';
import {
  MonthlyDistributionEntryFormComponent,
} from './views/monthly-distribution-entry-form/monthly-distribution-entry-form.component';
import { MonthlyDistributionComponent } from './views/monthly-distribution/monthly-distribution.component';

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
    SharedModule,
    RouterModule
  ]
})
export class MonthlyDistributionModule {}
