import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CompaniesCardComponent } from './components/companies-card/companies-card.component';
import { InvestmentsSummaryComponent } from './components/investments-summary/investments-summary.component';
import { MonthlyLogCardComponent } from './components/monthly-log-card/monthly-log-card.component';
import { TrendsCardComponent } from './components/trends-card/trends-card.component';
import { InvestmentsComponent } from './views/investments/investments.component';

@NgModule({
  declarations: [
    InvestmentsComponent,
    InvestmentsSummaryComponent,
    CompaniesCardComponent,
    TrendsCardComponent,
    MonthlyLogCardComponent
  ],
  imports: [CommonModule, SharedModule],
  exports: []
})
export class InvestmentsModule {}
