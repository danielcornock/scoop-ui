import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxFormTrooperModule } from 'ngx-form-trooper';
import { NgxSpinnerModule } from 'ngx-spinner';

import { SharedModule } from '../shared/shared.module';
import { GoalCelebrationModalComponent } from './components/goal-celebration-modal/goal-celebration-modal.component';
import { NetWorthDistributionCardComponent } from './components/net-worth-distribution-card/net-worth-distribution-card.component';
import { NetWorthGoalsCardComponent } from './components/net-worth-goals-card/net-worth-goals-card.component';
import { NetWorthLogComponent } from './components/net-worth-log/net-worth-log.component';
import { NetWorthMonthlyChangeCardComponent } from './components/net-worth-monthly-change-card/net-worth-monthly-change-card.component';
import { NetWorthTrendsCardComponent } from './components/net-worth-trends-card/net-worth-trends-card.component';
import { netWorthRoutes } from './net-worth.routes';
import { GoalFeedbackPipe } from './pipes/goal-feedback/goal-feedback.pipe';
import { NetWorthEntryFormComponent } from './views/net-worth-entry-form/net-worth-entry-form.component';
import { NetWorthUpdateFormComponent } from './views/net-worth-update-form/net-worth-update-form.component';
import { NetWorthComponent } from './views/net-worth/net-worth.component';

@NgModule({
  declarations: [
    NetWorthComponent,
    NetWorthLogComponent,
    NetWorthDistributionCardComponent,
    NetWorthTrendsCardComponent,
    NetWorthMonthlyChangeCardComponent,
    NetWorthEntryFormComponent,
    NetWorthUpdateFormComponent,
    NetWorthGoalsCardComponent,
    GoalFeedbackPipe,
    GoalCelebrationModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxSpinnerModule,
    NgxFormTrooperModule,
    RouterModule.forChild(netWorthRoutes)
  ],
  providers: [CurrencyPipe]
})
export class NetWorthModule {}
