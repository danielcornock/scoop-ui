import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { NetWorthComponent } from './views/net-worth/net-worth.component';
import { NetWorthLogComponent } from './components/net-worth-log/net-worth-log.component';

@NgModule({
  declarations: [NetWorthComponent, NetWorthLogComponent],
  imports: [CommonModule, SharedModule]
})
export class NetWorthModule {}
