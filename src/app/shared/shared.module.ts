import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { NgxFormTrooperModule } from 'ngx-form-trooper';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

import { CardComponent } from './components/card/card.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { DashboardSummaryComponent } from './components/dashboard-summary/dashboard-summary.component';
import { DetailedContextMenuComponent } from './components/detailed-context-menu/detailed-context-menu.component';
import { FloatingActionButtonComponent } from './components/floating-action-button/floating-action-button.component';
import { FormErrorsComponent } from './components/form-errors/form-errors.component';
import { FormModalComponent } from './components/form-modal/form-modal.component';
import { FormSubmitComponent } from './components/form-submit/form-submit.component';
import { IconPickerComponent } from './components/icon-picker/icon-picker.component';
import { InformationComponent } from './components/information/information.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { LogActionsModalComponent } from './components/log-actions-modal/log-actions-modal.component';
import { TableActionsComponent } from './components/table-actions/table-actions.component';
import { TableComponent } from './components/table/table.component';
import { LongPressDirective } from './directives/long-press/long-press.directive';
import { CapitalizePipe } from './pipes/capitalize/capitalize.pipe';
import { JoinPipe } from './pipes/join/join.pipe';
import { KebabCasePipe } from './pipes/kebab-case/kebab-case.pipe';
import { KeysPipe } from './pipes/keys/keys.pipe';
import { ValuesPipe } from './pipes/values.pipe';

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
    TableActionsComponent,
    DetailedContextMenuComponent,
    ConfirmationModalComponent,
    ValuesPipe,
    InformationComponent,
    FloatingActionButtonComponent,
    LongPressDirective,
    LogActionsModalComponent,
    FormModalComponent,
    CapitalizePipe
  ],
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFormTrooperModule,
    MatMenuModule,
    MatDialogModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 5000,
      closeButton: true,
      preventDuplicates: true
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
    TableActionsComponent,
    DetailedContextMenuComponent,
    ValuesPipe,
    InformationComponent,
    FloatingActionButtonComponent,
    LongPressDirective,
    FormModalComponent,
    CapitalizePipe
  ]
})
export class SharedModule {}
