import { Routes } from '@angular/router';

import { FormDirtyCheckService } from '../core/services/form-dirty-check/form-dirty-check.service';
import {
  MonthlyDistributionEntryFormComponent,
} from './views/monthly-distribution-entry-form/monthly-distribution-entry-form.component';
import {
  MonthlyDistributionUpdateFormComponent,
} from './views/monthly-distribution-update-form/monthly-distribution-update-form.component';
import { MonthlyDistributionComponent } from './views/monthly-distribution/monthly-distribution.component';

export const monthlyDistributionRoutes: Routes = [
  {
    path: 'edit/:date',
    component: MonthlyDistributionUpdateFormComponent,
    canDeactivate: [FormDirtyCheckService]
  },
  {
    path: '',
    component: MonthlyDistributionComponent
  },
  {
    path: 'create',
    component: MonthlyDistributionEntryFormComponent,
    canDeactivate: [FormDirtyCheckService]
  }
];
