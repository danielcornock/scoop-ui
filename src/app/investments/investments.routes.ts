import { Routes } from '@angular/router';

import { FormDirtyCheckService } from '../core/services/form-dirty-check/form-dirty-check.service';
import { InvestmentsEntryFormComponent } from './views/investments-entry-form/investments-entry-form.component';
import { InvestmentsUpdateFormComponent } from './views/investments-update-form/investments-update-form.component';
import { InvestmentsComponent } from './views/investments/investments.component';

export const investmentRoutes: Routes = [
  {
    path: 'edit/:date',
    component: InvestmentsUpdateFormComponent,
    canDeactivate: [FormDirtyCheckService]
  },
  {
    path: '',
    component: InvestmentsComponent
  },
  {
    path: 'create',
    component: InvestmentsEntryFormComponent,
    canDeactivate: [FormDirtyCheckService]
  }
];
