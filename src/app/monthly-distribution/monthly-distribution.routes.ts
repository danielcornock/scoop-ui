import { Routes } from '@angular/router';

import {
  MonthlyDistributionEntryFormComponent,
} from './views/monthly-distribution-entry-form/monthly-distribution-entry-form.component';
import { MonthlyDistributionComponent } from './views/monthly-distribution/monthly-distribution.component';

export const monthlyDistributionRoutes: Routes = [
  {
    path: 'monthly-distribution',
    component: MonthlyDistributionComponent
  },
  {
    path: 'monthly-distribution/create',
    component: MonthlyDistributionEntryFormComponent
  }
];
