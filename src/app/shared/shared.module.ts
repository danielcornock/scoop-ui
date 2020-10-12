import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardComponent } from './components/card/card.component';
import { DashboardSummaryComponent } from './components/dashboard-summary/dashboard-summary.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [CardComponent, TableComponent, DashboardSummaryComponent],
  imports: [CommonModule],
  exports: [CardComponent, TableComponent, DashboardSummaryComponent]
})
export class SharedModule {}
