import { Routes } from '@angular/router';

import { FormDirtyCheckService } from '../core/services/form-dirty-check/form-dirty-check.service';
import { NetWorthEntryFormComponent } from './views/net-worth-entry-form/net-worth-entry-form.component';
import { NetWorthUpdateFormComponent } from './views/net-worth-update-form/net-worth-update-form.component';
import { NetWorthComponent } from './views/net-worth/net-worth.component';

export const netWorthRoutes: Routes = [
  {
    path: 'edit/:date',
    component: NetWorthUpdateFormComponent,
    canDeactivate: [FormDirtyCheckService]
  },
  {
    path: '',
    component: NetWorthComponent
  },
  {
    path: 'create',
    component: NetWorthEntryFormComponent,
    canDeactivate: [FormDirtyCheckService]
  }
];
