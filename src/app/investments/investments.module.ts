import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFormTrooperModule } from 'ngx-form-trooper';

import { SharedModule } from '../shared/shared.module';
import { CompaniesCardComponent } from './components/companies-card/companies-card.component';
import { MonthlyLogCardComponent } from './components/monthly-log-card/monthly-log-card.component';
import { TrendsCardComponent } from './components/trends-card/trends-card.component';
import { InvestmentsEntryFormComponent } from './views/investments-entry-form/investments-entry-form.component';
import { InvestmentsComponent } from './views/investments/investments.component';

@NgModule({
  declarations: [
    InvestmentsComponent,
    CompaniesCardComponent,
    TrendsCardComponent,
    MonthlyLogCardComponent,
    InvestmentsEntryFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxFormTrooperModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: []
})
export class InvestmentsModule {}
