import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxFormTrooperModule } from 'ngx-form-trooper';

import { SharedModule } from '../shared/shared.module';
import { ForgottenPasswordComponent } from './components/forgotten-password/forgotten-password.component';
import { LoginComponent } from './components/login/login.component';
import {
  UnauthenticatedPageWrapperComponent,
} from './components/unauthenticated-page-wrapper/unauthenticated-page-wrapper.component';
import { EmailConfirmationComponent } from './views/email-confirmation/email-confirmation.component';
import { RegisterComponent } from './views/register/register.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    EmailConfirmationComponent,
    UnauthenticatedPageWrapperComponent,
    RegisterComponent,
    ForgottenPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule,
    NgxFormTrooperModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('jwt')
      }
    })
  ]
})
export class AuthModule {}
