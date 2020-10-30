import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { EmailConfirmationComponent } from './views/email-confirmation/email-confirmation.component';
import { RegisterComponent } from './views/register/register.component';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'confirmation/:token',
    component: EmailConfirmationComponent
  }
];
