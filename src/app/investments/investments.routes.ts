import { Routes } from '@angular/router';

import { InvestmentsEntryFormComponent } from './views/investments-entry-form/investments-entry-form.component';
import { InvestmentsComponent } from './views/investments/investments.component';

export const investmentRoutes: Routes = [
  {
    path: 'investments',
    component: InvestmentsComponent
  },
  {
    path: 'investments/create',
    component: InvestmentsEntryFormComponent
  }
];
