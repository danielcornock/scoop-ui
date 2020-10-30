import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { EmailConfirmationComponent } from './views/email-confirmation/email-confirmation.component';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'confirmation/:token',
    component: EmailConfirmationComponent
  }
];
