import { Routes } from '@angular/router';

import { SalaryEntryFormComponent } from './views/salary-entry-form/salary-entry-form.component';
import { SalaryComponent } from './views/salary/salary.component';

export const salaryRoutes: Routes = [
  {
    path: '',
    component: SalaryComponent
  },
  {
    path: 'create',
    component: SalaryEntryFormComponent
  }
];
