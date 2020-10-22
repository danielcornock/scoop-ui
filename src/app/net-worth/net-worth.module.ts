import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxFormTrooperModule } from 'ngx-form-trooper';
import { NgxSpinnerModule } from 'ngx-spinner';

import { SharedModule } from '../shared/shared.module';
import { NetWorthDistributionCardComponent } from './components/net-worth-distribution-card/net-worth-distribution-card.component';
import { NetWorthLogComponent } from './components/net-worth-log/net-worth-log.component';
import { NetWorthMonthlyChangeCardComponent } from './components/net-worth-monthly-change-card/net-worth-monthly-change-card.component';
import { NetWorthTrendsCardComponent } from './components/net-worth-trends-card/net-worth-trends-card.component';
import { NetWorthEntryFormComponent } from './views/net-worth-entry-form/net-worth-entry-form.component';
import { NetWorthComponent } from './views/net-worth/net-worth.component';

@NgModule({
  declarations: [
    NetWorthComponent,
    NetWorthLogComponent,
    NetWorthDistributionCardComponent,
    NetWorthTrendsCardComponent,
    NetWorthMonthlyChangeCardComponent,
    NetWorthEntryFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxSpinnerModule,
    NgxFormTrooperModule
  ],
  providers: [CurrencyPipe]
})
export class NetWorthModule {}
