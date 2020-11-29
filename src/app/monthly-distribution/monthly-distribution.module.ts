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
import { MonthlyDistributionPieChartComponent } from './components/monthly-distribution-pie-chart/monthly-distribution-pie-chart.component';
import { MonthlyDistributionSpendingTrendChartComponent } from './components/monthly-distribution-spending-trend-chart/monthly-distribution-spending-trend-chart.component';
import { UncommittedSpendingChartComponent } from './components/uncommitted-spending-chart/uncommitted-spending-chart.component';
import { MonthlyDistributionUpdateFormComponent } from './views/monthly-distribution-update-form/monthly-distribution-update-form.component';

@NgModule({
  declarations: [
    MonthlyDistributionComponent,
    MonthlyDistributionEntryFormComponent,
    MonthlyDistributionLogCardComponent,
    MonthlyDistributionPieChartComponent,
    MonthlyDistributionSpendingTrendChartComponent,
    UncommittedSpendingChartComponent,
    MonthlyDistributionUpdateFormComponent
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
