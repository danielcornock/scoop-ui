import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxFormTrooperModule } from 'ngx-form-trooper';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { adminRoutes } from './admin.routes';
import { AdminKeyActionsComponent } from './components/admin-key-actions/admin-key-actions.component';
import {
  CreateCustomNotificationModalComponent,
} from './components/create-custom-notification-modal/create-custom-notification-modal.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { AdminComponent } from './views/admin/admin.component';
import { CreateNewsletterComponent } from './views/create-newsletter/create-newsletter.component';

@NgModule({
  declarations: [
    AdminComponent,
    UsersListComponent,
    AdminKeyActionsComponent,
    CreateCustomNotificationModalComponent,
    CreateNewsletterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxFormTrooperModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    RouterModule.forChild(adminRoutes)
  ]
})
export class AdminModule {}
