import { Routes } from '@angular/router';

import { NetWorthEntryFormComponent } from './views/net-worth-entry-form/net-worth-entry-form.component';
import { NetWorthUpdateFormComponent } from './views/net-worth-update-form/net-worth-update-form.component';
import { NetWorthComponent } from './views/net-worth/net-worth.component';

export const netWorthRoutes: Routes = [
  {
    path: 'net-worth/edit/:netWorthDate',
    component: NetWorthUpdateFormComponent,
    data: { animation: 'netWorthEdit' }
  },
  {
    path: 'net-worth',
    component: NetWorthComponent,
    data: { animation: 'netWorth' }
  },
  {
    path: 'net-worth/create',
    component: NetWorthEntryFormComponent,
    data: { animation: 'netWorthCreate' }
  }
];
