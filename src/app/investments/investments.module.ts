import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestmentsComponent } from './views/investments/investments.component';
import { InvestmentsSummaryComponent } from './components/investments-summary/investments-summary.component';



@NgModule({
  declarations: [InvestmentsComponent, InvestmentsSummaryComponent],
  imports: [
    CommonModule
  ]
})
export class InvestmentsModule { }
