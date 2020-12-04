import { CommonModule, CurrencyPipe, PercentPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxFormTrooperModule } from 'ngx-form-trooper';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import {
  SalaryDistributionChartComponent,
} from './components/salary-distribution-chart/salary-distribution-chart.component';
import { SalaryLineChartComponent } from './components/salary-line-chart/salary-line-chart.component';
import { SalaryLogComponent } from './components/salary-log/salary-log.component';
import { salaryRoutes } from './salary.routes';
import { SalaryEntryFormComponent } from './views/salary-entry-form/salary-entry-form.component';
import { SalaryComponent } from './views/salary/salary.component';

@NgModule({
  declarations: [
    SalaryComponent,
    SalaryEntryFormComponent,
    SalaryLogComponent,
    SalaryLineChartComponent,
    SalaryDistributionChartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxFormTrooperModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(salaryRoutes),
    CoreModule
  ],
  providers: [CurrencyPipe, PercentPipe]
})
export class SalaryModule {}
