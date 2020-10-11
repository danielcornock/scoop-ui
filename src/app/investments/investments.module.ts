import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CompaniesCardComponent } from './components/companies-card/companies-card.component';
import { InvestmentsSummaryComponent } from './components/investments-summary/investments-summary.component';
import { InvestmentsComponent } from './views/investments/investments.component';

@NgModule({
  declarations: [
    InvestmentsComponent,
    InvestmentsSummaryComponent,
    CompaniesCardComponent
  ],
  imports: [CommonModule, SharedModule]
})
export class InvestmentsModule {}
