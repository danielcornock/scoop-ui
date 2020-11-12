import { Routes } from '@angular/router';

import { AdminComponent } from './views/admin/admin.component';
import { CreateNewsletterComponent } from './views/create-newsletter/create-newsletter.component';

export const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'admin/create-newsletter',
    component: CreateNewsletterComponent
  }
];
