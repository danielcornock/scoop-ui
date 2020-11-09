import { Routes } from '@angular/router';

import { adminRoutes } from '../admin/admin.routes';
import { authRoutes } from '../auth/auth.routes';
import { AuthGuardService } from '../auth/services/auth-guard/auth-guard.service';
import { PageNotFoundComponent } from '../core/views/page-not-found/page-not-found.component';
import { investmentRoutes } from '../investments/investments.routes';
import { monthlyDistributionRoutes } from '../monthly-distribution/monthly-distribution.routes';
import { netWorthRoutes } from '../net-worth/net-worth.routes';
import { salaryRoutes } from '../salary/salary.routes';
import { settingsRoutes } from '../settings/settings.routes';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'net-worth'
  },
  ...authRoutes,
  {
    path: '',
    canActivate: [AuthGuardService],
    children: [
      ...investmentRoutes,
      ...netWorthRoutes,
      ...monthlyDistributionRoutes,
      ...settingsRoutes,
      ...adminRoutes,
      ...salaryRoutes
    ]
  },
  {
    path: '**',
    canActivate: [AuthGuardService],
    component: PageNotFoundComponent
  }
];
