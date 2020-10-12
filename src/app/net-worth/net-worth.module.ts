import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { NetWorthComponent } from './views/net-worth/net-worth.component';

@NgModule({
  declarations: [NetWorthComponent],
  imports: [CommonModule, SharedModule]
})
export class NetWorthModule {}
