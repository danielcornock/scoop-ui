import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { ToastrModule } from 'ngx-toastr';

import { CardComponent } from './components/card/card.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { DashboardSummaryComponent } from './components/dashboard-summary/dashboard-summary.component';
import { FormErrorsComponent } from './components/form-errors/form-errors.component';
import { FormInputErrorsComponent } from './components/form-input-errors/form-input-errors.component';
import { FormInputMultiSelectComponent } from './components/form-input-multi-select/form-input-multi-select.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSubmitComponent } from './components/form-submit/form-submit.component';
import { TableComponent } from './components/table/table.component';
import { KeysPipe } from './pipes/keys/keys.pipe';

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
    FormErrorsComponent,
    FormInputMultiSelectComponent
  ],
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSelectModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    })
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
    FormErrorsComponent,
    FormInputMultiSelectComponent
  ]
})
export class SharedModule {}
