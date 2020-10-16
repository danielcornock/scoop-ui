import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

import { CardComponent } from './components/card/card.component';
import { DashboardSummaryComponent } from './components/dashboard-summary/dashboard-summary.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSubmitComponent } from './components/form-submit/form-submit.component';
import { TableComponent } from './components/table/table.component';
import { KeysPipe } from './pipes/keys/keys.pipe';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { FormInputErrorsComponent } from './components/form-input-errors/form-input-errors.component';
import { FormErrorsComponent } from './components/form-errors/form-errors.component';

@NgModule({
  declarations: [
    CardComponent,
    TableComponent,
    DashboardSummaryComponent,
    KeysPipe,
    FormInputComponent,
    FormSubmitComponent,
    ContextMenuComponent,
    FormInputErrorsComponent,
    FormErrorsComponent
  ],
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule
  ],
  exports: [
    CardComponent,
    TableComponent,
    DashboardSummaryComponent,
    KeysPipe,
    FormInputComponent,
    FormSubmitComponent,
    FeatherModule,
    ContextMenuComponent,
    FormErrorsComponent
  ]
})
export class SharedModule {}
