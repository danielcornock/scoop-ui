import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxFormTrooperModule } from 'ngx-form-trooper';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { EmailConfirmationComponent } from './views/email-confirmation/email-confirmation.component';
import { UnauthenticatedPageWrapperComponent } from './components/unauthenticated-page-wrapper/unauthenticated-page-wrapper.component';
import { RegisterComponent } from './views/register/register.component';

@NgModule({
  declarations: [LoginComponent, EmailConfirmationComponent, UnauthenticatedPageWrapperComponent, RegisterComponent],
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
