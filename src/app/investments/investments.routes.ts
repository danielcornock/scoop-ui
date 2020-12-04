import { Routes } from '@angular/router';

import { InvestmentsEntryFormComponent } from './views/investments-entry-form/investments-entry-form.component';
import { InvestmentsUpdateFormComponent } from './views/investments-update-form/investments-update-form.component';
import { InvestmentsComponent } from './views/investments/investments.component';

export const investmentRoutes: Routes = [
  {
    path: 'edit/:date',
    component: InvestmentsUpdateFormComponent
  },
  {
    path: '',
    component: InvestmentsComponent
  },
  {
    path: 'create',
    component: InvestmentsEntryFormComponent
  }
];
