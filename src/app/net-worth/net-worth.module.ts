import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { NetWorthComponent } from './views/net-worth/net-worth.component';
import { NetWorthLogComponent } from './components/net-worth-log/net-worth-log.component';
import { NetWorthDistributionCardComponent } from './components/net-worth-distribution-card/net-worth-distribution-card.component';
import { NetWorthTrendsCardComponent } from './components/net-worth-trends-card/net-worth-trends-card.component';
import { NetWorthMonthlyChangeCardComponent } from './components/net-worth-monthly-change-card/net-worth-monthly-change-card.component';
import { NetWorthEntryFormComponent } from './views/net-worth-entry-form/net-worth-entry-form.component';

@NgModule({
  declarations: [
    NetWorthComponent,
    NetWorthLogComponent,
    NetWorthDistributionCardComponent,
    NetWorthTrendsCardComponent,
    NetWorthMonthlyChangeCardComponent,
    NetWorthEntryFormComponent
  ],
  imports: [CommonModule, SharedModule]
})
export class NetWorthModule {}
