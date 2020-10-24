import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { NgxFormTrooperModule } from 'ngx-form-trooper';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

import { CardComponent } from './components/card/card.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { DashboardSummaryComponent } from './components/dashboard-summary/dashboard-summary.component';
import { FormErrorsComponent } from './components/form-errors/form-errors.component';
import { FormSubmitComponent } from './components/form-submit/form-submit.component';
import { IconPickerComponent } from './components/icon-picker/icon-picker.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { TableActionsComponent } from './components/table-actions/table-actions.component';
import { TableComponent } from './components/table/table.component';
import { JoinPipe } from './pipes/join/join.pipe';
import { KebabCasePipe } from './pipes/kebab-case/kebab-case.pipe';
import { KeysPipe } from './pipes/keys/keys.pipe';

@NgModule({
  declarations: [
    CardComponent,
    TableComponent,
    DashboardSummaryComponent,
    KeysPipe,
    FormSubmitComponent,
    ContextMenuComponent,
    FormErrorsComponent,
    LoadingSpinnerComponent,
    IconPickerComponent,
    KebabCasePipe,
    JoinPipe,
    TableActionsComponent
  ],
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSelectModule,
    BrowserAnimationsModule,
    NgxFormTrooperModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    })
  ],
  exports: [
    CardComponent,
    TableComponent,
    DashboardSummaryComponent,
    KeysPipe,
    FormSubmitComponent,
    FeatherModule,
    FormErrorsComponent,
    ContextMenuComponent,
    LoadingSpinnerComponent,
    IconPickerComponent,
    JoinPipe,
    TableActionsComponent
  ]
})
export class SharedModule {}
