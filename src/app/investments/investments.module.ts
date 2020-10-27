import { CommonModule, PercentPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxFormTrooperModule } from 'ngx-form-trooper';

import { SharedModule } from '../shared/shared.module';
import { CompaniesCardComponent } from './components/companies-card/companies-card.component';
import { InvestmentsLogCardComponent } from './components/investments-log-card/investments-log-card.component';
import {
  InvestmentsMonthlyChangeCardComponent,
} from './components/investments-monthly-change-card/investments-monthly-change-card.component';
import { TrendsCardComponent } from './components/trends-card/trends-card.component';
import { InvestmentsEntryFormComponent } from './views/investments-entry-form/investments-entry-form.component';
import { InvestmentsComponent } from './views/investments/investments.component';

@NgModule({
  declarations: [
    InvestmentsComponent,
    CompaniesCardComponent,
    TrendsCardComponent,
    InvestmentsLogCardComponent,
    InvestmentsEntryFormComponent,
    InvestmentsMonthlyChangeCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxFormTrooperModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [],
  providers: [PercentPipe]
})
export class InvestmentsModule {}
