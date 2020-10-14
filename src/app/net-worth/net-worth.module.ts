import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { NetWorthComponent } from './views/net-worth/net-worth.component';
import { NetWorthLogComponent } from './components/net-worth-log/net-worth-log.component';
import { NetWorthDistributionCardComponent } from './components/net-worth-distribution-card/net-worth-distribution-card.component';

@NgModule({
  declarations: [NetWorthComponent, NetWorthLogComponent, NetWorthDistributionCardComponent],
  imports: [CommonModule, SharedModule]
})
export class NetWorthModule {}
